import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { guides, entries } from '../.vitepress/data/csv-errors/catalogue.mjs'
import { renderGuide } from '../.vitepress/data/csv-errors/render.mjs'

const directory = new URL('../tools/netsuite-csv-error-translator/', import.meta.url)
const catalogueHash = createHash('sha256')
for (const name of ['entries.json', 'guides.mjs', 'procedures.json', 'search.mjs', 'render.mjs', 'questions.mjs', 'source-labels.mjs']) {
  catalogueHash.update(await readFile(new URL(`../.vitepress/data/csv-errors/${name}`, import.meta.url)))
}
await writeFile(new URL('../.vitepress/data/csv-errors/version.json', import.meta.url), JSON.stringify(`csv-${catalogueHash.digest('hex').slice(0, 12)}`) + '\n')
await mkdir(directory, { recursive: true })
if (entries.length !== 122 || new Set(guides.flatMap(guide => guide.ids)).size !== entries.length) {
  throw new Error('Catalogue coverage is incomplete or duplicated.')
}
for (const guide of guides) {
  const content = renderGuide(guide)
  if (/\u2014|\b[PD]\d{2}\b/.test(content)) throw new Error(`Unreviewed public copy in ${guide.slug}`)
  await writeFile(new URL(`${guide.slug}.md`, directory), content)
}
console.log(`Generated ${guides.length} CSV error guides from ${entries.length} entries in ${fileURLToPath(directory)}`)
