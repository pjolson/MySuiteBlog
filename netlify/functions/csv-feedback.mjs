import { netlifyStore } from '../../server/csv-feedback/store.mjs'
import { handleWrite, jsonResponse } from '../../server/csv-feedback/http.mjs'

export default async request => {
  try {
    return await handleWrite(request, { store: await netlifyStore(), kind: 'submissions', ready: (process.env.CSV_REVIEW_PASSWORD || '').length >= 24 })
  } catch { return jsonResponse({ error: 'Temporarily unavailable' }, 503) }
}
export const config = { path: '/api/csv-feedback', rateLimit: { windowLimit: 10, windowSize: 60, aggregateBy: ['ip', 'domain'] } }
