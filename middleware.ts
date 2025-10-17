/**
 * Middleware for route protection (Edge runtime compatible)
 * This file must NOT import Node.js-specific modules
 */
import NextAuth from 'next-auth'
import { authConfig } from '@/lib/auth/config'

export default NextAuth(authConfig).auth

// Matcher configuration
// Note: /login and /register are NOT in matcher - they handle their own auth redirects
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/test/:path*',
    '/classes/:path*',
    '/materials/:path*',
    '/admin/:path*',
  ],
}
