import { defineConfig } from 'drizzle-kit'
import { loadEnvConfig } from './src/utils/env'

const env = loadEnvConfig()

export default defineConfig({
  schema: './src/infrastructure/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
})
