/**
 * Shared application metadata used by the UI and document head.
 */
export const APP_CONFIG = {
  name: 'CenturyLens',
  titleSeparator: '·',
  themeStorageKey: 'cl_theme',
  languageStorageKey: 'cl_lang',
  wikimediaBaseUrl: 'https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/events',
} as const
