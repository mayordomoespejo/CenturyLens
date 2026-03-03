import type { CalendarDate } from '@/types'

/**
 * Returns today's month and day in the local timezone.
 */
export function getTodayDate(): CalendarDate {
  const now = new Date()

  return {
    month: now.getMonth() + 1,
    day: now.getDate(),
  }
}

/**
 * Constrains a month value to the valid calendar range.
 */
export function clampMonth(month: number): number {
  return Math.min(12, Math.max(1, month))
}

/**
 * Returns the number of days available for a given month.
 */
export function getDaysInMonth(month: number): number {
  const safeMonth = clampMonth(month)

  return new Date(2024, safeMonth, 0).getDate()
}

/**
 * Constrains a day value to the valid range for a given month.
 */
export function clampDay(day: number, month: number): number {
  return Math.min(getDaysInMonth(month), Math.max(1, day))
}

/**
 * Normalizes arbitrary month/day input into a safe calendar date.
 */
export function normalizeCalendarDate(month: number, day: number): CalendarDate {
  const safeMonth = clampMonth(month)

  return {
    month: safeMonth,
    day: clampDay(day, safeMonth),
  }
}
