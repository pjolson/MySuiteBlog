import rawEntries from './entries.json' with { type: 'json' }
import { guides, basePath, contextByPrefix, contextOverrides, entryTitles } from './guides.mjs'

export { guides, basePath }
export const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
export const entries = rawEntries.map(entry => {
  const guide = guides.find(guide => guide.ids.includes(entry.id))
  if (!guide) throw new Error(`Missing guide for ${entry.id}`)
  const title = entryTitles[entry.id] || entry.title
  const contexts = entry.contexts || contextOverrides[entry.id] || contextByPrefix[entry.id.split('-')[0]]
  return {
    ...entry, title, contexts, slug: guide.slug, category: guide.category,
    aliases: [...guide.aliases, ...(entry.aliases || [])], anchor: entry.anchor || slugify(title),
    url: `${basePath}${guide.slug}#${entry.anchor || slugify(title)}`,
    reviewStatus: entry.reviewStatus || (entry.reviewNotes ? 'needs-account-verification' : 'source-reviewed')
  }
})
export const importTypes = [...new Set(entries.flatMap(entry => entry.contexts))].sort()
export const guideEntries = (slug) => entries.filter(entry => entry.slug === slug)

export function searchSections(file) {
  const guide = guides.find(guide => file.replaceAll('\\', '/').endsWith(`${basePath}${guide.slug}.md`))
  if (!guide) return undefined
  return guideEntries(guide.slug).map(entry => ({
    anchor: entry.anchor,
    titles: ['CSV import errors', entry.contexts.join(', '), entry.title],
    text: [entry.explanation, entry.firstCheck, ...entry.messageFragments, ...entry.aliases].join(' ')
  }))
}
