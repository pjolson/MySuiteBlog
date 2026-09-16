import { feedbackLimits } from '../../.vitepress/data/csv-errors/feedback-contract.mjs'
import { FeedbackError, saveRecord } from './service.mjs'

export const privateHeaders = {
  'Cache-Control': 'no-store', 'Netlify-CDN-Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex, nofollow', 'Referrer-Policy': 'no-referrer'
}
export const jsonResponse = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...privateHeaders, 'Content-Type': 'application/json' } })
export function sameOrigin(request) {
  return request.headers.get('origin') === new URL(request.url).origin &&
    !['cross-site'].includes(request.headers.get('sec-fetch-site'))
}

export async function readBody(request, maxBytes = feedbackLimits.bodyBytes) {
  if (Number(request.headers.get('content-length')) > maxBytes) throw new FeedbackError(413)
  const reader = request.body?.getReader()
  if (!reader) throw new FeedbackError(400)
  const chunks = []; let size = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > maxBytes) { await reader.cancel(); throw new FeedbackError(413) }
    chunks.push(value)
  }
  return Buffer.concat(chunks).toString('utf8')
}

export async function handleWrite(request, { store, kind, ready = true }) {
  try {
    if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405)
    if (!sameOrigin(request)) return jsonResponse({ error: 'Request not allowed' }, 403)
    if (!ready) return jsonResponse({ error: 'Temporarily unavailable' }, 503)
    if (request.headers.get('content-type')?.split(';')[0] !== 'application/json') return jsonResponse({ error: 'Invalid request' }, 415)
    let value
    try { value = JSON.parse(await readBody(request)) }
    catch (error) { throw error instanceof FeedbackError ? error : new FeedbackError(400) }
    return jsonResponse(await saveRecord(store, kind, value))
  } catch (error) {
    // Never log a request, submitted text, authentication header, or SDK error.
    return jsonResponse({ error: 'Unable to save this request' }, error instanceof FeedbackError ? error.status : 503)
  }
}

export function localRateLimiter() {
  const windows = new Map()
  return (key, limit, now = Date.now()) => {
    for (const [key, value] of windows) if (value.until <= now) windows.delete(key)
    const bucket = windows.get(key) || { count: 0, until: now + 60000 }
    windows.set(key, bucket)
    return ++bucket.count <= limit
  }
}
