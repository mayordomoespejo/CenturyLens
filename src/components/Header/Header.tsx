import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/hooks/useTheme'
import { useTimelineDate } from '@/hooks/useTimelineDate'
import { DateSelector } from '@/components/DateSelector/DateSelector'
import './Header.scss'

/**
 * Renders the fixed application header with navigation and global controls.
 */
export function Header() {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const isTimelinePage = location.pathname === '/'
  const { date, setDate } = useTimelineDate()

  return (
    <header className={`header${isTimelinePage ? ' header--timeline' : ''}`} role="banner">
      <div className="container header__inner">
        <NavLink to="/" className="header__brand" aria-label="CenturyLens home">
          <span className="header__brand-icon" aria-hidden="true">
            ⟳
          </span>
          <span className="header__brand-name">{t('HEADER.TITLE')}</span>
        </NavLink>

        <nav className="header__nav" aria-label={t('HEADER.NAVIGATION')}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `header__nav-link${isActive ? ' header__nav-link--active' : ''}`
            }
          >
            {t('NAV.TIMELINE')}
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `header__nav-link${isActive ? ' header__nav-link--active' : ''}`
            }
          >
            {t('NAV.ABOUT')}
          </NavLink>
        </nav>

        {isTimelinePage ? (
          <div className="header__hero">
            <h1 className="header__hero-title">{t('TIMELINE.TITLE')}</h1>
            <div className="header__hero-controls">
              <DateSelector month={date.month} day={date.day} onChange={setDate} />
            </div>
          </div>
        ) : null}

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
