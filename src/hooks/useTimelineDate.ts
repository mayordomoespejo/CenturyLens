import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { CalendarDate } from '@/types'
import { getTodayDate, normalizeCalendarDate } from '@/utils/date'

interface TimelineDateState {
  date: CalendarDate
  setDate: (nextDate: CalendarDate) => void
}

/**
 * Reads and updates the current timeline date from route query params.
 */
export function useTimelineDate(): TimelineDateState {
  const fallbackDate = useMemo(() => getTodayDate(), [])
  const [searchParams, setSearchParams] = useSearchParams()

  const date = useMemo(() => {
    const parsedMonth = Number(searchParams.get('month')) || fallbackDate.month
    const parsedDay = Number(searchParams.get('day')) || fallbackDate.day

    return normalizeCalendarDate(parsedMonth, parsedDay)
  }, [fallbackDate.day, fallbackDate.month, searchParams])

  const setDate = (nextDate: CalendarDate) => {
    const normalizedDate = normalizeCalendarDate(nextDate.month, nextDate.day)
    const nextParams = new URLSearchParams(searchParams)

    nextParams.set('month', String(normalizedDate.month))
    nextParams.set('day', String(normalizedDate.day))
    setSearchParams(nextParams, { replace: true })
  }

  return { date, setDate }
}
