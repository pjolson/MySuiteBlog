// Interpret only the named slots in the message. Keep raw identifiers for display.
const known = {
  otherchargesaleitem: ['Other Charge for Sale', true],
  otherchargepurchaseitem: ['Other Charge for Purchase', true],
  inventoryitem: ['Inventory Item', true],
  serializedinventoryitem: ['Serialized Inventory Item', true],
  lotnumberedinventoryitem: ['Lot Numbered Inventory Item', true],
  customer: ['Customer', false],
  vendor: ['Vendor', false]
}
const describe = raw => ({ identifier: raw, label: known[raw.toLowerCase()]?.[0] || null, item: known[raw.toLowerCase()]?.[1] || false })
export function parseRecordTypes(message) {
  const match = message.match(/different\s+type\s*:\s*([a-z][a-z0-9_-]*)\s+from\s+the\s+type\s+specified\s*:\s*([a-z][a-z0-9_-]*)/i)
  if (!match) return null
  return { actual: describe(match[1]), requested: describe(match[2]) }
}
