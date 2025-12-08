// Set NODE_ENV for all tests before any modules are loaded
process.env.NODE_ENV = 'development'
// Set DATABASE_URL for tests (required by some test suites)
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/hono_test'
