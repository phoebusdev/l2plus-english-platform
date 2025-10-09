/**
 * API Helpers for Mock Mode
 *
 * Provides utility functions to gracefully handle API calls
 * in both mock and real database modes
 */

import { NextResponse } from 'next/server'
import { isMockMode } from './data'

/**
 * Wrap API handler to provide mock fallback
 */
export function withMockFallback<T>(
  realHandler: () => Promise<T>,
  mockHandler: () => T | Promise<T>
): Promise<T> {
  if (isMockMode()) {
    return Promise.resolve(mockHandler())
  }

  return realHandler().catch(error => {
    console.warn('Database call failed, falling back to mock data:', error.message)
    return Promise.resolve(mockHandler())
  })
}

/**
 * Create API response with mock mode indicator
 */
export function apiResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(
    {
      ...data,
      _mock: isMockMode(),
    },
    { status }
  )
}

/**
 * Create error response
 */
export function apiError(message: string, status: number = 500) {
  return NextResponse.json(
    {
      error: message,
      _mock: isMockMode(),
    },
    { status }
  )
}

/**
 * Simulate async operation delay (for realism in mock mode)
 */
export async function mockDelay(ms: number = 300): Promise<void> {
  if (isMockMode()) {
    await new Promise(resolve => setTimeout(resolve, ms))
  }
}
