import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { APP_CONFIG } from '@/config/app'
import { Header } from '@/components/Header/Header'
import { Timeline } from '@/components/Timeline/Timeline'
import { useOnThisDayEvents } from '@/hooks/useOnThisDayEvents'
import { useTimelineDate } from '@/hooks/useTimelineDate'

export default function App() {
  const { t } = useTranslation()
  const {
    date: { month, day },
  } = useTimelineDate()
  const { data: events = [], isLoading, isError, refetch } = useOnThisDayEvents(month, day)

  useEffect(() => {
    document.title = `${t('TIMELINE.TITLE')} · ${APP_CONFIG.name}`
  }, [t])

  return (
    <>
      <Header />
      <main>
        <Timeline
          events={events}
          isLoading={isLoading}
          isError={isError}
          onRetry={() => void refetch()}
        />
      </main>
    </>
  )
}
