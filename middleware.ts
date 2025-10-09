/**
 * Middleware for route protection (Edge runtime compatible)
 * This file must NOT import Node.js-specific modules
 */
import NextAuth from 'next-auth'
import { authConfig } from '@/lib/auth/config'

export default NextAuth(authConfig).auth

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
