import type { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'

// Load .env.local first, then .env as fallback
dotenv.config({ path: '.env.local' })
dotenv.config()

export default {
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    // Use non-pooling URL for migrations (direct connection)
    url: process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL!,
  },
} satisfies Config
