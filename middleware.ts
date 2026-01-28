import { NextResponse, NextRequest } from 'next/server'

function getHost(request: NextRequest) {
  return request.headers.get('host') ?? ''
}

function isAdminSubdomain(host: string) {
  // Works for production (admin.example.com) and localhost dev (admin.localhost:3000)
  return host.startsWith('admin.') || host.startsWith('admin.localhost:')
}

export default function middleware(request: NextRequest) {
  const host = getHost(request)
  const onAdminSubdomain = isAdminSubdomain(host)

  const portalAccessToken = request.cookies.get('portalAccessToken')?.value
  const adminAccessToken = request.cookies.get('adminAccessToken')?.value

  // --- 1) Rewrite admin subdomain requests to /admin/*
  // admin.example.com/foo -> /admin/foo
  if (onAdminSubdomain && !request.nextUrl.pathname.startsWith('/admin')) {
    const url = request.nextUrl.clone()
    url.pathname = `/admin${url.pathname === '/' ? '' : url.pathname}`
    return NextResponse.rewrite(url)
  }

  // --- Existing logic below (works on rewritten pathname too)
  const searchParams = new URLSearchParams(request.nextUrl.searchParams)

  let callback = searchParams.get('callback')
  searchParams.delete('callback')

  const { pathname } = request.nextUrl

  const whiteListedPortalRoutes = [
    '/portal/forgot-password',
    '/portal/reset-password',
    '/portal/create-account',
  ]

  const whiteListedAdminRoutes = [
    '/admin/reset-password',
    '/admin/forgot-password',
  ]

  // ---------- PORTAL (unchanged; stays on main domain /portal/*) ----------
  if (
    !portalAccessToken &&
    pathname.startsWith('/portal') &&
    !whiteListedPortalRoutes.some((route) => pathname.startsWith(route)) &&
    pathname !== '/portal'
  ) {
    callback = pathname
    return NextResponse.redirect(
      new URL(`/portal?${callback ? 'callback=' + callback : ''}`, request.url),
    )
  } else if (
    portalAccessToken &&
    (whiteListedPortalRoutes.some((route) => pathname.startsWith(route)) ||
      pathname === '/portal')
  ) {
    return NextResponse.redirect(new URL(`/portal/dashboard`, request.url))
  }

  // ---------- ADMIN (subdomain-aware redirects) ----------
  const adminLoginPath = onAdminSubdomain ? '/' : '/admin'
  const adminDashboardPath = onAdminSubdomain
    ? '/dashboard'
    : '/admin/dashboard'

  if (
    !adminAccessToken &&
    pathname.startsWith('/admin') &&
    !whiteListedAdminRoutes.some((route) => pathname.startsWith(route)) &&
    pathname !== '/admin'
  ) {
    // internal callback will be like "/admin/orders"
    callback = pathname

    // If on admin subdomain, the user-visible path is without "/admin"
    // so callback should be "/orders" instead of "/admin/orders"
    const externalCallback = onAdminSubdomain
      ? callback.replace(/^\/admin/, '') || '/'
      : callback

    const redirectUrl = new URL(adminLoginPath, request.url)
    if (externalCallback && externalCallback !== '/') {
      redirectUrl.searchParams.set('callback', externalCallback)
    }

    return NextResponse.redirect(redirectUrl)
  } else if (
    adminAccessToken &&
    (whiteListedAdminRoutes.some((route) => pathname.startsWith(route)) ||
      pathname === '/admin')
  ) {
    return NextResponse.redirect(new URL(adminDashboardPath, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
