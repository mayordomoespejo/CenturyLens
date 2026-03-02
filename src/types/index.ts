/**
 * Shared calendar date shape used across route state and inputs.
 */
export interface CalendarDate {
  month: number
  day: number
}

/**
 * Normalized event model consumed by the timeline UI.
 */
export interface TimelineEvent {
  year: number
  text: string
  articleUrl?: string
  imageUrl?: string
}

/**
 * Visual theme options supported by the application shell.
 */
export type Theme = 'light' | 'dark'
