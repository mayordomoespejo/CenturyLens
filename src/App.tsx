import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { APP_CONFIG } from '@/config/app'
import { Header } from '@/components/Header/Header'
import { TimelinePage } from '@/pages/Timeline/TimelinePage'
import { AboutPage } from '@/pages/About/AboutPage'

const PAGE_TITLE_KEYS: Record<string, string> = {
  '/': 'NAV.TIMELINE',
  '/about': 'NAV.ABOUT',
}

function TitleUpdater() {
  const location = useLocation()
  const { t } = useTranslation()

  useEffect(() => {
    const key = PAGE_TITLE_KEYS[location.pathname]
    document.title = key
      ? `${t(key)} ${APP_CONFIG.titleSeparator} ${APP_CONFIG.name}`
      : APP_CONFIG.name
  }, [location.pathname, t])

  return null
}

/**
 * Mounts the application shell and route tree.
 */
export default function App() {
  return (
    <>
      <TitleUpdater />
      <Header />
      <Routes>
        <Route path="/" element={<TimelinePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<TimelinePage />} />
      </Routes>
    </>
  )
}
