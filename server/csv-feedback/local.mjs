import { randomBytes } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { Readable } from 'node:stream'
import { fileStore } from './store.mjs'
import { handleWrite, jsonResponse, localRateLimiter } from './http.mjs'
import { handleReview } from './review.mjs'
import { pruneExpired } from './service.mjs'

export async function localFeedback() {
  const directory = process.env.CSV_FEEDBACK_LOCAL_DIR || fileURLToPath(new URL('../../.local/csv-feedback/', import.meta.url))
  await mkdir(directory, { recursive: true, mode: 0o700 })
  const passwordFile = join(directory, 'review-password')
  try { await writeFile(passwordFile, randomBytes(32).toString('base64url'), { flag: 'wx', mode: 0o600 }) }
  catch (error) { if (error.code !== 'EEXIST') throw error }
  const password = await readFile(passwordFile, 'utf8')
  const store = fileStore(directory)
  const allowed = localRateLimiter()
  return { store, password, async handle(request, ip) {
    const path = new URL(request.url).pathname
    if (!allowed(`${ip}:${path}`, path.includes('csv-search-event') ? 60 : 20)) return jsonResponse({ error: 'Please try again later' }, 429)
    if (path.startsWith('/private/csv-review')) return handleReview(request, { store, password })
    return handleWrite(request, { store, kind: path === '/api/csv-feedback' ? 'submissions' : 'events' })
  } }
}

export function feedbackLocalPlugin() {
  let service
  async function configure(server) {
    service ||= await localFeedback()
    const prune = () => pruneExpired(service.store).catch(() => {})
    await prune()
    const timer = setInterval(prune, 60 * 60 * 1000)
    timer.unref()
    server.httpServer?.once('close', () => clearInterval(timer))
    server.middlewares.use(async (req, res, next) => {
      const path = (req.url || '').split('?')[0]
      if (!['/api/csv-feedback', '/api/csv-search-event', '/private/csv-review', '/private/csv-review/export'].includes(path)) return next()
      try {
        const request = new Request(`http://${req.headers.host}${req.url}`, {
          method: req.method, headers: req.headers,
          ...(!['GET', 'HEAD'].includes(req.method) ? { body: Readable.toWeb(req), duplex: 'half' } : {})
        })
        const response = await service.handle(request, req.socket.remoteAddress)
        res.writeHead(response.status, Object.fromEntries(response.headers))
        res.end(Buffer.from(await response.arrayBuffer()))
      } catch {
        res.writeHead(503, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
        res.end('{"error":"Temporarily unavailable"}')
      }
    })
  }
  return { name: 'mysuite-local-csv-feedback', configureServer: configure }
}
