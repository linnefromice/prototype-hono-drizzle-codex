import type { Context } from 'hono'
import { ZodError } from 'zod'
import { HttpError } from '../utils/errors'

/**
 * Global error handler for the application
 * Handles HttpError, ZodError, and generic Error instances
 */
export const errorHandler = (err: Error, c: Context) => {
  // Handle HttpError (custom error class with status code)
  if (err instanceof HttpError) {
    return c.json({ message: err.message }, err.status as any)
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return c.json(
      {
        message: err.errors[0]?.message || 'Validation Error',
        details: err.errors.map(e => ({
          path: e.path.join('.'),
          message: e.message,
        })),
      },
      400 as any,
    )
  }

  // Log unexpected errors
  console.error('Unhandled error:', err)

  // Return a generic error response for unknown errors
  const message = err instanceof Error ? err.message : 'Internal Server Error'
  return c.json({ message }, 500 as any)
}
