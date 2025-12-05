import { defineConfig } from 'drizzle-kit'
import { config } from 'dotenv'

// Load .env file if it exists (for local development)
config()

// Only include dbCredentials if DATABASE_URL is set
// When using CLI flags (--url), this will be undefined
const dbConfig = process.env.DATABASE_URL
  ? {
      dbCredentials: {
        connectionString: process.env.DATABASE_URL,
      },
    }
  : {}

export default defineConfig({
  schema: './src/infrastructure/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  ...dbConfig,
})
