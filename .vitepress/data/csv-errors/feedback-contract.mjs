import { importTypes } from './catalogue.mjs'
import { categories } from './guides.mjs'

export const feedbackLimits = { message: 4000, note: 2000, bodyBytes: 28000 }
export const reviewStatuses = ['New', 'Investigating', 'Covered', 'Not enough detail']
export const isUUID = value => typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
export const isCatalogueVersion = value => typeof value === 'string' && /^csv-[a-f0-9]{12}$/.test(value)
const sourceOK = value => ['header', 'translator'].includes(value)
const contextOK = value => value === 'unknown' || importTypes.includes(value)
const hasOnly = (value, keys) => value && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).every(key => keys.includes(key))

export function validSubmission(value) {
  return hasOnly(value, ['id', 'message', 'note', 'context', 'source', 'catalogueVersion']) &&
    isUUID(value.id) && sourceOK(value.source) && contextOK(value.context) && isCatalogueVersion(value.catalogueVersion) &&
    typeof value.message === 'string' && value.message.trim().length > 0 && value.message.length <= feedbackLimits.message &&
    typeof value.note === 'string' && value.note.length <= feedbackLimits.note
}

export function validSearchEvent(value) {
  return hasOnly(value, ['id', 'source', 'context', 'category', 'unfilteredMatches', 'outcome', 'catalogueVersion']) &&
    isUUID(value.id) && sourceOK(value.source) && (value.context === '' || contextOK(value.context)) &&
    (value.category === '' || categories.includes(value.category)) && isCatalogueVersion(value.catalogueVersion) &&
    typeof value.unfilteredMatches === 'boolean' &&
    (value.outcome === 'filtered' && value.unfilteredMatches || value.outcome === 'unknown' && !value.unfilteredMatches)
}
