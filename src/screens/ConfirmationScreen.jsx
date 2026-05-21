import { useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { SuccessMark } from '@/components/confirmation/SuccessMark'
import { Page } from '@/components/layout/Page'
import { Stack } from '@/components/layout/Stack'
import { Button } from '@/components/ui/Button'
import { DetailRow } from '@/components/ui/DetailRow'
import { PageHeader } from '@/components/ui/PageHeader'
import { Text } from '@/components/ui/Text'
import { useLanguage } from '@/context/LanguageContext'
import { formatTimestamp } from '@/lib/formatTimestamp'
import { saveSubmission } from '@/lib/submissionStorage'
import { cn } from '@/lib/cn'

export function ConfirmationScreen() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { t, locale } = useLanguage()
  const [revealed, setRevealed] = useState(false)
  const savedRef = useRef(false)

  const isValid = Boolean(state?.categoryId && state?.referenceId)
  const categoryId = state?.categoryId
  const referenceId = state?.referenceId
  const description = state?.description ?? ''
  const timestamp = state?.timestamp ?? new Date().toISOString()

  const imageNames = useMemo(
    () => (state?.images ?? []).map((image) => image.name).filter(Boolean),
    [state?.images],
  )

  useEffect(() => {
    const frame = requestAnimationFrame(() => setRevealed(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!isValid || savedRef.current) return
    savedRef.current = true

    saveSubmission({
      referenceId,
      categoryId,
      description,
      imageNames,
      timestamp,
    })
  }, [isValid, referenceId, categoryId, description, imageNames, timestamp])

  if (!isValid) {
    return <Navigate to="/" replace />
  }

  const formattedTime = formatTimestamp(timestamp, locale)
  const reveal = (delay = '') =>
    cn(
      'transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none',
      delay,
      revealed ? 'translate-y-0 opacity-100' : 'translate-y-1.5 opacity-0',
    )

  return (
    <Page>
      <Stack gap="xl">
        <header className={cn('space-y-4 text-center', reveal())}>
          <SuccessMark revealed={revealed} />
          <PageHeader
            title={t('screens.confirmation.title')}
            subtitle={t('screens.confirmation.subtitle')}
            className="items-center text-center [&_.type-body]:text-center"
          />
        </header>

        <div className={reveal('delay-75')}>
          <div className="rounded-lg border border-accent/25 bg-accent-subtle/60 px-4 py-5 text-center sm:px-6">
            <p className="type-caption">{t('screens.confirmation.referenceLabel')}</p>
            <p
              className="mt-2 break-all font-mono text-xl font-semibold tracking-wide text-ink sm:text-2xl"
              aria-label={`${t('screens.confirmation.referenceLabel')}: ${referenceId}`}
            >
              {referenceId}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-ink-subtle">
              {t('screens.confirmation.referenceHint')}
            </p>
          </div>
        </div>

        <dl className={cn('surface-panel m-0 grid gap-4 p-4 sm:p-5', reveal('delay-150'))}>
          <DetailRow label={t('screens.confirmation.categoryLabel')}>
            {t(`categories.${categoryId}.label`)}
          </DetailRow>
          <DetailRow label={t('screens.confirmation.timestampLabel')}>
            <time dateTime={timestamp}>{formattedTime}</time>
          </DetailRow>
          {description ? (
            <DetailRow label={t('screens.details.descriptionLabel')}>
              <Text variant="small" className="leading-relaxed">
                {description}
              </Text>
            </DetailRow>
          ) : null}
          {imageNames.length > 0 ? (
            <DetailRow label={t('screens.confirmation.imagesLabel')}>
              <ul className="m-0 list-none space-y-1 p-0">
                {imageNames.map((name) => (
                  <li key={name} className="text-ink-muted">
                    {name}
                  </li>
                ))}
              </ul>
            </DetailRow>
          ) : null}
        </dl>

        <div className={cn('space-y-4', reveal('delay-200'))}>
          <p className="text-center text-sm leading-relaxed text-ink-subtle">
            {t('screens.confirmation.savedLocally')}
          </p>
          <Button
            type="button"
            onClick={() => navigate('/')}
            className="h-12 w-full text-base"
          >
            {t('screens.confirmation.submitAnother')}
          </Button>
        </div>
      </Stack>
    </Page>
  )
}
