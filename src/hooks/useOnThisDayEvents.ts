import { useQuery } from '@tanstack/react-query'
import { fetchOnThisDayEvents } from '@/services/wikimediaClient'

/**
 * Fetches and caches historical events for a specific calendar day.
 */
export function useOnThisDayEvents(month: number, day: number) {
  return useQuery({
    queryKey: ['on-this-day-events', month, day],
    queryFn: ({ signal }) => fetchOnThisDayEvents({ month, day, signal }),
  })
}
