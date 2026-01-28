import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
  const portalAccessToken = request.cookies.get('portalAccessToken')?.value
  const adminAccessToken = request.cookies.get('adminAccessToken')?.value

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

  if (
    !portalAccessToken &&
    pathname.startsWith('/portal') &&
    !whiteListedPortalRoutes.some((route) => pathname.startsWith(route)) &&
    pathname !== '/portal'
  ) {
    callback = pathname
    return NextResponse.redirect(
      new URL(
        `/portal?${!!callback ? 'callback=' + callback : ''}`,
        request.url,
      ),
    )
  }

  if (
    !adminAccessToken &&
    pathname.startsWith('/admin') &&
    !whiteListedAdminRoutes.some((route) => pathname.startsWith(route)) &&
    pathname !== '/admin'
  ) {
    callback = pathname
    return NextResponse.redirect(
      new URL(
        `/admin?${!!callback ? 'callback=' + callback : ''}`,
        request.url,
      ),
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
}
