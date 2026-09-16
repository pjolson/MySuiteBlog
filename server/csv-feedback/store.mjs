import { createHash, randomUUID } from 'node:crypto'
import { mkdir, readFile, writeFile, rename, link, unlink, readdir } from 'node:fs/promises'
import { join } from 'node:path'

// This adapter is used only by Vite's local server and tests. Production uses
// Netlify's private site store. Neither adapter exposes a public read URL.
export function fileStore(directory) {
  function path(key) {
    if (!/^(submissions|events|reviews)\/[a-zA-Z0-9-]+$/.test(key)) throw new Error('Invalid storage key')
    return join(directory, `${key}.json`)
  }
  return {
    async get(key) {
      try { return JSON.parse(await readFile(path(key), 'utf8')) }
      catch (error) { if (error.code === 'ENOENT') return null; throw error }
    },
    async put(key, value, { onlyIfNew = false } = {}) {
      const target = path(key)
      await mkdir(join(directory, key.split('/')[0]), { recursive: true, mode: 0o700 })
      const temp = `${target}.${randomUUID()}.tmp`
      await writeFile(temp, JSON.stringify(value), { mode: 0o600 })
      try {
        if (onlyIfNew) await link(temp, target)
        else await rename(temp, target)
        return true
      } catch (error) { if (error.code === 'EEXIST') return false; throw error }
      finally { await unlink(temp).catch(error => { if (error.code !== 'ENOENT') throw error }) }
    },
    async delete(key) {
      await unlink(path(key)).catch(error => { if (error.code !== 'ENOENT') throw error })
    },
    async keys(prefix) {
      try { return (await readdir(join(directory, prefix))).filter(name => name.endsWith('.json')).map(name => `${prefix}/${name.slice(0, -5)}`) }
      catch (error) { if (error.code === 'ENOENT') return []; throw error }
    }
  }
}

export async function netlifyStore() {
  const { getStore } = await import('@netlify/blobs')
  const store = getStore({ name: 'csv-error-feedback', consistency: 'strong' })
  return {
    get: key => store.get(key, { type: 'json' }),
    async put(key, value, { onlyIfNew = false } = {}) {
      const result = await store.setJSON(key, value, onlyIfNew ? { onlyIfNew: true } : {})
      return onlyIfNew ? result.modified : true
    },
    delete: key => store.delete(key),
    async keys(prefix) { return (await store.list({ prefix: `${prefix}/` })).blobs.map(blob => blob.key) }
  }
}

// Hashes are used only to group deliberately submitted, private records.
// Automatic search events never contain a query or a hash derived from one.
export const groupID = row => createHash('sha256').update(JSON.stringify([row.message, row.context])).digest('hex')
