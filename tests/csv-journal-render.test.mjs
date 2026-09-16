import test from 'node:test'
import assert from 'node:assert/strict'
import { entries, guides } from '../.vitepress/data/csv-errors/catalogue.mjs'
import { renderGuide, copyableSteps } from '../.vitepress/data/csv-errors/render.mjs'

const entry = entries.find(entry => entry.id === 'JRN-08')
const markdown = renderGuide(guides.find(guide => guide.ids.includes(entry.id)))

test('journal matched-answer text is plain, with its source retained in the guide', () => {
  assert.doesNotMatch(entry.explanation, /\[[^\]]+\]\([^)]*\)|<a\b/)
  assert.ok(markdown.includes('https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4103386138.html'))
  assert.match(entry.explanation, /Each journal must balance on its own/)
})

test('journal first check and balanced-file workaround heading are outside collapsed steps', () => {
  const section = markdown.split(`## ${entry.title} {#${entry.anchor}}`)[1].split('\n## ')[0]
  let detailsDepth = 0
  let firstCheckSeen = false
  let workaroundSeen = false
  for (const line of section.split('\n')) {
    if (line.startsWith('::: details')) detailsDepth++
    else if (line === ':::') detailsDepth--
    if (line === entry.firstCheck) {
      assert.equal(detailsDepth, 0)
      firstCheckSeen = true
    }
    if (line.includes('{#journal-balanced-file-workaround}')) {
      assert.equal(detailsDepth, 0)
      workaroundSeen = true
    }
  }
  assert.ok(firstCheckSeen && workaroundSeen)
  assert.ok(section.indexOf(entry.summary) < section.indexOf('::: details'))
})

test('copied journal steps preserve conditions, complete rows, and source limitations', () => {
  const copied = copyableSteps(entry)
  assert.match(copied, /amounts, grouping, and mappings check out/)
  assert.match(copied, /70365/)
  assert.match(copied, /Move complete rows/)
  assert.match(copied, /Do not sort the Debit or Credit column by itself/)
  assert.match(copied, /Reordering cannot fix unequal totals or an incorrect mapping/)
  assert.match(copied, /Single Journal Entry Import Assistant does not support updates/)
  assert.match(copied, /Do not assume that the standard-journal line-order workaround explains its failure/)
})
