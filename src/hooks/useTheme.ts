import { useEffect, useState } from 'react'
import { APP_CONFIG } from '@/config/app'
import type { Theme } from '@/types'

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme): void {
  document.documentElement.classList.remove('theme-light', 'theme-dark')
  document.documentElement.classList.add(`theme-${theme}`)
}

/**
 * Manages the persisted application theme and mirrors it to the document root.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(APP_CONFIG.themeStorageKey) as Theme | null
    return stored ?? getSystemTheme()
  })

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = (t: Theme) => {
    localStorage.setItem(APP_CONFIG.themeStorageKey, t)
    setThemeState(t)
  }

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return { theme, setTheme, toggleTheme }
}
