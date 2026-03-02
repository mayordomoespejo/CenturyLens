import { useTranslation } from 'react-i18next'
import './AboutPage.scss'

const STACK = [
  { name: 'React 19', url: 'https://react.dev' },
  { name: 'TypeScript', url: 'https://www.typescriptlang.org' },
  { name: 'Vite', url: 'https://vitejs.dev' },
  { name: 'TanStack Query', url: 'https://tanstack.com/query' },
  { name: 'React Router', url: 'https://reactrouter.com' },
  { name: 'react-i18next', url: 'https://react.i18next.com' },
  { name: 'Sass / SCSS', url: 'https://sass-lang.com' },
]

/**
 * Presents project context, stack details and the live data source.
 */
export function AboutPage() {
  const { t } = useTranslation()

  return (
    <main className="page about-page">
      <div className="container">
        <h1 className="about-page__title">{t('ABOUT.TITLE')}</h1>

        <p className="about-page__intro">{t('ABOUT.INTRO')}</p>

        <section className="about-page__section">
          <h2>{t('ABOUT.DATA_TITLE')}</h2>
          <p>{t('ABOUT.DATA_BODY')}</p>
          <a
            href="https://api.wikimedia.org/wiki/Feed_API/Reference/On_this_day"
            target="_blank"
            rel="noopener noreferrer"
            className="about-page__link"
          >
            {t('ABOUT.WIKIMEDIA_LINK')} ↗
          </a>
        </section>

        <section className="about-page__section">
          <h2>{t('ABOUT.STACK_TITLE')}</h2>
          <ul className="about-page__stack">
            {STACK.map((item) => (
              <li key={item.name} className="about-page__stack-item">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-page__link"
                >
                  {item.name} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
