import { useTranslation } from 'react-i18next'
import type { CalendarDate } from '@/types'
import { clampDay, clampMonth, getDaysInMonth, getTodayDate } from '@/utils/date'
import './DateSelector.scss'

interface Props {
  month: number
  day: number
  onChange: (date: CalendarDate) => void
}

/**
 * Allows users to select the month and day displayed by the timeline.
 */
export function DateSelector({ month, day, onChange }: Props) {
  const { t } = useTranslation()

  const handleToday = () => {
    onChange(getTodayDate())
  }

  return (
    <div className="date-selector">
      <div className="date-selector__fields">
        <label className="date-selector__field">
          <span className="date-selector__label">{t('DATE.MONTH')}</span>
          <input
            className="date-selector__input"
            type="number"
            min={1}
            max={12}
            value={month}
            onChange={(e) => {
              const nextMonth = clampMonth(Number(e.target.value))
              onChange({ month: nextMonth, day: clampDay(day, nextMonth) })
            }}
          />
        </label>

        <label className="date-selector__field">
          <span className="date-selector__label">{t('DATE.DAY')}</span>
          <input
            className="date-selector__input"
            type="number"
            min={1}
            max={getDaysInMonth(month)}
            value={day}
            onChange={(e) => {
              onChange({ month, day: clampDay(Number(e.target.value), month) })
            }}
          />
        </label>
      </div>

      <button className="date-selector__today" onClick={handleToday}>
        {t('DATE.TODAY')}
      </button>
    </div>
  )
}
