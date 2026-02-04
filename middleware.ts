import { NextResponse, NextRequest } from 'next/server'

function getHost(request: NextRequest) {
  return request.headers.get('host') ?? ''
}

function isAdminSubdomain(host: string) {
  return host.startsWith('admin.') || host.startsWith('admin.localhost:')
}

export default function middleware(request: NextRequest) {
  const host = getHost(request)
  const onAdminSubdomain = isAdminSubdomain(host)

  const portalAccessToken = request.cookies.get('portalAccessToken')?.value
  const adminAccessToken = request.cookies.get('adminAccessToken')?.value

  const url = request.nextUrl.clone()
  const originalPathname = url.pathname

  // Skip real static assets in /public (prevents breaking images, fonts, etc.)
  if (
    originalPathname.match(
      /\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|map|txt|xml|woff2?|ttf|eot)$/i,
    )
  ) {
    return NextResponse.next()
  }

  // 0) Canonicalize: admin subdomain should NOT show /admin prefix in the URL
  // admin.example.com/admin/dashboard -> admin.example.com/dashboard
  if (
    onAdminSubdomain &&
    (originalPathname === '/admin' || originalPathname.startsWith('/admin/'))
  ) {
    url.pathname = originalPathname.replace(/^\/admin(\/|$)/, '/')
    return NextResponse.redirect(url)
  }

  /**
   * Compute the INTERNAL pathname that Next should serve.
   * On admin subdomain:
   *   /dashboard  -> /admin/dashboard
   *   /           -> /admin
   */
  const internalPathname = onAdminSubdomain
    ? `/admin${originalPathname === '/' ? '' : originalPathname}`
    : originalPathname

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
    internalPathname.startsWith('/portal') &&
    !whiteListedPortalRoutes.some((route) =>
      internalPathname.startsWith(route),
    ) &&
    internalPathname !== '/portal'
  ) {
    const callback = internalPathname
    const redirectUrl = new URL(`/portal`, request.url)
    redirectUrl.searchParams.set('callback', callback)
    return NextResponse.redirect(redirectUrl)
  } else if (
    portalAccessToken &&
    (whiteListedPortalRoutes.some((route) =>
      internalPathname.startsWith(route),
    ) ||
      internalPathname === '/portal')
  ) {
    return NextResponse.redirect(new URL(`/portal/dashboard`, request.url))
  }

  // ---------- ADMIN (subdomain-aware redirects) ----------
  // External (what user should see)
  const adminLoginPath = onAdminSubdomain ? '/' : '/admin'
  const adminDashboardPath = onAdminSubdomain
    ? '/dashboard'
    : '/admin/dashboard'

  // If user is NOT authenticated and trying to access protected admin routes
  if (
    !adminAccessToken &&
    internalPathname.startsWith('/admin') &&
    !whiteListedAdminRoutes.some((route) =>
      internalPathname.startsWith(route),
    ) &&
    internalPathname !== '/admin'
  ) {
    // callback should be external path on subdomain (strip /admin)
    const externalCallback = onAdminSubdomain
      ? internalPathname.replace(/^\/admin/, '') || '/'
      : internalPathname

    const redirectUrl = new URL(adminLoginPath, request.url)
    if (externalCallback && externalCallback !== '/') {
      redirectUrl.searchParams.set('callback', externalCallback)
    }
    return NextResponse.redirect(redirectUrl)
  }

  // If user IS authenticated and tries to access admin login or whitelisted routes
  if (
    adminAccessToken &&
    (whiteListedAdminRoutes.some((route) =>
      internalPathname.startsWith(route),
    ) ||
      internalPathname === '/admin')
  ) {
    return NextResponse.redirect(new URL(adminDashboardPath, request.url))
  }

  // 1) Finally, do the rewrite for admin subdomain if needed (no redirect happened)
  if (onAdminSubdomain) {
    url.pathname = internalPathname
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  // matcher: ['/((?!api|_next/static|_next/image|.*\\.[^/]+$).*)'],
  matcher: ['/((?!api|_next/static|_next/image).*)'],
}
