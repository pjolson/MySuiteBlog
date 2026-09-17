import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { entries, guides, basePath, searchSections, importTypes } from '../.vitepress/data/csv-errors/catalogue.mjs'
import { importTypeGroups } from '../.vitepress/data/csv-errors/import-types.mjs'
import { searchEntries, headerResults, normalize } from '../.vitepress/data/csv-errors/search.mjs'
import { renderGuide, publicProcedure } from '../.vitepress/data/csv-errors/render.mjs'
import { questionFor } from '../.vitepress/data/csv-errors/questions.mjs'
import { detailedEntryIds } from '../.vitepress/data/csv-errors/guides.mjs'

const ids = (query, options) => searchEntries(query, options).results.flatMap(result => result.entries.map(entry => entry.id))
const scenarios = [
  ['changing inventory status IDs', 'Invalid inventorystatus reference key 987 for issueinventorynumber 0000123.', {}, ['FLD-01']],
  ['quantity with long decimals and whitespace', '  You only have   100.1234567890123 available.  Please enter a different quantity. ', {}, ['FLD-02']],
  ['all invalid-item contexts', 'Invalid item reference key OLD__PART-17', {}, ['INVC-03', 'SAL-05', 'KIT-01', 'ITM-04', 'CST-02']],
  ['kit-specific item reference', 'Invalid item reference key OLD__PART-17', { context: 'Kits and packages' }, ['KIT-01']],
  ['ambiguous required Type', 'Please enter value for Type', {}, ['CUS-03', 'ITM-07']],
  ['expense amount', 'Please enter value for Amount', { context: 'Expense reports' }, ['EXP-01']],
  ['vendor bill invalid numeric text', 'Invalid amount €1,250.50', { context: 'Vendor bills' }, ['VBL-05']],
  ['customer and contact Illegal ID', 'Illegal ID', { context: 'Customers with contacts' }, ['CON-01']],
  ['apply sublist contexts', 'Invalid reference for apply sublist [doc,line]', {}, ['INVC-02', 'VPY-02', 'VPY-04']],
  ['record created before script failed', 'Record 927 was created but afterSubmit failed', {}, ['GEN-09', 'SYS-07']],
  ['routing sequence', 'Duplicate sequence number 10', { context: 'Manufacturing routings' }, ['ROU-03']],
  ['primary-file duplicate', 'Primary file contains duplicate key INV-0001', { context: 'Vendor bills' }, ['VBL-02']],
  ['meaningful character limit', 'Field exceeds maximum length of 61 characters', {}, ['EMP-03']],
  ['technical custom field ID', 'Invalid custitem_part_family reference key 00456', {}, ['ITM-03']],
  ['meaningful percentage limit', 'Sales contribution exceeds 100%', {}, ['TXN-05']]
]

test('reviewed exact-message families route through both searches', () => {
  const cases = [
    ['You have entered an Invalid Field Value ABC for the following field: custbody_example', ['GEN-04']],
    ['Please enter value(s) for: Memo', ['GEN-03']],
    ['Please enter value(s) for: Currency', ['EMP-01']],
    ['Invalid date value (must be entered as mm/dd/yyyy)', ['TXN-04']],
    ['The transaction date you specified is not within the date range of your accounting period', ['TXN-04']],
    ['Invalid subsidiary reference key Europe', ['SYS-04']],
    ['This record already exists', ['TXN-03']],
    ['Could not find any records by this name.', ['ITM-13']],
    ['The amounts in a journal entry must balance.', ['JRN-08']]
  ]
  for (const [query, expected] of cases) {
    assert.deepEqual(ids(query), expected, query)
    assert.equal(headerResults(query, [])[0].id, entries.find(entry => entry.id === expected[0]).url, query)
  }
  assert.deepEqual(ids('An unexpected error has occurred').sort(), ['ASM-02', 'ITM-10'])
})

test('the first editorial pass contains 116 entry-specific explanations', () => {
  assert.equal(detailedEntryIds.size, 116)
  for (const id of detailedEntryIds) {
    const entry = entries.find(item => item.id === id)
    assert.ok(entry?.detailed, id)
    assert.ok(entry.tailoredSteps, `${id} needs entry-specific steps`)
    assert.ok(entry.sources.length && entry.documentationCheckedAt, `${id} needs reviewed sourcing`)
  }
})
for (const [name, query, options, expected] of scenarios) {
  test(name, () => assert.deepEqual(ids(query, options).sort(), [...expected].sort()))
}

test('every researched entry is retained once in a canonical guide', () => {
  const brief = readFileSync(new URL('../researchdocs/MySuite-CSV-Error-Translator-Project.md', import.meta.url), 'utf8')
  const catalogue = brief.split('## 7. Error catalogue')[1].split('## 8. Reusable')[0]
  const sourceIds = [...new Set([...catalogue.matchAll(/(?:^\| |^#### )([A-Z]+-\d\d)/gm)].map(match => match[1]))].sort()
  assert.equal(sourceIds.length, 119)
  // Documented post-brief discoveries from the journal common-errors page.
  const expected = [...sourceIds, 'JRN-09', 'JRN-10'].sort()
  assert.deepEqual(entries.map(entry => entry.id).sort(), expected)
  assert.deepEqual(guides.flatMap(guide => guide.ids).sort(), expected)
  assert.equal(guides.length, 35)
})

test('each entry is findable by its human title', () => {
  for (const entry of entries) assert.ok(ids(entry.title).includes(entry.id), entry.id)
})

test('natural-language aliases and modest typos find the intended guide', () => {
  for (const [query, slug] of [
    ['invlaid item', 'item-reference'], ['Excel changed my numbers', 'numbers-and-spreadsheet-changes'],
    ["available but can't adjust", 'inventory-quantity'], ['wrong date', 'dates-and-periods'],
    ['import failed but record exists', 'failed-after-saving']
  ]) assert.equal(searchEntries(query).results[0]?.slug, slug, query)
})

test('an inferred import context ranks its section first', () => {
  const result = searchEntries('Invalid item reference key OLD__PART-17 on invoice').results[0]
  assert.equal(result.entries[0].id, 'INVC-03')
  assert.equal(result.url, entries.find(entry => entry.id === 'INVC-03').url)
})

test('unknown messages and altered account identifiers do not invent diagnoses', () => {
  for (const query of ['Unknown custom script says the purple llama ate the item', 'XYZZY_93217 validation failed', 'OLD__PART-17', 'USD123invaliditem']) {
    assert.equal(searchEntries(query).results.length, 0, query)
  }
})

test('wrong filters expose matches outside the selected context', () => {
  const query = 'Invalid inventorystatus reference key 987 for issueinventorynumber 00017'
  const filtered = searchEntries(query, { context: 'Customers' })
  assert.equal(filtered.results.length, 0)
  assert.equal(filtered.otherCount, 1)
  assert.equal(searchEntries(query).results[0].entries[0].id, 'FLD-01')
})

test('normalization preserves significant numbers and underscores, without changing the input', () => {
  const original = ' OLD__PART-17; 61 characters; 100%; 100.12345678 '
  assert.ok(normalize(original).includes('old__part'))
  assert.ok(normalize(original).includes('61'))
  assert.ok(normalize(original).includes('100%'))
  searchEntries(original)
  assert.equal(original, ' OLD__PART-17; 61 characters; 100%; 100.12345678 ')
})

test('header and translator results agree without alias duplicates or lost articles', () => {
  const article = { id: '/blog/netsuite-data-migration#test', title: 'Migration', match: {} }
  for (const [, query] of scenarios) {
    const main = searchEntries(query).results
    const header = headerResults(query, [article, { id: `${basePath}inventory-status#old-alias` }])
    assert.deepEqual(header.filter(result => result.id.startsWith(basePath)).map(result => result.id), main.map(result => result.url))
    assert.ok(header.some(result => result.id === article.id))
    assert.equal(new Set(header.map(result => result.id)).size, header.length)
    for (const result of main) assert.equal(result.url.includes('?'), false)
  }
  assert.deepEqual(headerResults('', []), [])
})

test('each guide has sources, first checks, steps, stable anchors, and clean visitor copy', () => {
  for (const guide of guides) {
    const md = renderGuide(guide)
    assert.doesNotMatch(md, /\u2014|review note D\d|\bP\d\d\b/)
    for (const entry of entries.filter(entry => entry.slug === guide.slug)) {
      assert.ok(md.includes(`{#${entry.anchor}}`), entry.id)
      assert.ok(entry.sources.length && entry.sources.every(url => md.includes(url)), entry.id)
      assert.ok(entry.explanation && entry.firstCheck && entry.procedureIds.length, entry.id)
    }
    assert.ok(md.includes('**Check this first**'))
    assert.ok(md.includes('details Show the steps'))
    assert.equal(searchSections(`/project${basePath}${guide.slug}.md`).length, guide.ids.length)
  }
})

test('review-sensitive instructions remain scoped and non-destructive', () => {
  const find = id => entries.find(entry => entry.id === id)
  assert.doesNotMatch(publicProcedure('P10', find('ITM-08')), /enable sublist replacement(?!\.)/)
  assert.match(renderGuide(guides.find(g => g.slug === 'item-pricing')), /disagree about replacing item pricing/)
  assert.match(renderGuide(guides.find(g => g.slug === 'demand-plans')), /Item field identifies the item/)
  assert.doesNotMatch(publicProcedure('P07', find('IVD-01')), /issue-number|receipt-number/)
  assert.doesNotMatch(publicProcedure('P06', find('ITM-05')), /blank values|sequential line/)
  assert.match(renderGuide(guides.find(g => g.slug === 'manufacturing-routing-operations')), /within the same routing/)
})

test('follow-up answers change the next instruction', () => {
  for (const id of ['FLD-01', 'FLD-02', 'EMP-01', 'GEN-09', 'TXN-02', 'INVC-01', 'ITM-03']) {
    const question = questionFor(entries.find(entry => entry.id === id))
    assert.ok(question.prompt)
    assert.ok(question.options.length >= 2)
    assert.equal(new Set(question.options.map(option => option.answer)).size, question.options.length)
  }
})

test('custom item references retain the matched answer and safe section URL', () => {
  for (const query of [
    'Invalid custitem_example_legacyitem reference key 12345.',
    '  INVALID   CUSTITEM_OTHER_CODE  reference   key 00009. ',
    'Invalid custitem_family reference key Blue__Small.',
    'Invalid custitem_region reference key'
  ]) {
    const result = searchEntries(query).results[0]
    assert.deepEqual(result.entries.map(entry => entry.id), ['ITM-03'])
    assert.equal(result.title, 'A custom item field cannot match its selection')
    assert.equal(result.url, entries.find(entry => entry.id === 'ITM-03').url)
    assert.equal(headerResults(query, [])[0].title, result.title)
    assert.ok(!result.url.includes('12345') && !result.url.includes('custitem_'))
  }
  const generic = searchEntries('invalid reference key').results
  assert.ok(generic.length > 1)
  assert.ok(generic.find(result => result.entries.some(entry => entry.id === 'ITM-03')).entries.length > 1)
})

test('partial inventory status references survive varying values without broad reference guessing', () => {
  for (const query of ['Invalid inventorystatus reference key', 'Invalid inventorystatus reference key 123', 'INVALID  INVENTORYSTATUS reference key 00009 for', 'Invalid inventory status reference key Available']) {
    assert.deepEqual(ids(query), ['FLD-01'])
    const filtered = searchEntries(query, { category: 'Record references' })
    assert.equal(filtered.results.length, 0)
    assert.equal(filtered.otherCount, 1)
    assert.equal(headerResults(query, [])[0].id, entries.find(entry => entry.id === 'FLD-01').url)
  }
  assert.equal(searchEntries('My unknown status widget failed').results.length, 0)
})

test('inventory bin check is visible outside collapsed procedure and conditional', () => {
  const md = renderGuide(guides.find(guide => guide.slug === 'inventory-status'))
  assert.match(md, /:::\n\n### Does the stock have a bin assignment\?/)
  assert.match(md, /If the item uses bins and the relevant stock has no bin assignment/)
  assert.match(md, /A blank bin is not an error for every item/)
})

test('received-line restriction matches distinctive wording without assuming a purchase order', () => {
  for (const query of [
    'You cannot change the selected item because it has already been received.',
    ' YOU CANNOT  CHANGE THE SELECTED ITEM because it has already been RECEIVED! ',
    'Cannot change the selected item: already been received',
    'cannot change received item', 'change item after receiving', 'CSV changes a received line'
  ]) {
    assert.deepEqual(ids(query), ['FLD-03'], query)
    const result = searchEntries(query).results[0]
    assert.deepEqual(result.contexts, ['Transactions'])
    assert.equal(headerResults(query, [])[0].id, result.url)
  }
  assert.ok(!ids('already received').includes('FLD-03'))
  assert.equal(searchEntries('already received').needsContext, true)
  assert.ok(!ids('You cannot change the selected item because it has already been fulfilled.').includes('FLD-03'))
  assert.deepEqual(ids('Invalid inventorystatus reference key 123'), ['FLD-01'])
  assert.ok(!ids('Invalid item reference key ABC').includes('FLD-03'))
})

test('received-line guide keeps tailored, conditional advice and distinct unselected branches', () => {
  const entry = entries.find(entry => entry.id === 'FLD-03')
  const md = renderGuide(guides.find(guide => guide.ids.includes('FLD-03')))
  assert.match(md, /Advanced Receiving/)
  assert.match(md, /partially received/)
  assert.match(md, /Changing this option does not make a received item freely replaceable/)
  assert.match(md, /exact error message was supplied during translator testing/)
  assert.doesNotMatch(md, /Content and implementation notes|Review status|P01|P06/)
  assert.ok(md.includes(entries.find(entry => entry.id === 'SAL-06').url))
  assert.match(md, /\(Sales orders\)/)
  const q = questionFor(entry)
  assert.equal(q.prompt, 'What were you trying to change?')
  assert.equal(q.options.length, 4)
  assert.equal(new Set(q.options.map(option => option.answer)).size, 4)
  assert.match(q.options[0].answer, /Do not blank an existing line/)
  assert.match(q.options[1].answer, /mapped blank Line\/Order Line/)
  assert.match(q.options[2].answer, /Deleting a receipt should not be the default/)
  assert.equal(entry.evidenceType, 'field-example')
})

test('record type mismatch recognizes its family independently of type identifiers', () => {
  const queries = [
    'The record you are   attempting to load has a different type: otherchargesaleitem from the type   specified: otherchargepurchaseitem.',
    'THE RECORD YOU ARE ATTEMPTING TO LOAD HAS A DIFFERENT TYPE: otherchargepurchaseitem FROM THE TYPE SPECIFIED: otherchargesaleitem!',
    'The record you are attempting to load has a different type: inventoryitem from the type specified: serializedinventoryitem.',
    'The record you are attempting to load has a different type: lotnumberedinventoryitem from the type specified: serializedinventoryitem.',
    'The record you are attempting to load has a different type: customer from the type specified: vendor.',
    'The record you are attempting to load has a different type: customrecord_alpha from the type specified: customrecord_beta.',
    'The record you are attempting to load has a different type',
    'SSS_RECORD_TYPE_MISMATCH', 'record type mismatch', 'different type from the type specified',
    'wrong item type selected', 'item import record type'
  ]
  for (const query of queries) {
    assert.deepEqual(ids(query), ['INV-02'], query)
    const result = searchEntries(query).results[0]
    assert.equal(result.title, 'Record type does not match the existing record')
    assert.equal(result.url, `${basePath}item-units-and-types#the-item-type-differs-from-the-import-type`)
    assert.equal(headerResults(query, [])[0].id, result.url)
  }
})

test('type interpretation preserves order, raw identifiers and missing values', async () => {
  const {parseRecordTypes} = await import('../.vitepress/data/csv-errors/record-type.mjs')
  const pair = (a,b) => parseRecordTypes(`The record you are attempting to load has a different type: ${a} from the type specified: ${b}.`)
  assert.equal(pair('otherchargesaleitem','otherchargepurchaseitem').actual.label, 'Other Charge for Sale')
  assert.equal(pair('otherchargepurchaseitem','otherchargesaleitem').actual.label, 'Other Charge for Purchase')
  assert.equal(pair('otherchargepurchaseitem','otherchargesaleitem').requested.label, 'Other Charge for Sale')
  assert.equal(pair('customer','vendor').actual.item, false)
  assert.deepEqual(pair('CustomRecord_Alpha','UNKNOWN_Beta').actual, {identifier:'CustomRecord_Alpha',label:null,item:false})
  assert.equal(pair('inventoryitem','serializedinventoryitem').requested.label,'Serialized Inventory Item')
  assert.equal(parseRecordTypes('SSS_RECORD_TYPE_MISMATCH'),null)
  assert.equal(parseRecordTypes('The record you are attempting to load has a different type'),null)
})

test('other type errors retain their own families and INV-02 remains one entry', () => {
  assert.deepEqual(ids('Please enter value for Type').sort(), ['CUS-03','ITM-07'])
  assert.deepEqual(ids('Invalid purchaseunit reference key 21'), ['ITM-02'])
  assert.deepEqual(ids('Invalid parent reference key inventoryitem').sort(), ['ITM-12','ITM-15'])
  assert.ok(!ids('The record you are attempting to load cannot be transformed').includes('INV-02'))
  assert.ok(!ids('Unsupported transformation from inventoryitem to customer').includes('INV-02'))
  assert.equal(entries.filter(entry=>entry.id==='INV-02').length,1)
  assert.equal(entries.length,121)
  const entry = entries.find(entry=>entry.id==='INV-02')
  assert.equal(entry.reviewStatus,'source-reviewed')
  assert.equal(questionFor(entry).options.length,5)
  const md=renderGuide(guides.find(guide=>guide.ids.includes('INV-02')))
  assert.match(md,/Reported item-import example/)
  assert.match(md,/For item imports: match the item import/)
  assert.match(md,/not a confirmed resolution/)
  assert.doesNotMatch(md,/34807|Content and implementation notes/)
})

test('sales-order item references retain characters and context-specific matches', () => {
  for (const reference of ['001234','000ABC__Part-09','000000000000123456789','Blue / Small']) {
    const query = `Invalid item reference key ${reference}.`
    assert.deepEqual(ids(query, {context:'Sales orders'}), ['SAL-05'])
    assert.equal(query, `Invalid item reference key ${reference}.`)
    assert.deepEqual(ids(query).sort(), ['CST-02','INVC-03','ITM-04','KIT-01','SAL-05'])
    assert.deepEqual(ids(query,{context:'Invoices and credits'}),['INVC-03'])
    assert.deepEqual(ids(query,{context:'Kits and packages'}),['KIT-01'])
    assert.ok(headerResults(query,[]).some(result=>result.id.startsWith(`${basePath}item-reference#`)))
  }
  for(const query of ['item reference lost leading zeros','Excel changed item code','sales order invalid item reference']) {
    assert.deepEqual(ids(query,{context:'Sales orders'}),['SAL-05'])
  }
  assert.equal(searchEntries('sales order invalid item reference').results[0].entries[0].id,'SAL-05')
  assert.equal(headerResults('sales order invalid item reference',[])[0].id,entries.find(e=>e.id==='SAL-05').url)
})

test('SAL-05 preserves mapping checks and adds conditional identifier preservation once', () => {
  const entry=entries.find(e=>e.id==='SAL-05')
  assert.equal(entries.filter(e=>e.id==='SAL-05').length,1)
  assert.equal(entries.length,121)
  assert.deepEqual(entry.procedureIds,['P01','P04'])
  assert.match(entry.firstCheck,/item selection and the mapping/)
  const md=renderGuide(guides.find(g=>g.ids.includes('SAL-05')))
  assert.equal(md.split('### Did the spreadsheet change the item reference?').length-1,1)
  assert.match(md,/Text before pasting or importing the references/)
  assert.match(md,/after characters have been lost does not bring them back/)
  assert.match(md,/Open it in a text editor/)
  assert.match(md,/Use \*\*Update\*\* when changing existing sales orders; use the data-handling mode appropriate/)
  assert.match(md,/Formatting is not the explanation for every invalid-item message/)
  assert.match(md,/does not change NetSuite's Name\/Internal ID\/External ID mapping/)
  assert.match(md,/Microsoft: Keeping leading zeros/)
  assert.doesNotMatch(md,/71261|02\/26\/2026|fixed width|pad with zeros/)
})

test('ITM-13 matches the record-not-found family in both search paths without assuming a cause', () => {
  const entry=entries.find(e=>e.id==='ITM-13')
  for(const query of ['Could not find any records by this name.','Could not find any records by this name','  "COULD   not Find any records BY this NAME."  ','Could not find any records','RCRD_NOT_FOUND']) {
    assert.deepEqual(ids(query),['ITM-13'],query)
    assert.equal(searchEntries(query).results[0].title,entry.title)
    assert.equal(headerResults(query,[])[0].id,entry.url)
    for(const context of entry.contexts) assert.deepEqual(ids(query,{context}),['ITM-13'])
  }
  assert.equal(entry.url,`${basePath}parent-and-matrix-items#a-matrix-child-cannot-be-found-by-name`)
  for(const query of ['RCRD_DSNT_EXIST','RCRD_PREVSLY_DELETED','SSS_RECORD_TYPE_MISMATCH','Invalid item reference key 123']) assert.ok(!ids(query).includes('ITM-13'))
  assert.ok(searchEntries('record').results.every(result=>!result.matched))
})

test('ITM-13 preserves conditional scenarios and independent identity checks', () => {
  const entry=entries.find(e=>e.id==='ITM-13')
  assert.equal(entries.filter(e=>e.id==='ITM-13').length,1)
  assert.equal(entries.length,121)
  assert.equal(guides.length,35)
  assert.equal(entry.category,'Record references')
  assert.match(entry.firstCheck,/begin with the item's own identity/)
  assert.match(entry.explanation,/does not establish that the record was deleted/)
  const q=questionFor(entry)
  assert.deepEqual(q.options.map(o=>o.label),['Internal ID','External ID','Name',"I'm not sure"])
  assert.match(q.options[0].answer,/account receiving the import/)
  assert.match(q.options[2].answer,/map the new name separately/)
  const md=renderGuide(guides.find(g=>g.ids.includes('ITM-13')))
  assert.match(md,/If this is a matrix-child item update/)
  assert.match(md,/\| Shirt-Blue-Small \| Shirt \|/)
  assert.match(md,/verified internal ID/)
  assert.match(md,/not a general fix for a failed match/)
  assert.match(md,/does not mean every Account Name column/)
  assert.match(md,/If the message includes a script error or stack trace/)
  assert.match(md,/reported Inventory Item update has no tested resolution/)
  assert.ok(entry.contextChecks['Chart of Accounts'].text.includes('ledger account'))
  assert.ok(entry.contextChecks['Vendor-Subsidiary Relationship'].text.includes('already exists'))
})

test('journal balance wording matches JRN-08 independently of rounding', () => {
  const entry=entries.find(e=>e.id==='JRN-08')
  for(const query of ['The amounts in a journal entry must balance.','The amounts in a journal entry must balance','THE amounts in a JOURNAL   entry must balance.','amounts in a journal entry must balance','journal entry must balance']) {
    assert.deepEqual(ids(query),['JRN-08'])
    assert.equal(searchEntries(query).results[0].matched,true)
    assert.equal(headerResults(query,[])[0].id,entry.url)
    for(const category of ['Transaction lines','Dates and numbers']) assert.deepEqual(ids(query,{category}),['JRN-08'])
  }
  for(const query of ['journal balances in Excel but import fails','debit credit line order']) {
    assert.deepEqual(ids(query),['JRN-08'])
    assert.equal(searchEntries(query).results[0].matched,false)
    assert.equal(headerResults(query,[])[0].id,entry.url)
  }
  assert.ok(searchEntries('balance').results.every(r=>!r.matched))
  assert.deepEqual(ids('Rounding Error'),['JRN-07'])
  assert.ok(entries.find(e=>e.id==='JRN-07').relatedIds.includes('JRN-08'))
})

test('journal balance guidance keeps totals, grouping, workaround and update checks distinct', () => {
  const e=entries.find(e=>e.id==='JRN-08')
  const md=renderGuide(guides.find(g=>g.ids.includes('JRN-08')))
  assert.equal(entries.length,121)
  assert.equal(guides.length,35)
  assert.match(e.explanation,/Each journal must balance on its own/)
  assert.match(e.detailMarkdown,/combined 200 on each side does not make either journal valid/)
  assert.match(e.tailoredSteps,/dedicated Single Journal Entry import handles one journal/)
  assert.match(e.additionalChecks,/70365/)
  assert.match(e.additionalChecks,/Move complete rows/)
  assert.match(e.additionalChecks,/Do not sort the Debit or Credit column by itself/)
  assert.match(e.additionalChecks,/Reordering cannot fix unequal totals or an incorrect mapping/)
  assert.match(e.additionalChecks,/Single Journal Entry Import Assistant does not support updates/)
  assert.match(e.additionalChecks,/not a routine fix/)
  assert.match(e.additionalChecks,/Do not assume that the standard-journal line-order workaround explains its failure/)
  assert.ok(md.includes(e.summary))
  assert.match(md,/### The amounts balance, but NetSuite still rejects the journal/)
  assert.ok(e.relatedIds.includes('JRN-05'))
  assert.ok(md.includes(entries.find(e=>e.id==='JRN-07').url))
})

test('a definitive inventory-quantity message still short-circuits to its entry', () => {
  const query = 'You only have 12 available. Please enter a different quantity.'
  const { results } = searchEntries(query)
  assert.equal(results.length, 1)
  assert.deepEqual(results[0].entries.map(entry => entry.id), ['FLD-02'])
  assert.equal(results[0].matched, true)
  assert.equal(results[0].url, entries.find(entry => entry.id === 'FLD-02').url)
  assert.equal(headerResults(query, [])[0].id, results[0].url)
})

test('an unexpected error without context is general guidance, not an item diagnosis', () => {
  for (const query of ['Unexpected Error', 'An unexpected error has occurred']) {
    const result = searchEntries(query)
    assert.equal(result.needsContext, false, query)
    const first = result.results[0]
    assert.equal(first.slug, 'unexpected-error', query)
    assert.equal(first.matched, false, query)
    assert.equal(first.url, `${basePath}unexpected-error#unexpected-error`, query)
    assert.equal(first.title, guides.find(guide => guide.slug === 'unexpected-error').title, query)
  }
})

test('item context ranks the documented unexpected-error case without claiming a confirmed cause', () => {
  const filtered = searchEntries('Unexpected Error', { context: 'Item translations' })
  assert.deepEqual(filtered.results[0].entries.map(entry => entry.id), ['ITM-10'])
  assert.equal(filtered.results[0].matched, false)
  assert.equal(filtered.results[0].url, entries.find(entry => entry.id === 'ITM-10').url)
})

test('a journal-context unexpected error does not become an item diagnosis', () => {
  const filtered = searchEntries('Unexpected Error', { context: 'Journal entries' })
  assert.ok(filtered.results.every(result => result.entries.every(entry => !['ITM-10', 'ASM-02'].includes(entry.id))))
  assert.ok(filtered.otherCount > 0)
})

test('a generic item reference stays one ambiguous family with context choices', () => {
  const { results } = searchEntries('Invalid item reference key SKU-0100')
  assert.equal(results.length, 1)
  assert.equal(results[0].entries.length, 5)
  assert.equal(results[0].title, guides.find(guide => guide.slug === 'item-reference').title)
  assert.equal(results[0].url, `${basePath}item-reference#item-reference`)
  assert.ok(results[0].contexts.length >= 4)
})

test('a distinctive item reference with import context selects the right candidate', () => {
  assert.deepEqual(ids('Invalid item reference key SKU-0100', { context: 'Kits and packages' }), ['KIT-01'])
  const inferred = searchEntries('Invalid item reference key SKU-0100 on invoice').results[0]
  assert.equal(inferred.entries[0].id, 'INVC-03')
  assert.equal(inferred.url, entries.find(entry => entry.id === 'INVC-03').url)
})

test('received fragments ask for clarification while the full message stays exact', () => {
  for (const query of ['already received', 'Item already received', ' The item already been RECEIVED! ']) {
    const result = searchEntries(query)
    assert.equal(result.needsContext, true, query)
    assert.ok(result.clarificationPrompt.includes('Paste the full error'), query)
    assert.ok(result.results.every(item => item.entries.every(entry => entry.id !== 'FLD-03')), query)
  }
  assert.deepEqual(ids('You cannot change the selected item because it has already been received.'), ['FLD-03'])
  assert.equal(searchEntries('The order was received yesterday').needsContext, false)
})

test('altered technical identifiers stay exact and do not fuzzy-match', () => {
  for (const query of ['inventorystatuses mismatch', 'issueinventorynumbers 91', 'custitem9 lookup']) {
    assert.equal(searchEntries(query).results.length, 0, query)
  }
})

test('ordinary long-word typos keep their fuzzy match', () => {
  assert.equal(searchEntries('wrong datte').results[0]?.slug, 'dates-and-periods')
})

test('the employee reference message shows its wording, plain steps, and no duplicate advice', () => {
  const entry = entries.find(entry => entry.id === 'EMP-04')
  for (const query of ['Invalid employee reference key 9846', 'Invalid employee reference key ABC-01', 'invalid EMPLOYEE reference key']) {
    const first = searchEntries(query).results[0]
    assert.deepEqual(first.entries.map(item => item.id), ['EMP-04'], query)
    assert.equal(first.url, entry.url, query)
    assert.equal(headerResults(query, [])[0].id, entry.url, query)
  }
  assert.deepEqual(entry.messageFragments, ['Invalid employee reference key'])
  assert.match(entry.firstCheck, /format the Time Tracking form shows/)
  const md = renderGuide(guides.find(guide => guide.ids.includes('EMP-04')))
  assert.ok(md.includes('- `Invalid employee reference key`'))
  const section = md.split('## The employee cannot be matched')[1].split('\n## ')[0]
  assert.doesNotMatch(section, /duplicate-record message|generate new external IDs/)
  assert.match(section, /reference type to Internal ID or Names/)
  const duplicates = renderGuide(guides.find(guide => guide.slug === 'duplicate-records'))
  assert.match(duplicates, /update that record or create a different one/)
})

test('the apply-sublist entry teaches the documented one-row correction', () => {
  const entry = entries.find(entry => entry.id === 'INVC-02')
  assert.match(entry.tailoredSteps, /single application row/)
  assert.match(entry.tailoredSteps, /leave both blank on the remaining rows/)
  const md = renderGuide(guides.find(guide => guide.ids.includes('INVC-02')))
  assert.match(md, /\| 2001 \| 3005 \| 250 \|/)
  assert.match(md, /\| \| 3005 \| \|/)
  assert.doesNotMatch(md.split('## Invoice or credit application rows repeat a document')[1].split('\n## ')[0], /editorial checklist/)
})

test('customer import errors carry documented wording and fixes', () => {
  assert.deepEqual(ids('Matched more than one record'), ['CUS-02'])
  for (const id of ['CUS-01', 'CUS-02', 'CUS-03', 'CUS-04', 'CUS-05', 'CUS-06', 'CUS-07']) {
    assert.ok(entries.find(entry => entry.id === id).tailoredSteps, id)
  }
  const identifiers = renderGuide(guides.find(guide => guide.ids.includes('CUS-02')))
  assert.match(identifiers, /Child of is mapped/)
  assert.match(identifiers, /internal ID, external ID, or customer ID only/)
  const typeGuide = renderGuide(guides.find(guide => guide.ids.includes('CUS-07')))
  assert.match(typeGuide, /Default Customer Type of Individual/)
  assert.match(typeGuide, /clear its Mandatory box/)
})

test('errors stay reachable under the import type Oracle files them beneath', () => {
  assert.deepEqual(ids('Please enter value(s) for: Currency', { context: 'Employees and expense categories' }), ['EMP-01'])
  assert.deepEqual(ids('Please enter value(s) for: Currency', { context: 'Expense reports' }), ['EMP-01'])
  assert.ok(ids('Invalid item reference key SKU-0100', { context: 'Item records' }).includes('ITM-04'))
})

test('a wrong filter names the import types the matches are filed under', () => {
  const filtered = searchEntries('Invalid inventorystatus reference key 987 for issueinventorynumber 0000456', { context: 'Customers' })
  assert.equal(filtered.results.length, 0)
  assert.ok(filtered.otherContexts.includes('Inventory adjustments'))
  assert.ok(!filtered.otherContexts.includes('Customers'))
  assert.deepEqual(searchEntries('XYZZY_00000 exploded').otherContexts, [])
})

test('the import-type taxonomy covers every catalogue context exactly once', () => {
  const contexts = importTypeGroups.flatMap(group => group.types.map(type => type.context))
  assert.deepEqual([...contexts].sort(), [...importTypes].sort())
  assert.equal(new Set(contexts).size, contexts.length)
  const labels = importTypeGroups.flatMap(group => group.types.map(type => type.label))
  assert.equal(new Set(labels).size, labels.length)
})

test('every documented message fragment routes back to its entry', () => {
  // These entries' fragments are single generic words from Oracle's error
  // lists ("Type", "subsidiary", "Account"); ambiguity without an import type
  // is the honest answer, so they must resolve once the type is chosen.
  // REL-02's documented wording is the generic invalid-field-value family, so
  // it shares a definitive rule with GEN-04 and resolves via import type.
  const needsImportType = new Set(['CPY-01', 'DMD-01', 'ITM-07', 'JRN-01', 'JRN-03', 'JRN-05', 'REL-02', 'REL-03', 'ROU-02', 'SYS-04', 'VBL-01', 'VBL-04', 'VBL-05', 'VPY-01'])
  const position = (results, id) => results.findIndex(result => result.entries.some(entry => entry.id === id))
  for (const entry of entries) {
    for (const fragment of entry.messageFragments) {
      const plain = position(searchEntries(fragment).results, entry.id)
      if (needsImportType.has(entry.id)) {
        assert.ok(plain >= 0, `${entry.id} "${fragment}" missing without an import type`)
        const scoped = position(searchEntries(fragment, { context: entry.contexts[0] }).results, entry.id)
        assert.ok(scoped >= 0 && scoped <= 2, `${entry.id} "${fragment}" with ${entry.contexts[0]}`)
      } else {
        assert.equal(plain, 0, `${entry.id} "${fragment}"`)
      }
    }
  }
})

test('filters, outside-filter counts, and the unknown state share one unfiltered result', () => {
  const query = 'Invalid inventorystatus reference key 987 for issueinventorynumber 0000456'
  const unfiltered = searchEntries(query)
  const filtered = searchEntries(query, { context: 'Customers' })
  assert.equal(filtered.results.length, 0)
  assert.equal(filtered.otherCount, 1)
  assert.equal(filtered.unfilteredCount, unfiltered.results.length)
  assert.equal(searchEntries('XYZZY_00000 exploded').unfilteredCount, 0)
})
