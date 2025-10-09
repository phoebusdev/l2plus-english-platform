import { addDays as addDaysFns, format, differenceInDays, isPast } from 'date-fns'

/**
 * Check if a date is within the 7-day retake window
 * Returns true if less than 7 days have passed since the given date
 */
export function isWithinRetakeWindow(lastTestDate: Date): boolean {
  const daysSince = differenceInDays(new Date(), lastTestDate)
  return daysSince < 7
}

/**
 * Calculate the next available test date (7 days from last test)
 */
export function getNextTestDate(lastTestDate: Date): Date {
  return addDaysFns(lastTestDate, 7)
}

/**
 * Format date in GMT/UK timezone
 */
export function formatGMTDate(date: Date, formatStr: string = 'PPpp'): string {
  return format(date, formatStr)
}

/**
 * Add days to a date
 */
export function addDays(date: Date, days: number): Date {
  return addDaysFns(date, days)
}

/**
 * Check if grace period has expired
 */
export function isGracePeriodExpired(gracePeriodEndsAt: Date | null): boolean {
  if (!gracePeriodEndsAt) return false
  return isPast(gracePeriodEndsAt)
}

/**
 * Calculate grace period end date (3 days from now)
 */
export function calculateGracePeriodEnd(): Date {
  return addDaysFns(new Date(), 3)
}
