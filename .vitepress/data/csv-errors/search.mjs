import MiniSearch from 'minisearch'
import { entries, guides, basePath } from './catalogue.mjs'

// Normalize only the search copy. Raw input and record identifiers are never rewritten.
export function normalize(text) {
  return text.toLowerCase().replace(/[’‘]/g, "'").replace(/[^\p{L}\p{N}_%]+/gu, ' ').trim().replace(/\s+/g, ' ')
}

const reference = /\b(invalid|reference|cannot match|cannot find|can t find|not find|not exist|bad reference)\b/
const required = /\b(required|missing|mandatory|blank|please enter|must enter|must provide)\b/
const rules = []
const rule = (pattern, ids, condition) => rules.push({ pattern, ids: ids.split(' '), condition })

// Match whole families before ordinary text search. Values between the distinctive
// parts may be names, IDs or quantities; meaningful limits (61, 20, 100%) stay intact.
rule(/\b(?:inventorystatus|inventory status)\b.*\breference\b/, 'FLD-01')
rule(/you only have .+ available.*please enter a different quantity/, 'FLD-02')
rule(/(?:cannot|can t) change (?:the )?(?:selected )?item.*already (?:been )?received|cannot change received item|change item after receiving|csv changes a received line/, 'FLD-03')
rule(/you have entered an invalid field value .+ for the following field/, 'GEN-04')
rule(/please enter value(?: s)? for (?!type\b|amount\b|account\b)/, 'GEN-03')
rule(/invalid date value.*must be entered as mm dd yyyy/, 'TXN-04')
rule(/transaction date.*not within the date range of your accounting period/, 'TXN-04')
rule(/invalid subsidiary reference key/, 'SYS-04')
rule(/\bitem\b.*reference|reference.*\bitem\b/, 'ITM-04 KIT-01 INVC-03 SAL-05 CST-02', reference)
rule(/\btype\b/, 'CUS-03 ITM-07', required)
rule(/\bamount\b/, 'GEN-07 EXP-01', required)
rule(/\bamount\b/, 'VBL-05', /\b(invalid|malformed|format|numeric|unreadable)\b/)
rule(/\billegal id\b/, 'CUS-07 CON-01')
rule(/\bapply\b/, 'INVC-02 VPY-02 VPY-04', /doc.*line|sublist|adding.*line|invalid|reference/)
rule(/aftersubmit/, 'GEN-09')
rule(/(?:record.*(?:created|saved|exists).*(?:script|failed|error))|(?:(?:script|failed|error).*record.*(?:created|saved|exists))/, 'GEN-09 SYS-07')
rule(/script.*usage.*(?:limit|exceed)|usage.*limit.*exceed/, 'SYS-06')
rule(/post processing.*(?:fail|error)/, 'SYS-07')
rule(/unexpected error/, 'ITM-10 ASM-02')
rule(/(?:expense|account|category).*61|61.*(?:expense|account|category)/, 'EMP-03')
rule(/vatregnumber/, 'CUS-04')
rule(/\b61\b.*(?:character|length)|(?:character|length).*\b61\b/, 'EMP-03')
rule(/\b20\b.*(?:tax|vat)|(?:tax|vat).*\b20\b/, 'CUS-04')
rule(/sequence number|duplicate.*sequence|sequence.*(?:repeat|duplicate)/, 'ROU-03')
rule(/manufacturingworkcenter/, 'ROU-04')
rule(/custitem\w*/, 'ITM-03', reference)
rule(/purchaseunit|saleunit|stockunit|unitstype/, 'ITM-02')
rule(/\bsss_record_type_mismatch\b|the record you are attempting to load has a different type|\brecord type mismatch\b|different type from the type specified|wrong item type selected|item import record type/, 'INV-02')
rule(/assetaccount|cogsaccount/, 'ITM-09')
rule(/costestimate/, 'ITM-14')
rule(/trandate/, 'TXN-04')
rule(/getfullyear|\bnan\b/, 'SAL-03')
rule(/postingperiod/, 'EXP-03')
rule(/contribution.*100%|100%.*contribution/, 'TXN-05')
rule(/usertotal|totalfield/, 'VBL-03')
rule(/name parent/, 'GEN-01')
rule(/re upload/, 'GEN-02')
rule(/mandatory field/, 'GEN-03')
rule(/permissions|read only/, 'GEN-04')
rule(/effective date/, 'GEN-05', /date|format/)
rule(/saved search/, 'GEN-06', /invalid|access|exist|reference|audience|permission/)
rule(/(?:too many|more than|mismatch|incorrect number of).*columns/, 'GEN-08')
rule(/personal language/, 'GEN-10')
rule(/custom record/, 'GEN-11', /already|duplicate|identifier/)
rule(/\bcurrency\b/, 'EMP-01', required)
rule(/\bcategory\b/, 'EMP-02 WEB-01', reference)
rule(/\bemployee\b/, 'EMP-04', reference)
rule(/lead source/, 'REL-01', reference)
rule(/incoming.*email/, 'REL-02')
rule(/\bentity\b.*(?:already exists|duplicate)|(?:already exists|duplicate).*\bentity\b/, 'REL-03')
rule(/primary name/, 'CUS-01')
rule(/matched more/, 'CUS-02')
rule(/isperson/, 'CUS-06')
rule(/country|state province/, 'CUS-05 SYS-03', /invalid|reference|match|not|country.*state/)
rule(/\bcompany\b/, 'CON-02', reference)
rule(/that record does not exist/, 'PRO-01')
rule(/please enter missing price/, 'ITM-01')
rule(/adding new line to sublist locations is not allowed/, 'ITM-05')
rule(/remove subsidiary.*used on a transaction/, 'ITM-06')
rule(/existing headers|existing matrix/, 'ITM-08')
rule(/price level/, 'ITM-11', reference)
rule(/\bparent\b/, 'ITM-12 ITM-15', reference)
rule(/\bcould not find any records\b|\brcrd_not_found\b/, 'ITM-13')
rule(/member items/, 'ASM-01', /missing|required|at least|enter|no member/)
rule(/internal id.*(?:not found|could not find)|could not find.*internal id|record.*not found.*internal id/, 'DMD-01 CPY-01')
rule(/start date/, 'DMD-02', reference)
rule(/configure the inventory detail/, 'IVD-01')
rule(/\blocale\b/, 'INV-01')
rule(/multiple values.*(?:dropdown|drop down)|(?:dropdown|drop down).*multiple values/, 'INV-03')
rule(/unique identifier/, 'TXN-01 REV-01')
rule(/\bambiguity\b/, 'TXN-02')
rule(/record already exists/, 'TXN-03')
rule(/(?:line item|at least one line)/, 'INVC-01 SAL-01 VBL-01 EXP-02 CST-01 ROU-01', /required|missing|enter|at least|no line/)
rule(/\baccount\b.*subsidiary/, 'JRN-01', reference)
rule(/\bdepartment\b/, 'JRN-02 SYS-05', reference)
rule(/\bentity\b.*currency/, 'JRN-03', reference)
rule(/blank headers/, 'JRN-04')
rule(/\baccount\b/, 'JRN-05', required)
rule(/amortization/, 'JRN-06', /date|start|end/)
rule(/rounding error/, 'JRN-07')
rule(/\bjournal entry must balance\b/, 'JRN-08')
rule(/invalid entity reference key/, 'PUR-01 JRN-03')
rule(/deleted since/, 'SAL-02')
rule(/\bterms\b.*payment\s?method/, 'SAL-04')
rule(/choose an item/, 'SAL-06')
rule(/primary.*duplicate|duplicate.*primary/, 'VBL-02')
rule(/\blocation\b/, 'VBL-04 ROU-02', reference)
rule(/accounts payable.*entity/, 'VPY-01')
rule(/payment made/, 'VPY-03')
rule(/unparseable internal id/, 'VPY-05')
rule(/translations/, 'LST-01', /adding.*line|add.*line/)
rule(/translations/, 'LST-02', /match.*line/)
rule(/customlist.*id.*name/, 'LST-03')
rule(/preferred.*date/, 'EVT-01')
rule(/\bdate\b.*end date/, 'EVT-02', required)
rule(/parse.*date time/, 'EVT-03')
rule(/start time.*end time/, 'EVT-04')
rule(/already exists/, 'REV-03', /item.*location.*date/)
rule(/invalid.*character|encoding/, 'SYS-01')
rule(/\bsubsidiary\b.*entity|entity.*subsidiary/, 'SYS-04', reference)
rule(/purchase order list.*item expense list/, 'VBL-06')

const stopWords = new Set('a an the is are was were be been to for from with in on at of and or my your this that it its please netsuite csv import imports error errors message problem'.split(' '))
const technical = new Set(entries.flatMap(entry => entry.messageFragments.flatMap(fragment => normalize(fragment).split(' '))).filter(word => /_|\d/.test(word) || /^(custitem|trandate|costestimate|manufacturingworkcenter|inventorystatus|issueinventorynumber|paymentmethod|postingperiod|usertotal|totalfield)/.test(word)))
const tokenize = text => normalize(text).split(' ').filter(word => word && !stopWords.has(word))
const index = new MiniSearch({
  fields: ['title', 'contexts', 'aliases', 'messageFragments', 'explanation', 'firstCheck'],
  extractField: (entry, field) => Array.isArray(entry[field]) ? entry[field].join(' ') : entry[field],
  tokenize,
  searchOptions: {
    combineWith: 'AND', prefix: term => term.length >= 3 && !technical.has(term),
    fuzzy: term => /^[a-z]{5,}$/.test(term) && !technical.has(term) ? 0.25 : false,
    boost: { title: 4, aliases: 3, messageFragments: 4, contexts: 2 }
  }
})
index.addAll(entries)

function inferredContext(query, entry) {
  return entry.contexts.some(context => {
    if (context === 'General imports' || context === 'Transactions') return false
    return context.split(' and ').some(part => {
      const words = tokenize(part).map(word => word.replace(/s$/, ''))
      return words.length && words.every(word => query.includes(word))
    })
  })
}

export function searchEntries(query, { context = '', category = '' } = {}) {
  const normalized = normalize(query)
  let candidates
  const matched = new Map()
  if (normalized) {
    for (const rule of rules) {
      if (rule.pattern.test(normalized) && (!rule.condition || rule.condition.test(normalized))) {
        for (const id of rule.ids) matched.set(id, (matched.get(id) || 0) + 100)
      }
    }
    if (matched.size) {
      candidates = entries.filter(entry => matched.has(entry.id)).map(entry => ({ entry, score: matched.get(entry.id), matched: true }))
    } else {
      // AND matching keeps unfamiliar custom messages from becoming diagnoses
      // merely because they contain a common word such as "item" or "amount".
      candidates = index.search(query).map(result => ({ entry: entries.find(entry => entry.id === result.id), score: result.score, matched: false }))
    }
  } else candidates = entries.map(entry => ({ entry, score: 0, matched: false }))

  // A receiving fragment alone cannot identify an item-change restriction.
  const needsContext = normalized === 'already received'
  if (needsContext) candidates = candidates.filter(result => result.entry.id !== 'FLD-03')
  const all = candidates.map(result => ({
    ...result, contextMatched: inferredContext(normalized, result.entry),
    score: result.score + (inferredContext(normalized, result.entry) ? 80 : 0)
  })).sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
  const visible = all.filter(({ entry }) => (!context || context === 'unknown' || entry.contexts.includes(context)) && (!category || (entry.categories || [entry.category]).includes(category)))
  const results = groupResults(visible)
  if (!normalized) results.sort((a, b) => guides.findIndex(guide => guide.slug === a.slug) - guides.findIndex(guide => guide.slug === b.slug))
  return { results, needsContext, otherCount: groupResults(all).length - results.length }
}

function groupResults(results) {
  const grouped = new Map()
  for (const result of results) {
    const { entry } = result
    if (!grouped.has(entry.slug)) {
      const guide = guides.find(guide => guide.slug === entry.slug)
      grouped.set(entry.slug, { ...guide, entries: [], scores: [], score: result.score, matched: result.matched, contextMatched: result.contextMatched })
    }
    grouped.get(entry.slug).entries.push(entry)
    grouped.get(entry.slug).scores.push(result.score)
  }
  return [...grouped.values()].map(result => {
    const specific = result.entries.length === 1 || result.contextMatched || (result.matched && result.scores[0] > result.scores[1])
    const first = result.entries[0]
    return {
      ...result, title: specific ? first.title : result.title,
      contexts: [...new Set(result.entries.flatMap(entry => entry.contexts))],
      url: specific ? first.url : `${basePath}${result.slug}#${result.slug}`,
      description: result.entries.length === 1 ? (first.searchSnippet || `${first.explanation} ${first.firstCheck}`) : result.summary
    }
  })
}

export function headerResults(query, existingResults) {
  if (!normalize(query)) return existingResults
  const catalogue = searchEntries(query).results.map(result => ({
    id: result.url, title: result.title,
    titles: ['CSV import errors', result.contexts.join(', ')],
    score: result.score, terms: [], queryTerms: [], match: {}
  }))
  const articles = existingResults.filter(result => !result.id.startsWith(basePath) || result.id.split('#')[0] === basePath)
  return [...catalogue, ...articles]
}
