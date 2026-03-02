import './Skeleton.scss'

interface Props {
  width?: string
  height?: string
  className?: string
}

/**
 * Lightweight skeleton primitive used across loading states.
 */
export function Skeleton({ width, height, className = '' }: Props) {
  return (
    <span
      className={`skeleton ${className}`}
      style={{ width, height, display: 'block' }}
      aria-hidden="true"
    />
  )
}

/**
 * Timeline-specific skeleton card layout.
 */
export function EventCardSkeleton() {
  return (
    <div className="event-card-skeleton" aria-hidden="true">
      <div className="event-card-skeleton__dot" />
      <div className="event-card-skeleton__body">
        <Skeleton height="14px" width="80px" className="event-card-skeleton__date" />
        <Skeleton height="20px" width="70%" className="event-card-skeleton__title" />
        <Skeleton height="14px" width="90%" />
        <Skeleton height="14px" width="60%" />
      </div>
    </div>
  )
}
