import { NextResponse } from 'next/server'

const ALLOWED_HOSTS = new Set([process.env.CLOUDFLARE_HOST_URL])

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const urlParam = searchParams.get('url')

  if (!urlParam) return new NextResponse('Missing url', { status: 400 })

  let u: URL
  try {
    u = new URL(urlParam)
  } catch {
    return new NextResponse('Invalid url', { status: 400 })
  }

  // Hardening against SSRF
  if (u.protocol !== 'https:')
    return new NextResponse('Only https allowed', { status: 400 })
  if (!ALLOWED_HOSTS.has(u.hostname))
    return new NextResponse('Host not allowed', { status: 403 })

  const upstream = await fetch(u.toString(), { cache: 'no-store' })
  if (!upstream.ok) {
    return new NextResponse(`Upstream error: ${upstream.status}`, {
      status: upstream.status,
    })
  }

  const headers = new Headers()
  headers.set(
    'Content-Type',
    upstream.headers.get('content-type') ?? 'application/octet-stream'
  )

  const etag = upstream.headers.get('etag')
  if (etag) headers.set('ETag', etag)

  // Adjust caching as you like
  headers.set('Cache-Control', 'private, max-age=300')

  return new NextResponse(upstream.body, { status: 200, headers })
}
