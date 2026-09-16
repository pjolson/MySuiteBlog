import test from 'node:test'
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileStore, groupID } from '../server/csv-feedback/store.mjs'
import { saveRecord, reviewData, deleteGroup, pruneExpired, retentionMs } from '../server/csv-feedback/service.mjs'
import { handleWrite, localRateLimiter } from '../server/csv-feedback/http.mjs'
import { handleReview } from '../server/csv-feedback/review.mjs'
import { createSearchTracker, catalogueVersion } from '../.vitepress/theme/csv-feedback.mjs'
import { validSearchEvent } from '../.vitepress/data/csv-errors/feedback-contract.mjs'
import { config as feedbackConfig } from '../netlify/functions/csv-feedback.mjs'
import { config as metricConfig } from '../netlify/functions/csv-search-event.mjs'
import { config as retentionConfig } from '../netlify/functions/csv-feedback-retention.mjs'

const now = Date.parse('2026-09-16T12:00:00Z')
const origin = 'https://mysuite.test'
const password = 'synthetic-review-password-for-tests-only'
const authorization = `Basic ${Buffer.from(`reviewer:${password}`).toString('base64')}`
const submission = (changes = {}) => ({ id: randomUUID(), message: 'SYNTHETIC custrecord_uncovered_314 field rejected 007', note: 'Synthetic update example', context: 'Journal entries', source: 'translator', catalogueVersion, ...changes })
const event = (changes = {}) => ({ id: randomUUID(), source: 'header', context: '', category: '', unfilteredMatches: false, outcome: 'unknown', catalogueVersion, ...changes })
const request = (body, headers = {}, method = 'POST', path = '/api/csv-feedback') => new Request(`${origin}${path}`, { method, headers: { origin, 'content-type': 'application/json', ...headers }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) })
async function storage(t) {
  const directory = await mkdtemp(join(tmpdir(), 'mysuite-feedback-test-'))
  t.after(() => rm(directory, { recursive: true, force: true }))
  return fileStore(directory)
}

test('concurrent retries store one submission and preserve the first server timestamp', async t => {
  const store = await storage(t)
  const value = submission()
  await Promise.all(Array.from({ length: 12 }, (_, index) => saveRecord(store, 'submissions', value, now + index)))
  assert.equal((await store.keys('submissions')).length, 1)
  const first = await store.get(`submissions/${value.id}`)
  await saveRecord(store, 'submissions', value, now + 10000)
  assert.deepEqual(await store.get(`submissions/${value.id}`), first)
  await assert.rejects(saveRecord(store, 'submissions', { ...value, message: 'A different message' }, now), { status: 409 })
})

test('a lost response after commit is safely retryable and storage is read back before success', async t => {
  const store = await storage(t)
  const value = submission()
  const interrupted = { ...store, async put(...args) { await store.put(...args); throw new Error('Synthetic connection loss') } }
  const failed = await handleWrite(request(value), { store: interrupted, kind: 'submissions' })
  assert.equal(failed.status, 503)
  const retried = await handleWrite(request(value), { store, kind: 'submissions' })
  assert.equal(retried.status, 200)
  assert.deepEqual(await retried.json(), { stored: true })
  assert.equal((await store.keys('submissions')).length, 1)
  const notStored = await handleWrite(request(submission()), { store: { put: async () => true, get: async () => null }, kind: 'submissions' })
  assert.equal(notStored.status, 503)
})

test('duplicate grouping preserves notes, numbers, wording and import contexts', async t => {
  const store = await storage(t)
  const value = submission()
  await saveRecord(store, 'submissions', value, now)
  await saveRecord(store, 'submissions', { ...value, id: randomUUID(), note: 'A second synthetic note', source: 'header' }, now + 1000)
  await saveRecord(store, 'submissions', { ...value, id: randomUUID(), message: value.message.replace('007', '008') }, now)
  await saveRecord(store, 'submissions', { ...value, id: randomUUID(), context: 'Sales orders' }, now)
  const { groups } = await reviewData(store, now + 2000)
  assert.equal(groups.length, 3)
  assert.equal(groups[0].count, 2)
  assert.equal(groups[0].firstSubmitted, new Date(now).toISOString())
  assert.equal(groups[0].lastSubmitted, new Date(now + 1000).toISOString())
  assert.deepEqual(groups[0].submissions.map(row => row.note), [value.note, 'A second synthetic note'])
})

test('public writes enforce origin, methods, exact schemas and length limits without echoing data', async t => {
  const store = await storage(t)
  const options = { store, kind: 'submissions' }
  assert.equal((await handleWrite(request(undefined, {}, 'GET'), options)).status, 405)
  assert.equal((await handleWrite(request(submission(), { origin: 'https://other.test' }), options)).status, 403)
  assert.equal((await handleWrite(request(submission(), { 'content-type': 'text/plain' }), options)).status, 415)
  assert.equal((await handleWrite(request(submission()), { ...options, ready: false })).status, 503)
  for (const value of [submission({ message: '' }), submission({ note: 'a'.repeat(2001) }), submission({ message: 'a'.repeat(4001) }), submission({ context: 'untrusted context' }), submission({ source: 'elsewhere' }), submission({ createdAt: 'client-controlled' })]) {
    const response = await handleWrite(request(value), options)
    assert.equal(response.status, 400)
    assert.doesNotMatch(await response.text(), /SYNTHETIC|client-controlled|untrusted/)
  }
  assert.equal((await handleWrite(request(submission({ message: 'a'.repeat(30000) })), options)).status, 413)
  assert.equal((await store.keys('submissions')).length, 0)
})

test('automatic event schema rejects query text, hashes, arbitrary contexts and inconsistent outcomes', async t => {
  const store = await storage(t)
  const safe = event()
  assert.equal(validSearchEvent(safe), true)
  for (const value of [{ ...safe, query: 'secret' }, { ...safe, queryHash: 'abc123' }, { ...safe, context: 'secret' }, { ...safe, category: 'secret' }, { ...safe, outcome: 'unknown', unfilteredMatches: true }]) {
    assert.equal(Boolean(validSearchEvent(value)), false)
    assert.equal((await handleWrite(request(value), { store, kind: 'events' })).status, 400)
  }
  await saveRecord(store, 'events', safe, now)
  const { metrics, groups } = await reviewData(store, now)
  assert.equal(groups.length, 0)
  assert.equal(metrics[0].count, 1)
  assert.deepEqual(Object.keys(metrics[0]).sort(), ['catalogueVersion', 'category', 'context', 'count', 'day', 'outcome', 'source', 'unfilteredMatches'].sort())
})

test('review list and export require authentication, escape submitted text, and support status changes', async t => {
  const store = await storage(t)
  const value = submission({ message: '<script>alert("synthetic")</script>', note: '<img src=x onerror=alert(1)>' })
  await saveRecord(store, 'submissions', value, now)
  const options = { store, password, now }
  assert.equal((await handleReview(new Request(`${origin}/private/csv-review`), options)).status, 401)
  assert.equal((await handleReview(new Request(`${origin}/private/csv-review/export`), options)).status, 401)
  assert.equal((await handleReview(new Request(`${origin}/private/csv-review`, { headers: { authorization: 'Basic invalid' } }), options)).status, 401)
  assert.equal((await handleReview(new Request(`${origin}/private/csv-review`), { ...options, password: '' })).status, 503)
  const response = await handleReview(new Request(`${origin}/private/csv-review`, { headers: { authorization } }), options)
  const html = await response.text()
  assert.match(html, /&lt;script&gt;/)
  assert.doesNotMatch(html, /<script|<img|analytics|googletagmanager/)
  assert.match(response.headers.get('content-security-policy'), /default-src 'none'/)
  assert.equal(response.headers.get('cache-control'), 'no-store')
  assert.equal(response.headers.get('referrer-policy'), 'same-origin')
  const update = headers => new Request(`${origin}/private/csv-review`, { method: 'POST', headers: { authorization, origin, 'content-type': 'application/x-www-form-urlencoded', ...headers }, body: new URLSearchParams({ id: groupID(value), action: 'status', status: 'Investigating' }) })
  assert.equal((await handleReview(update({ origin: 'https://other.test' }), options)).status, 403)
  assert.equal((await handleReview(update({}), options)).status, 303)
  const exported = await handleReview(new Request(`${origin}/private/csv-review/export`, { headers: { authorization } }), options)
  assert.equal((await exported.json()).groups[0].status, 'Investigating')
})

test('deleting a group removes raw text and notes and prevents delayed retries from restoring them', async t => {
  const store = await storage(t)
  const value = submission()
  await saveRecord(store, 'submissions', value, now)
  await saveRecord(store, 'submissions', { ...value, id: randomUUID() }, now)
  const response = await handleReview(new Request(`${origin}/private/csv-review`, { method: 'POST', headers: { authorization, origin, 'content-type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ id: groupID(value), action: 'delete' }) }), { store, password, now })
  assert.equal(response.status, 303)
  assert.equal((await reviewData(store, now)).groups.length, 0)
  for (const key of await store.keys('submissions')) {
    const row = await store.get(key)
    assert.deepEqual(Object.keys(row).sort(), ['deleted', 'expiresAt', 'id'])
  }
  await assert.rejects(saveRecord(store, 'submissions', value, now), { status: 410 })
})

test('retention expires individual submissions at 90 days even if a duplicate arrives later', async t => {
  const store = await storage(t)
  const value = submission()
  await saveRecord(store, 'submissions', value, now)
  await saveRecord(store, 'events', event(), now)
  await saveRecord(store, 'submissions', { ...value, id: randomUUID() }, now + 1000)
  await store.put(`reviews/${groupID(value)}`, { status: 'Covered', expiresAt: now + retentionMs })
  await pruneExpired(store, now + retentionMs)
  assert.equal(await store.get(`submissions/${value.id}`), null)
  assert.equal((await store.keys('events')).length, 0)
  assert.equal((await store.keys('reviews')).length, 0)
  const { groups } = await reviewData(store, now + retentionMs)
  assert.equal(groups.length, 1)
  assert.equal(groups[0].count, 1)
  await pruneExpired(store, now + retentionMs + 1000)
  assert.equal((await store.keys('submissions')).length, 0)
})

test('settled attempts debounce typing and suppress unchanged queries and filter-only changes', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] })
  const sent = []
  const filters = { context: '', category: '' }
  const tracker = createSearchTracker({ source: 'translator', filters: () => filters, send: value => sent.push(value) })
  tracker.schedule('zorb')
  t.mock.timers.tick(800)
  tracker.schedule('zorb synthetic 77881')
  t.mock.timers.tick(1199)
  await Promise.resolve()
  assert.equal(sent.length, 0)
  t.mock.timers.tick(1)
  await Promise.resolve()
  assert.equal(sent.length, 1)
  assert.equal(validSearchEvent(sent[0]), true)
  assert.doesNotMatch(JSON.stringify(sent), /zorb|77881|query|hash/i)
  filters.context = 'Sales orders'
  tracker.settle('zorb synthetic 77881')
  await Promise.resolve()
  assert.equal(sent.length, 1)
  tracker.schedule('')
  t.mock.timers.tick(2000)
  assert.equal(sent.length, 1)
  tracker.schedule('another synthetic unknown')
  tracker.cancel()
  t.mock.timers.tick(2000)
  assert.equal(sent.length, 1)
})

test('catalogue misses and filter-hidden matches are separate; metrics failure does not break search', async () => {
  const sent = []
  const tracker = createSearchTracker({ source: 'translator', filters: () => ({ context: 'Sales orders', category: '' }), send: event => sent.push(event) })
  tracker.settle('journal entry must balance')
  await Promise.resolve()
  assert.equal(sent[0].outcome, 'filtered')
  assert.equal(sent[0].unfilteredMatches, true)
  const header = createSearchTracker({ source: 'header', send: event => sent.push(event) })
  header.settle('journal entry must balance')
  await Promise.resolve()
  assert.equal(sent.length, 1)
  header.settle('administration') // unrelated service results do not establish CSV coverage
  await Promise.resolve()
  assert.equal(sent[1].source, 'header')
  assert.equal(sent[1].outcome, 'unknown')
  const offline = createSearchTracker({ source: 'header', send: async () => { throw new Error('Synthetic offline state') } })
  assert.doesNotThrow(() => offline.settle('zorb synthetic unknown'))
  await new Promise(resolve => setImmediate(resolve))
})

test('local and Netlify rate limits and scheduled retention are configured', () => {
  const allow = localRateLimiter()
  assert.equal(allow('synthetic-ip', 2, now), true)
  assert.equal(allow('synthetic-ip', 2, now), true)
  assert.equal(allow('synthetic-ip', 2, now), false)
  assert.equal(allow('synthetic-ip', 2, now + 60000), true)
  assert.equal(feedbackConfig.path, '/api/csv-feedback')
  assert.ok(feedbackConfig.rateLimit.windowLimit <= 10)
  assert.ok(metricConfig.rateLimit.aggregateBy.includes('ip'))
  assert.equal(retentionConfig.schedule, '@hourly')
})
