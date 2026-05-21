import en from './locales/en.json'
import hi from './locales/hi.json'

export const LOCALES = {
  en: { label: 'EN', messages: en },
  hi: { label: 'HI', messages: hi },
}

export const DEFAULT_LOCALE = 'en'

export const LOCALE_STORAGE_KEY = 'civic-locale'
