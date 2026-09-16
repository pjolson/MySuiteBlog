import { validSearchEvent, validSubmission } from '../../.vitepress/data/csv-errors/feedback-contract.mjs'
import { groupID } from './store.mjs'

export const retentionMs = 90 * 24 * 60 * 60 * 1000
export class FeedbackError extends Error {
  constructor(status) { super('Feedback request failed'); this.status = status }
}

export async function saveRecord(store, kind, value, now = Date.now()) {
  if (!(kind === 'submissions' ? validSubmission(value) : validSearchEvent(value))) throw new FeedbackError(400)
  const key = `${kind}/${value.id}`
  const record = { ...value, createdAt: new Date(now).toISOString(), expiresAt: now + retentionMs }
  await store.put(key, record, { onlyIfNew: true })
  // Read back even after a reported successful write. A timeout or ambiguous
  // SDK response must never be mistaken for confirmed storage.
  const stored = await store.get(key)
  if (!stored) throw new FeedbackError(503)
  if (stored.deleted || stored.expiresAt <= now) throw new FeedbackError(410)
  if (Object.keys(value).some(key => value[key] !== stored[key])) throw new FeedbackError(409)
  return { stored: true }
}

export async function pruneExpired(store, now = Date.now()) {
  for (const prefix of ['submissions', 'events', 'reviews']) {
    for (const key of await store.keys(prefix)) {
      const value = await store.get(key)
      if (value?.expiresAt <= now) await store.delete(key)
    }
  }
}

export async function reviewData(store, now = Date.now()) {
  await pruneExpired(store, now)
  const groups = new Map()
  for (const key of await store.keys('submissions')) {
    const row = await store.get(key)
    if (!row || row.deleted || row.expiresAt <= now) continue
    const id = groupID(row)
    if (!groups.has(id)) groups.set(id, { id, message: row.message, context: row.context, submissions: [] })
    groups.get(id).submissions.push(row)
  }
  for (const group of groups.values()) {
    group.submissions.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    group.firstSubmitted = group.submissions[0].createdAt
    group.lastSubmitted = group.submissions.at(-1).createdAt
    group.count = group.submissions.length
    group.status = (await store.get(`reviews/${group.id}`))?.status || 'New'
  }
  const metrics = []
  const buckets = new Map()
  for (const key of await store.keys('events')) {
    const row = await store.get(key)
    if (!row || row.expiresAt <= now) continue
    const dimensions = { day: row.createdAt.slice(0, 10), source: row.source, context: row.context, category: row.category, unfilteredMatches: row.unfilteredMatches, outcome: row.outcome, catalogueVersion: row.catalogueVersion }
    const id = JSON.stringify(dimensions)
    if (!buckets.has(id)) { const bucket = { ...dimensions, count: 0 }; buckets.set(id, bucket); metrics.push(bucket) }
    buckets.get(id).count++
  }
  return { groups: [...groups.values()].sort((a, b) => b.lastSubmitted.localeCompare(a.lastSubmitted)), metrics }
}

export async function deleteGroup(store, id, now = Date.now()) {
  for (const key of await store.keys('submissions')) {
    const row = await store.get(key)
    if (!row || row.deleted || groupID(row) !== id) continue
    // A text-free tombstone stops a delayed retry from resurrecting deleted
    // content. It expires at the original submission's retention deadline.
    await store.put(key, { id: row.id, deleted: true, expiresAt: row.expiresAt })
  }
  await store.delete(`reviews/${id}`)
}
