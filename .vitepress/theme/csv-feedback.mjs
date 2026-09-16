import { normalize, searchEntries } from '../data/csv-errors/search.mjs'
import catalogueVersion from '../data/csv-errors/version.json' with { type: 'json' }

export { catalogueVersion }
export const settledSearchMs = 1200

// GA's opt-out is applied before typing and kept for this tab's lifetime so
// delayed automatic form/search events cannot include sensitive interactions.
export function protectSearchPrivacy() {
  if (typeof window !== 'undefined') window['ga-disable-G-R3FVBP7K9S'] = true
}

export async function postFeedback(path, payload) {
  const response = await fetch(path, {
    method: 'POST', credentials: 'omit', referrerPolicy: 'no-referrer',
    headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10000)
  })
  if (!response.ok || (await response.json()).stored !== true) throw new Error('Unable to save feedback')
}

export function createSearchTracker({ source, filters = () => ({}), send = payload => postFeedback('/api/csv-search-event', payload), delay = settledSearchMs }) {
  let timer
  let lastQuery = ''
  function cancel() { clearTimeout(timer) }
  function settle(query) {
    cancel()
    const key = normalize(query)
    if (!key || key === lastQuery) return
    lastQuery = key
    const { context = '', category = '' } = filters()
    const all = searchEntries(query)
    const visible = searchEntries(query, { context, category })
    if (visible.results.length) return
    const unfilteredMatches = all.results.length > 0
    // Explicit allowlist. Never spread session state or a search result into
    // a telemetry payload. The random ID is unrelated to the query.
    const event = { id: crypto.randomUUID(), source, context, category, unfilteredMatches,
      outcome: unfilteredMatches ? 'filtered' : 'unknown', catalogueVersion }
    Promise.resolve().then(() => send(event)).catch(() => {})
  }
  return {
    cancel, settle,
    schedule(query) {
      cancel()
      if (!normalize(query)) { lastQuery = ''; return }
      timer = setTimeout(() => settle(query), delay)
    }
  }
}
