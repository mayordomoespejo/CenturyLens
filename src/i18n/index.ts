import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { APP_CONFIG } from '@/config/app'

import en from './locales/en.json'
import es from './locales/es.json'

export const SUPPORTED_LANGS = ['en', 'es'] as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGS,
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: APP_CONFIG.languageStorageKey,
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
