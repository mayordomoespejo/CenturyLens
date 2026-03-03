import { useTimelineDate } from '@/hooks/useTimelineDate'
import { DateSelector } from '@/components/DateSelector/DateSelector'
import './MobileDateBar.scss'

export function MobileDateBar() {
  const { date, setDate } = useTimelineDate()

  return (
    <div className="mobile-datebar" aria-hidden="true">
      <DateSelector
        key={`${date.month}-${date.day}`}
        month={date.month}
        day={date.day}
        onChange={setDate}
        compact
      />
    </div>
  )
}
