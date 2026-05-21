import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_STORAGE_KEY,
} from '@/i18n'
import { getNested } from '@/lib/getNested'

const LanguageContext = createContext(null)

function readStoredLocale() {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
    return stored in LOCALES ? stored : DEFAULT_LOCALE
  } catch {
    return DEFAULT_LOCALE
  }
}

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(readStoredLocale)

  const messages = useMemo(() => LOCALES[locale].messages, [locale])

  const setLocale = useCallback((nextLocale) => {
    if (!(nextLocale in LOCALES)) return
    setLocaleState(nextLocale)
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale)
    } catch {
      /* ignore storage errors */
    }
  }, [])

  const t = useCallback(
    (key) => {
      const value = getNested(messages, key)
      return typeof value === 'string' ? value : key
    },
    [messages],
  )

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
