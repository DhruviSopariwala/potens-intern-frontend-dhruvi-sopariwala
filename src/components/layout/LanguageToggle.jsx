import { memo, useCallback } from 'react'
import { LOCALES } from '@/i18n'
import { useLanguage } from '@/context/LanguageContext'
import { cn } from '@/lib/cn'

const LOCALE_CODES = Object.keys(LOCALES)

export const LanguageToggle = memo(function LanguageToggle() {
  const { locale, setLocale } = useLanguage()

  return (
    <div
      className="inline-flex rounded-md border border-border bg-surface p-0.5"
      role="group"
      aria-label="Language"
    >
      {LOCALE_CODES.map((code) => (
        <LocaleButton
          key={code}
          code={code}
          label={LOCALES[code].label}
          active={locale === code}
          onSelect={setLocale}
        />
      ))}
    </div>
  )
})

const LocaleButton = memo(function LocaleButton({
  code,
  label,
  active,
  onSelect,
}) {
  const handleClick = useCallback(() => onSelect(code), [code, onSelect])

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      className={cn(
        'touch-target rounded-sm px-2.5 py-1 text-sm font-medium transition-colors duration-150',
        active
          ? 'bg-accent text-white'
          : 'text-ink-muted hover:text-ink',
      )}
    >
      {label}
    </button>
  )
})
