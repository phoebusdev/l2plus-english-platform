/**
 * NextAuth configuration with Node.js runtime support (API routes)
 * This file imports Node.js-specific modules and cannot be used in Edge runtime
 */
import NextAuth, { type DefaultSession } from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { verifyPassword } from './password'
import { authConfig as baseAuthConfig } from './config'

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: 'student' | 'admin'
      email: string
      name: string
    } & DefaultSession['user']
  }

  interface User {
    id: string
    role: 'student' | 'admin'
    email: string
    name: string
  }
}

/**
 * Full auth config with Credentials provider (Node.js runtime only)
 * Extends the Edge-compatible base config with provider logic
 */
export const authConfig = {
  ...baseAuthConfig,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const email = credentials.email as string
        const password = credentials.password as string

        // Find user by email
        const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1)

        if (!user) {
          return null
        }

        // Verify password (uses @node-rs/argon2 - Node.js only)
        const isValid = await verifyPassword(user.passwordHash, password)

        if (!isValid) {
          return null
        }

        // Return user object
        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    ...baseAuthConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role as 'student' | 'admin'
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as 'student' | 'admin'
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    },
  },
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)
