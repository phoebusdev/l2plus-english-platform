import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default auth((req) => {
  const { nextUrl, auth } = req as NextRequest & { auth: Awaited<ReturnType<typeof auth>> }
  const isLoggedIn = !!auth?.user
  const isAdmin = auth?.user?.role === 'admin'

  // Protected student routes
  const isStudentRoute = nextUrl.pathname.startsWith('/dashboard') ||
    nextUrl.pathname.startsWith('/test') ||
    nextUrl.pathname.startsWith('/classes') ||
    nextUrl.pathname.startsWith('/materials')

  // Protected admin routes
  const isAdminRoute = nextUrl.pathname.startsWith('/admin')

  // Redirect to login if accessing protected routes without authentication
  if ((isStudentRoute || isAdminRoute) && !isLoggedIn) {
    const from = nextUrl.pathname + nextUrl.search
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, nextUrl.origin)
    )
  }

  // Redirect to dashboard if accessing admin routes without admin role
  if (isAdminRoute && isLoggedIn && !isAdmin) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl.origin))
  }

  return NextResponse.next()
})

// Matcher configuration
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/test/:path*',
    '/classes/:path*',
    '/materials/:path*',
    '/admin/:path*',
  ],
}
