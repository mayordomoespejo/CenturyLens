import { useTranslation } from 'react-i18next'
import { Timeline } from '@/components/Timeline/Timeline'
import { useOnThisDayEvents } from '@/hooks/useOnThisDayEvents'
import { useTimelineDate } from '@/hooks/useTimelineDate'
import './TimelinePage.scss'

/**
 * Renders the main historical timeline view for the selected date.
 */
export function TimelinePage() {
  const { t } = useTranslation()
  const {
    date: { month, day },
  } = useTimelineDate()

  const { data: events = [], isLoading, isError, refetch } = useOnThisDayEvents(month, day)

  return (
    <main className="page timeline-page">
      <section className="timeline-page__stage" aria-label={t('TIMELINE.TITLE')}>
        <Timeline
          events={events}
          isLoading={isLoading}
          isError={isError}
          onRetry={() => void refetch()}
        />
      </section>
    </main>
  )
}
