import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import MiniSearch from 'minisearch'
import { entries, guides, basePath } from '../.vitepress/data/csv-errors/catalogue.mjs'
import { indexableGuideSlugs } from '../.vitepress/data/csv-errors/guides.mjs'
import { headerResults } from '../.vitepress/data/csv-errors/search.mjs'
import config from '../.vitepress/config.mjs'

const root = new URL('../.vitepress/dist/', import.meta.url)
const read = path => readFileSync(new URL(path, root), 'utf8')
const chunks = readdirSync(new URL('assets/chunks/', root))
const searchChunk = chunks.find(file => file.startsWith('@localSearchIndexroot.'))
// Load the standalone generated ESM index without changing the project's module type.
const { default: json } = await import(`data:text/javascript;base64,${Buffer.from(read(`assets/chunks/${searchChunk}`)).toString('base64')}`)
const index = MiniSearch.loadJSON(json, { fields: ['title', 'titles', 'text'], storeFields: ['title', 'titles'], searchOptions: { fuzzy: 0.2, prefix: true } })

test('built header index contains every catalogue entry and existing articles', () => {
  const stored = Object.values(JSON.parse(json).documentIds)
  for (const entry of entries) assert.ok(stored.includes(entry.url), entry.url)
  assert.ok(index.search('saved search').some(result => result.id.startsWith('/blog/')))
  assert.ok(index.search('administration').some(result => result.id.startsWith('/about/')))
  assert.ok(!stored.some(id => id.includes('researchdocs')))
  const results = headerResults('Invalid inventorystatus reference key 91 for issueinventorynumber 771', index.search('Invalid inventorystatus reference key 91 for issueinventorynumber 771'))
  assert.equal(results[0].id, entries.find(entry => entry.id === 'FLD-01').url)
})

test('the compiled VitePress overlay uses the shared matcher and retains accessibility', () => {
  const overlay = read(`assets/chunks/${chunks.find(file => file.startsWith('VPLocalSearchBox.'))}`)
  // Identifier names may be minified away, so assert the decorated wrapper's
  // structure: loadJSON is wrapped, and search(query) remembers the query then
  // hands the inner index results to the shared catalogue matcher.
  assert.match(overlay, /loadJSON\(([\w$]+),\s*([\w$]+)\)\s*\{\s*const\s+([\w$]+)\s*=\s*[\w$]+\.loadJSON\(\1,\s*\2\)[\s\S]{0,60}?search\(([\w$]+)\)\s*\{\s*(?:return\s+)?[\w$]+\(\4\)[,;\s]+(?:return\s+)?[\w$]+\(\4,\s*\3\.search\(\4\)\)/)
  assert.doesNotMatch(overlay, /maxlength:\s*["']64["']/)
  assert.match(overlay, /"aria-live":\s*"polite"/)
  assert.match(overlay, /useFocusTrap|focus-trap|tabbable/)
  assert.equal(config.themeConfig.search.options.disableQueryPersistence, true)
})

test('all guide HTML has working anchors, canonical URLs, descriptions, and crawlable content', () => {
  const sitemap = read('sitemap.xml')
  for (const guide of guides) {
    const html = read(`${basePath.slice(1)}${guide.slug}.html`)
    const anchors = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1])
    assert.equal(new Set(anchors).size, anchors.length, `${guide.slug} has duplicate IDs`)
    assert.ok(anchors.includes(guide.slug))
    for (const entry of entries.filter(entry => entry.slug === guide.slug)) assert.ok(anchors.includes(entry.anchor), entry.url)
    assert.ok(html.includes(`https://mysuite.tech${basePath}${guide.slug}`))
    assert.match(html, /name="description"/)
    assert.match(html, /What it means/)
    assert.match(html, /Check this first/)
    assert.match(html, /Show the steps/)
    assert.match(html, /docs.oracle.com/)
    assert.equal(sitemap.includes(`https://mysuite.tech${basePath}${guide.slug}`), indexableGuideSlugs.has(guide.slug))
    assert.match(html, indexableGuideSlugs.has(guide.slug)
      ? /name="robots" content="index, follow"/
      : /name="robots" content="noindex, follow"/)
  }
  assert.ok(!sitemap.includes('researchdocs'))
  assert.equal(existsSync(new URL('researchdocs/', root)), false)
})

test('translator HTML has labeled inputs, live results, ordinary links, and no file checker', () => {
  const html = read(`${basePath.slice(1)}index.html`)
  assert.match(html, /for="csv-query"/)
  assert.match(html, /id="csv-query"/)
  assert.match(html, /for="csv-context"/)
  // The live region must pre-exist in server-rendered output — empty, so a
  // visitor's first search is the first thing assistive technology announces.
  assert.match(html, /<p role="status" aria-live="polite" aria-atomic="true" class="csv-results-count"><\/p>/)
  assert.match(html, /autocomplete="off"/)
  // The import-type selector is grouped by NetSuite's own Import Assistant
  // taxonomy while option values remain the catalogue's internal contexts.
  assert.match(html, /<optgroup label="Employees">/)
  assert.match(html, /<optgroup label="Transactions">/)
  assert.match(html, /<option value="Employees and expense categories">Employees<\/option>/)
  assert.doesNotMatch(html, /type="file"|Check file|Check the file too/)
  for (const guide of guides) assert.ok(html.includes(`${basePath}${guide.slug}#`))
  assert.ok(read('tools/index.html').includes(basePath))
})

test('feedback privacy copy is public but the review backend, storage and credentials are not', () => {
  const html = read(`${basePath.slice(1)}index.html`)
  assert.match(html, /Your search text stays in this tab unless you choose to send it for review/)
  assert.match(html, /ga-disable-G-R3FVBP7K9S/)
  const sitemap = read('sitemap.xml')
  for (const privatePath of ['private/csv-review', 'server/', 'netlify/', '.local/']) {
    assert.ok(!sitemap.includes(privatePath))
    assert.equal(existsSync(new URL(privatePath, root)), false)
  }
  const client = readdirSync(new URL('assets/', root), { recursive: true }).filter(file => file.endsWith('.js')).map(file => read(`assets/${file}`)).join('\n')
  assert.doesNotMatch(client, /CSV_REVIEW_PASSWORD|review-password|@netlify\/blobs|csv-error-feedback|synthetic-review-password-for-tests-only/)
  assert.match(client, /\/api\/csv-feedback/)
  assert.match(client, /\/api\/csv-search-event/)
  assert.match(client, /Review this error in the translator/)
})
