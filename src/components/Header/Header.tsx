import { useTranslation } from 'react-i18next'
import { useTheme } from '@/hooks/useTheme'
import { useTimelineDate } from '@/hooks/useTimelineDate'
import { DateSelector } from '@/components/DateSelector/DateSelector'
import './Header.scss'

/**
 * Renders the fixed application header with date controls and theme toggle.
 */
export function Header() {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const { date, setDate } = useTimelineDate()

  return (
    <header className="header" role="banner">
      <div className="header__inner">
        <div className="header__brand">
          <span className="header__brand-icon" aria-hidden="true">⟳</span>
          <span className="header__brand-name">CenturyLens</span>
        </div>

        <div className="header__center">
          <DateSelector month={date.month} day={date.day} onChange={setDate} compact />
        </div>

        <div className="header__actions">
          <button
            className="header__action-btn"
            onClick={toggleTheme}
            aria-label={t('HEADER.TOGGLE_THEME')}
            title={t('HEADER.TOGGLE_THEME')}
          >
            {theme === 'dark' ? '☀' : '☽'}
          </button>
        </div>
      </div>
    </header>
  )
}
