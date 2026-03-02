import { useEffect, useMemo, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { useTranslation } from 'react-i18next'
import type { TimelineEvent } from '@/types'
import { EventCardSkeleton } from '@/components/common/Skeleton'
import { ErrorState } from '@/components/common/ErrorState'
import './Timeline.scss'

interface Props {
  events: TimelineEvent[]
  isLoading: boolean
  isError: boolean
  onRetry: () => void
}

const ARC_MID_ANGLE = 0
const ARC_VISIBLE_SPAN = 1.2
const MAX_ROTATION = Math.PI * 2.6

interface WheelItem {
  event: TimelineEvent
  index: number
  angle: number
  distanceToArcCenter: number
  isVisible: boolean
  visibilityProgress: number
}

/**
 * Normalizes an angle to the `[-PI, PI]` range.
 */
function normalizeAngle(angle: number): number {
  while (angle > Math.PI) angle -= Math.PI * 2
  while (angle < -Math.PI) angle += Math.PI * 2
  return angle
}

/**
 * Renders the radial timeline and synchronizes scroll and drag interactions.
 */
export function Timeline({ events, isLoading, isError, onRetry }: Props) {
  const { t } = useTranslation()
  const shellRef = useRef<HTMLDivElement | null>(null)
  const wheelRef = useRef<HTMLDivElement | null>(null)
  const dragStateRef = useRef<{
    pointerId: number
    startAngle: number
    startRotationOffset: number
  } | null>(null)
  const dragMovedRef = useRef(false)
  const [rotationOffset, setRotationOffset] = useState(0)

  useEffect(() => {
    if (events.length === 0) return

    const handleScroll = () => {
      const shell = shellRef.current
      if (!shell) return

      const rect = shell.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const travel = Math.max(shell.offsetHeight - viewportHeight, 1)
      const progress = Math.min(Math.max(-rect.top / travel, 0), 1)

      setRotationOffset(progress * MAX_ROTATION)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [events.length])

  const angleIncrement = useMemo(
    () => (events.length > 0 ? (Math.PI * 2) / events.length : 0),
    [events.length],
  )

  const wheelItems = useMemo(() => {
    if (events.length === 0) return []

    return events.map<WheelItem>((event, index) => {
      const angle = index * angleIncrement - rotationOffset
      const distanceToArcCenter = Math.abs(normalizeAngle(angle - ARC_MID_ANGLE))
      const isVisible = distanceToArcCenter <= ARC_VISIBLE_SPAN
      const visibilityProgress = isVisible ? 1 - distanceToArcCenter / ARC_VISIBLE_SPAN : 0

      return {
        event,
        index,
        angle,
        distanceToArcCenter,
        isVisible,
        visibilityProgress,
      }
    })
  }, [angleIncrement, events, rotationOffset])

  const offsetToScrollTop = (targetOffset: number) => {
    const shell = shellRef.current
    if (!shell) return null

    const shellTop = window.scrollY + shell.getBoundingClientRect().top
    const travel = Math.max(shell.offsetHeight - window.innerHeight, 1)
    const progress = targetOffset / MAX_ROTATION

    return shellTop + progress * travel
  }

  const scrollToActivePosition = (index: number) => {
    const shell = shellRef.current
    if (!shell || angleIncrement === 0) return

    const baseAngle = index * angleIncrement

    let targetOffset = rotationOffset
    let smallestDistance = Number.POSITIVE_INFINITY

    for (let turns = -3; turns <= 3; turns += 1) {
      const candidate = baseAngle - ARC_MID_ANGLE + turns * Math.PI * 2
      if (candidate < 0 || candidate > MAX_ROTATION) continue

      const distance = Math.abs(candidate - rotationOffset)
      if (distance < smallestDistance) {
        smallestDistance = distance
        targetOffset = candidate
      }
    }

    const targetScrollTop = offsetToScrollTop(targetOffset)
    if (targetScrollTop === null) return

    window.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth',
    })
  }

  const pointerAngleFromCenter = (clientX: number, clientY: number) => {
    const wheel = wheelRef.current
    if (!wheel) return null

    const rect = wheel.getBoundingClientRect()
    const centerX = rect.left + rect.width * -0.3
    const centerY = rect.top + rect.height * 0.58

    return Math.atan2(clientY - centerY, clientX - centerX)
  }

  const handleWheelPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLElement && event.target.closest('.timeline-wheel__item')) return

    const startAngle = pointerAngleFromCenter(event.clientX, event.clientY)
    if (startAngle === null) return

    dragMovedRef.current = false
    dragStateRef.current = {
      pointerId: event.pointerId,
      startAngle,
      startRotationOffset: rotationOffset,
    }

    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handleWheelPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current
    if (!dragState || dragState.pointerId !== event.pointerId) return

    const currentAngle = pointerAngleFromCenter(event.clientX, event.clientY)
    if (currentAngle === null) return

    const deltaAngle = normalizeAngle(currentAngle - dragState.startAngle)
    if (Math.abs(deltaAngle) > 0.015) dragMovedRef.current = true

    const targetOffset = Math.min(
      MAX_ROTATION,
      Math.max(0, dragState.startRotationOffset - deltaAngle),
    )
    const targetScrollTop = offsetToScrollTop(targetOffset)
    if (targetScrollTop === null) return

    window.scrollTo({
      top: targetScrollTop,
      behavior: 'auto',
    })
  }

  const handleWheelPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current
    if (!dragState || dragState.pointerId !== event.pointerId) return

    dragStateRef.current = null
    event.currentTarget.releasePointerCapture(event.pointerId)

    window.setTimeout(() => {
      dragMovedRef.current = false
    }, 0)
  }

  const activeIndex = useMemo(() => {
    if (wheelItems.length === 0) return -1

    return (
      wheelItems.reduce(
        (closest, item) => {
          if (!item.isVisible) return closest
          if (closest === null || item.distanceToArcCenter < closest.distanceToArcCenter)
            return item
          return closest
        },
        null as WheelItem | null,
      )?.index ?? 0
    )
  }, [wheelItems])

  const activeEvent = activeIndex >= 0 ? events[activeIndex] : null

  if (isError) return <ErrorState onRetry={onRetry} />

  if (isLoading) {
    return (
      <div className="timeline timeline--loading" aria-busy="true" aria-label={t('COMMON.LOADING')}>
        {Array.from({ length: 8 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="timeline__empty">
        <p>{t('TIMELINE.NO_EVENTS')}</p>
      </div>
    )
  }

  return (
    <div className="timeline-shell" ref={shellRef}>
      <div className="timeline-stage">
        <div className="timeline-stage__grid">
          <div
            ref={wheelRef}
            className="timeline-wheel"
            aria-label="Historical events timeline"
            onPointerDown={handleWheelPointerDown}
            onPointerMove={handleWheelPointerMove}
            onPointerUp={handleWheelPointerEnd}
            onPointerCancel={handleWheelPointerEnd}
          >
            <div className="timeline-wheel__orbit" aria-hidden="true" />

            {wheelItems.map(({ event, index, angle, isVisible, visibilityProgress }) => {
              const itemRadius = `var(--wheel-radius)`
              const isActive = index === activeIndex
              const normalizedAngle = normalizeAngle(angle)
              const isLeftSide = Math.abs(normalizedAngle) > Math.PI / 2
              const radialRotation = isLeftSide ? angle + Math.PI : angle
              const style = {
                transform: `translateY(-50%) translate(calc(cos(${angle}rad) * ${itemRadius}), calc(sin(${angle}rad) * ${itemRadius})) rotate(${radialRotation}rad) scale(${0.82 + visibilityProgress * 0.18})`,
                opacity: isVisible ? Math.max(0.2, visibilityProgress) : 0,
                pointerEvents: isVisible ? ('auto' as const) : ('none' as const),
              }

              return (
                <button
                  key={`${event.year}-${event.text}`}
                  type="button"
                  className={`timeline-wheel__item${isActive ? ' timeline-wheel__item--active' : ''}${isLeftSide ? ' timeline-wheel__item--flipped' : ''}`}
                  style={style}
                  onClick={() => {
                    if (dragMovedRef.current) return
                    scrollToActivePosition(index)
                  }}
                >
                  <span className="timeline-wheel__label">
                    <span className="timeline-wheel__year">{event.year}</span>
                    <span className="timeline-wheel__text">{event.text}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {activeEvent ? (
            <aside className="timeline-detail">
              <p className="timeline-detail__eyebrow">{t('TIMELINE.TITLE')}</p>
              <h2 className="timeline-detail__year">{activeEvent.year}</h2>
              <p className="timeline-detail__text">{activeEvent.text}</p>

              {activeEvent.imageUrl ? (
                <img
                  className="timeline-detail__image"
                  src={activeEvent.imageUrl}
                  alt={`${activeEvent.year} — ${activeEvent.text}`}
                  loading="lazy"
                />
              ) : null}

              <div className="timeline-detail__actions">
                {activeEvent.articleUrl ? (
                  <a
                    href={activeEvent.articleUrl}
                    className="timeline-detail__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('TIMELINE.WIKIPEDIA')} ↗
                  </a>
                ) : null}
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  )
}
