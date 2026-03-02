import { APP_CONFIG } from '@/config/app'
import type { TimelineEvent } from '@/types'

interface WikimediaPage {
  content_urls?: { desktop?: { page?: string } }
  thumbnail?: { source: string }
}

interface WikimediaEvent {
  year: number
  text: string
  pages?: WikimediaPage[]
}

interface WikimediaResponse {
  events?: WikimediaEvent[]
}

interface FetchOnThisDayEventsOptions {
  month: number
  day: number
  signal?: AbortSignal
}

/**
 * Maps a raw Wikimedia event into the normalized timeline event shape.
 */
function mapWikimediaEvent(event: WikimediaEvent): TimelineEvent {
  return {
    year: event.year,
    text: event.text,
    articleUrl: event.pages?.[0]?.content_urls?.desktop?.page,
    imageUrl: event.pages?.[0]?.thumbnail?.source,
  }
}

/**
 * Fetches historical events for a given calendar day from the Wikimedia feed API.
 */
export async function fetchOnThisDayEvents({
  month,
  day,
  signal,
}: FetchOnThisDayEventsOptions): Promise<TimelineEvent[]> {
  const url = `${APP_CONFIG.wikimediaBaseUrl}/${month}/${day}`

  const res = await fetch(url, {
    signal,
    headers: { Accept: 'application/json' },
  })

  if (!res.ok) throw new Error(`Wikimedia API error: ${res.status}`)

  const data: WikimediaResponse = await res.json()

  return (data.events ?? []).map(mapWikimediaEvent).sort((left, right) => left.year - right.year)
}
