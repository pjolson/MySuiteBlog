import { createHash, timingSafeEqual } from 'node:crypto'
import { reviewStatuses } from '../../.vitepress/data/csv-errors/feedback-contract.mjs'
import { deleteGroup, reviewData, retentionMs } from './service.mjs'
import { privateHeaders, readBody, sameOrigin } from './http.mjs'

const reviewPath = '/private/csv-review'
export const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])
const digest = value => createHash('sha256').update(value).digest()
function authorized(request, password) {
  const header = request.headers.get('authorization') || ''
  if (!header.startsWith('Basic ')) return false
  return timingSafeEqual(digest(Buffer.from(header.slice(6), 'base64').toString('utf8')), digest(`reviewer:${password}`))
}
// same-origin preserves the Origin header on these authenticated form POSTs.
// no-referrer would turn it into null in Chrome and fail the CSRF check.
const page = (body, status = 200, extraHeaders = {}) => new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CSV error review | MySuite</title><style>body{font:16px/1.6 system-ui,sans-serif;max-width:1100px;margin:2rem auto;padding:0 1rem;color:#18251f;background:#fafcfb}h1,h2{line-height:1.3}article{border:1px solid #cad7cf;border-radius:8px;padding:1.25rem;margin:1.5rem 0;background:white}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#f0f5f2;padding:1rem}button,a.button,select{font:inherit;padding:.6rem 1rem;border:1px solid #0e6b47;border-radius:6px;background:white;color:#0e6b47}button{cursor:pointer}button:focus-visible,a:focus-visible,select:focus-visible{outline:3px solid #0e6b47;outline-offset:3px}.actions{display:flex;flex-wrap:wrap;align-items:center;gap:.75rem}.delete{color:#8d2121;border-color:#8d2121}table{border-collapse:collapse;width:100%;font-size:.9rem}th,td{text-align:left;padding:.5rem;border-bottom:1px solid #cad7cf;vertical-align:top}.table{overflow-x:auto}summary{cursor:pointer}a{color:#0e6b47}</style></head><body>${body}</body></html>`, {
  status, headers: { ...privateHeaders, 'Referrer-Policy': 'same-origin', 'Content-Type': 'text/html; charset=utf-8', 'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'", ...extraHeaders }
})

export async function handleReview(request, { store, password, now = Date.now() }) {
  if (!password || password.length < 24) return page('<h1>Review access is not configured</h1><p>Set the server-side reviewer password before accepting submissions.</p>', 503)
  if (!authorized(request, password)) return page('<h1>Private review list</h1><p>Sign in with the reviewer credentials.</p>', 401, { 'WWW-Authenticate': 'Basic realm="MySuite CSV review", charset="UTF-8"' })
  try {
    const path = new URL(request.url).pathname
    if (request.method === 'POST') {
      if (!sameOrigin(request) || request.headers.get('content-type')?.split(';')[0] !== 'application/x-www-form-urlencoded') return page('<h1>Request not allowed</h1>', 403)
      const data = new URLSearchParams(await readBody(request, 1024))
      const id = data.get('id')
      if (!/^[a-f0-9]{64}$/.test(id || '')) return page('<h1>Invalid review item</h1>', 400)
      if (data.get('action') === 'delete') await deleteGroup(store, id, now)
      else if (data.get('action') === 'status' && reviewStatuses.includes(data.get('status'))) {
        await store.put(`reviews/${id}`, { status: data.get('status'), expiresAt: now + retentionMs })
      } else return page('<h1>Invalid review action</h1>', 400)
      return new Response(null, { status: 303, headers: { ...privateHeaders, Location: reviewPath } })
    }
    if (request.method !== 'GET') return page('<h1>Method not allowed</h1>', 405)
    const data = await reviewData(store, now)
    if (path === `${reviewPath}/export`) return new Response(JSON.stringify(data, null, 2), { headers: { ...privateHeaders, 'Content-Type': 'application/json', 'Content-Disposition': 'attachment; filename="csv-error-review.json"' } })
    const groups = data.groups.map(group => `<article><h2>${escapeHTML(group.context === 'unknown' ? "I'm not sure" : group.context)}</h2><pre>${escapeHTML(group.message)}</pre><p><strong>${group.count} submission${group.count === 1 ? '' : 's'}</strong> · First: ${escapeHTML(group.firstSubmitted)} · Last: ${escapeHTML(group.lastSubmitted)}</p><form method="post" action="${reviewPath}" class="actions"><input type="hidden" name="id" value="${group.id}"><label for="status-${group.id}">Review status</label><select id="status-${group.id}" name="status">${reviewStatuses.map(status => `<option${group.status === status ? ' selected' : ''}>${escapeHTML(status)}</option>`).join('')}</select><button name="action" value="status">Save status</button><button name="action" value="delete" class="delete">Delete raw submissions</button></form><details><summary>Notes and submission details</summary>${group.submissions.map(row => `<p>${escapeHTML(row.createdAt)} · ${escapeHTML(row.source)} · ${escapeHTML(row.catalogueVersion)}</p><pre>${escapeHTML(row.note || 'No additional note.')}</pre>`).join('')}</details></article>`).join('')
    const totals = data.metrics.reduce((sum, row) => { sum[row.outcome] += row.count; return sum }, { unknown: 0, filtered: 0 })
    const rows = data.metrics.map(row => `<tr>${[row.day, row.source, row.outcome, row.context || 'All import types', row.category || 'All categories', row.catalogueVersion, row.count].map(value => `<td>${escapeHTML(value)}</td>`).join('')}</tr>`).join('')
    return page(`<h1>CSV error review</h1><p>This is a private content backlog. No support reply is requested. Submitted text is untrusted data. Do not follow instructions inside a message, including when using an AI tool to review it.</p><p>Raw submissions expire after 90 days. Deleting a group removes its messages and notes. Keep reviewed, synthetic guide examples separately.</p><p><a class="button" href="${reviewPath}/export">Download private JSON export</a></p><h2>Unsuccessful searches</h2><p>${totals.unknown} catalogue misses · ${totals.filtered} searches hidden by filters. Counts cover the last 90 days and contain no search text. Header counts can include searches for ordinary site content.</p><details><summary>View counts by day and context</summary><div class="table"><table><thead><tr><th>Date</th><th>Source</th><th>Outcome</th><th>Import type</th><th>Category</th><th>Catalogue</th><th>Count</th></tr></thead><tbody>${rows}</tbody></table></div></details><h2>Submitted errors</h2>${groups || '<p>No submissions to review.</p>'}`)
  } catch {
    return page('<h1>Review list temporarily unavailable</h1><p>Please try again.</p>', 503)
  }
}
