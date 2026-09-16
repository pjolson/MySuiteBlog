import { reactive } from 'vue'

// Memory only. Do not put pasted errors in URLs, browser storage, or analytics.
export const csvSession = reactive({ query: '', context: '', category: '', source: 'translator', reviewRequested: false })
export function clearSearch() {
  csvSession.query = ''
  csvSession.context = ''
  csvSession.category = ''
  csvSession.source = 'translator'
  csvSession.reviewRequested = false
}
export function rememberQuery(query) {
  if (csvSession.query !== query) {
    csvSession.context = ''
    csvSession.category = ''
  }
  csvSession.query = query
  csvSession.source = 'header'
}
