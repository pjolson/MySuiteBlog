import MiniSearch from 'minisearch'
import { headerResults } from './search.mjs'
import { rememberQuery } from '../../theme/csv-session.js'

// The existing VitePress overlay, keyboard handling, focus trap, and article
// index stay in place. Only its result lookup gets the shared catalogue matcher.
export default {
  loadJSON(json, options) {
    const index = MiniSearch.loadJSON(json, options)
    return {
      search(query) {
        rememberQuery(query)
        return headerResults(query, index.search(query))
      }
    }
  }
}
