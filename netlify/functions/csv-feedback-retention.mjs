import { netlifyStore } from '../../server/csv-feedback/store.mjs'
import { pruneExpired } from '../../server/csv-feedback/service.mjs'

export default async () => {
  try { await pruneExpired(await netlifyStore()); return new Response(null, { status: 204 }) }
  catch { return new Response(null, { status: 503 }) }
}
export const config = { schedule: '@hourly' }
