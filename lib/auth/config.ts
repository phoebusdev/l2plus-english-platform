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
      const isStudentRoute = nextUrl.pathname.startsWith('/student')

      // Protected admin routes
      const isAdminRoute = nextUrl.pathname.startsWith('/admin')

      // Require authentication for protected routes
      if ((isStudentRoute || isAdminRoute) && !isLoggedIn) {
        return Response.redirect(new URL('/login', nextUrl))
      }

      // Require admin role for admin routes
      if (isAdminRoute && isLoggedIn && !isAdmin) {
        return Response.redirect(new URL('/student/dashboard', nextUrl))
      }

      // Require student role for student routes (redirect admins)
      if (isStudentRoute && isLoggedIn && isAdmin) {
        return Response.redirect(new URL('/admin/dashboard', nextUrl))
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
  trustHost: true,
} satisfies NextAuthConfig
