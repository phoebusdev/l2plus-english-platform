import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const isLoggedIn = !!token
  const isAdmin = token?.role === 'admin'
  const { nextUrl } = req

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
}

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
