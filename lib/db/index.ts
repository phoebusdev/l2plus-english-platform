import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import * as schema from './schema'

// Create Drizzle instance with Vercel Postgres
// @vercel/postgres handles connection pooling automatically
export const db = drizzle(sql, { schema })

// Type exports for use throughout the application
export type Database = typeof db
