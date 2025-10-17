/**
 * Middleware for route protection (Edge runtime compatible)
 * This file must NOT import Node.js-specific modules
 */
import NextAuth from 'next-auth'
import { authConfig } from '@/lib/auth/config'

export default NextAuth(authConfig).auth

// Matcher configuration
// Note: /login and /register are NOT in matcher - they handle their own auth redirects
// /dashboard is a server-side redirect page, also not protected by middleware
export const config = {
  matcher: [
    '/student/:path*',
    '/admin/:path*',
  ],
}
