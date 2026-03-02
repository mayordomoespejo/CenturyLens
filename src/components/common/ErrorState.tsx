import { useTranslation } from 'react-i18next'
import './ErrorState.scss'

interface Props {
  onRetry?: () => void
  message?: string
}

/**
 * Displays a reusable error panel with an optional retry action.
 */
export function ErrorState({ onRetry, message }: Props) {
  const { t } = useTranslation()

  return (
    <div className="error-state" role="alert">
      <p className="error-state__message">{message ?? t('COMMON.ERROR')}</p>
      {onRetry && (
        <button className="error-state__retry" onClick={onRetry}>
          {t('COMMON.RETRY')}
        </button>
      )}
    </div>
  )
}
