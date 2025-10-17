/**
 * NextAuth configuration for Edge runtime (middleware)
 * This file must NOT import any Node.js-specific modules
 */

import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAdmin = auth?.user?.role === 'admin'

      // Protected student routes
      const isStudentRoute =
        nextUrl.pathname.startsWith('/dashboard') ||
        nextUrl.pathname.startsWith('/test') ||
        nextUrl.pathname.startsWith('/classes') ||
        nextUrl.pathname.startsWith('/materials')

      // Protected admin routes
      const isAdminRoute = nextUrl.pathname.startsWith('/admin')

      // Auth routes (login, register)
      const isAuthRoute = nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register')

      // Redirect authenticated users away from auth pages
      if (isAuthRoute && isLoggedIn) {
        if (isAdmin) {
          return Response.redirect(new URL('/admin/dashboard', nextUrl))
        }
        return Response.redirect(new URL('/dashboard', nextUrl))
      }

      // Require authentication for protected routes
      if ((isStudentRoute || isAdminRoute) && !isLoggedIn) {
        return Response.redirect(new URL('/login', nextUrl))
      }

      // Require admin role for admin routes
      if (isAdminRoute && isLoggedIn && !isAdmin) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }

      return true
    },
  },
  providers: [], // Providers added in main auth file (not Edge-compatible)
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  trustHost: true,
} satisfies NextAuthConfig
