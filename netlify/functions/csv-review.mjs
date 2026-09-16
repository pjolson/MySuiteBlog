import { netlifyStore } from '../../server/csv-feedback/store.mjs'
import { handleReview } from '../../server/csv-feedback/review.mjs'
import { jsonResponse } from '../../server/csv-feedback/http.mjs'

export default async request => {
  try { return await handleReview(request, { store: await netlifyStore(), password: process.env.CSV_REVIEW_PASSWORD }) }
  catch { return jsonResponse({ error: 'Temporarily unavailable' }, 503) }
}
export const config = { path: ['/private/csv-review', '/private/csv-review/export'], rateLimit: { windowLimit: 30, windowSize: 60, aggregateBy: ['ip', 'domain'] } }
