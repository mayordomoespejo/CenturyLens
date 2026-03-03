import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { APP_CONFIG } from '@/config/app'
import { Header } from '@/components/Header/Header'
import { Timeline } from '@/components/Timeline/Timeline'
import { useOnThisDayEvents } from '@/hooks/useOnThisDayEvents'
import { useTimelineDate } from '@/hooks/useTimelineDate'
import { getTimelineTitle } from '@/utils/timelineTitle'

export default function App() {
  const { t } = useTranslation()
  const {
    date: { month, day },
  } = useTimelineDate()
  const { data: events = [], isLoading, isError, refetch } = useOnThisDayEvents(month, day)
  const timelineTitle = getTimelineTitle({ month, day }, t)

  useEffect(() => {
    document.title = `${timelineTitle} ${APP_CONFIG.titleSeparator} ${APP_CONFIG.name}`
  }, [timelineTitle])

  return (
    <>
      <Header />
      <main>
        <Timeline
          events={events}
          isLoading={isLoading}
          isError={isError}
          onRetry={() => void refetch()}
          title={timelineTitle}
        />
      </main>
    </>
  )
}
