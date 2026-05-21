import { memo } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { cn } from '@/lib/cn'

export const OfflineNotice = memo(function OfflineNotice({ visible }) {
  const { t } = useLanguage()

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'border-b border-border bg-surface-muted/90 px-4 py-2.5 text-center',
        'transition-[max-height,opacity,padding] duration-200 ease-out motion-reduce:transition-none',
        visible
          ? 'max-h-24 opacity-100'
          : 'pointer-events-none max-h-0 overflow-hidden border-transparent py-0 opacity-0',
      )}
    >
      <p className="text-sm leading-relaxed text-ink-muted">
        <span className="font-medium text-ink">{t('offline.title')}</span>
        {' — '}
        {t('offline.banner')}
      </p>
    </div>
  )
})
