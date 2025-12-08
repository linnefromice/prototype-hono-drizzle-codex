import { defineConfig } from 'vitest/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      // Thresholds are disabled initially. Enable and gradually increase as coverage improves.
      // Target thresholds (to be enabled when coverage reaches these levels):
      // thresholds: {
      //   lines: 80,
      //   functions: 80,
      //   branches: 75,
      //   statements: 80,
      // },
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.config.*',
        '**/migrations/**',
        '**/seeds/**',
        '**/*.test.ts',
        '**/__mocks__/**',
        '**/server.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@openapi': path.resolve(__dirname, '../../packages/openapi/dist'),
    },
  },
})
