import type { TFunction } from 'i18next'
import type { CalendarDate } from '@/types'

const MS_PER_DAY = 24 * 60 * 60 * 1000

const MONTH_KEYS = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
] as const

type RelativeDayKey = 'YESTERDAY' | 'TODAY' | 'TOMORROW'

function startOfDay(date: Date): Date {
  const normalized = new Date(date)
  normalized.setHours(0, 0, 0, 0)

  return normalized
}

function getRelativeDayKey(date: CalendarDate, baseDate = new Date()): RelativeDayKey | null {
  const today = startOfDay(baseDate)
  const year = today.getFullYear()
  const candidates = [year - 1, year, year + 1].map((candidateYear) =>
    startOfDay(new Date(candidateYear, date.month - 1, date.day)),
  )

  const closestDate = candidates.reduce((closest, candidate) => {
    const candidateDistance = Math.abs(candidate.getTime() - today.getTime())
    const closestDistance = Math.abs(closest.getTime() - today.getTime())

    return candidateDistance < closestDistance ? candidate : closest
  })

  const diffDays = Math.round((closestDate.getTime() - today.getTime()) / MS_PER_DAY)

  if (diffDays === -1) return 'YESTERDAY'
  if (diffDays === 0) return 'TODAY'
  if (diffDays === 1) return 'TOMORROW'

  return null
}

export function getTimelineTitle(date: CalendarDate, t: TFunction): string {
  const relativeDayKey = getRelativeDayKey(date)

  if (relativeDayKey) {
    return t('TIMELINE.TITLE_RELATIVE', { label: t(`DATE.${relativeDayKey}`) })
  }

  const monthKey = MONTH_KEYS[date.month - 1]

  return t('TIMELINE.TITLE_DATE', {
    day: date.day,
    month: t(`DATE.MONTHS.${monthKey}`),
  })
}
