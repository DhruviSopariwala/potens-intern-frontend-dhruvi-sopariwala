import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { CategoryBadge } from '@/components/details/CategoryBadge'
import { ImageUpload } from '@/components/details/ImageUpload'
import { VoiceInput } from '@/components/details/VoiceInput'
import { Page } from '@/components/layout/Page'
import { Stack } from '@/components/layout/Stack'
import { BackLink } from '@/components/ui/BackLink'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/ui/PageHeader'
import { useLanguage } from '@/context/LanguageContext'
import { CATEGORY_IDS } from '@/data/categories'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { generateReferenceId } from '@/lib/generateReferenceId'
import { getSpeechLang } from '@/lib/speechLocale'
import { cn } from '@/lib/cn'

const MAX_IMAGES = 3
const MAX_DESCRIPTION = 500

const initialFormData = {
  description: '',
  images: [],
}

export function DetailsScreen() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const { t, locale } = useLanguage()
  const [formData, setFormData] = useState(initialFormData)

  const titleId = useId()
  const helperId = useId()
  const descriptionId = useId()
  const committedRef = useRef('')

  const appendFinal = useCallback((segment) => {
    const trimmedSegment = segment.trim()
    if (!trimmedSegment) return

    const base = committedRef.current
    const next = base ? `${base} ${trimmedSegment}`.trim() : trimmedSegment
    const capped = next.slice(0, MAX_DESCRIPTION)
    committedRef.current = capped
    setFormData((prev) => ({ ...prev, description: capped }))
  }, [])

  const showInterim = useCallback((segment) => {
    const trimmedSegment = segment.trim()
    const base = committedRef.current
    const preview = trimmedSegment
      ? base
        ? `${base} ${trimmedSegment}`.trim()
        : trimmedSegment
      : base

    setFormData((prev) => ({
      ...prev,
      description: preview.slice(0, MAX_DESCRIPTION),
    }))
  }, [])

  const handleTranscript = useCallback(
    ({ final, interim }) => {
      if (final) {
        appendFinal(final)
        return
      }
      if (interim !== undefined) showInterim(interim)
    },
    [appendFinal, showInterim],
  )

  const handleSessionEnd = useCallback(() => {
    committedRef.current = committedRef.current.slice(0, MAX_DESCRIPTION)
    setFormData((prev) => ({
      ...prev,
      description: committedRef.current,
    }))
  }, [])

  const speech = useSpeechRecognition({
    lang: getSpeechLang(locale),
    onTranscript: handleTranscript,
    onSessionEnd: handleSessionEnd,
  })

  const imagesRef = useRef(formData.images)
  imagesRef.current = formData.images

  useEffect(() => {
    speech.stop()
  }, [locale, speech.stop])

  useEffect(() => {
    return () => {
      imagesRef.current.forEach((image) =>
        URL.revokeObjectURL(image.previewUrl),
      )
    }
  }, [])

  const voiceLabels = useMemo(
    () => ({
      title: t('screens.details.voice.title'),
      hint: t('screens.details.voice.hint'),
      listening: t('screens.details.voice.listening'),
      listeningStatus: t('screens.details.voice.listeningStatus'),
      unsupported: t('screens.details.voice.unsupported'),
      start: t('screens.details.voice.start'),
      stop: t('screens.details.voice.stop'),
    }),
    [t],
  )

  const imageLabels = useMemo(
    () => ({
      title: t('screens.details.images.title'),
      hint: t('screens.details.images.hint'),
      add: t('screens.details.images.add'),
      limitReached: t('screens.details.images.limitReached'),
      remove: (name) => `${t('screens.details.images.remove')} ${name}`,
      empty: t('screens.details.images.empty'),
    }),
    [t],
  )

  const speechError = useMemo(
    () =>
      speech.errorKey
        ? t(`screens.details.voice.errors.${speech.errorKey}`)
        : null,
    [speech.errorKey, t],
  )

  const updateDescription = useCallback((value) => {
    const capped = value.slice(0, MAX_DESCRIPTION)
    setFormData((prev) => ({ ...prev, description: capped }))
    committedRef.current = capped
  }, [])

  const handleSpeechToggle = useCallback(() => {
    if (speech.isListening) {
      speech.stop()
      return
    }
    committedRef.current = formData.description.slice(0, MAX_DESCRIPTION)
    speech.start()
  }, [formData.description, speech])

  const handleAddImages = useCallback((files) => {
    setFormData((prev) => {
      const slotsLeft = MAX_IMAGES - prev.images.length
      const newImages = files.slice(0, slotsLeft).map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        previewUrl: URL.createObjectURL(file),
        file,
      }))
      return { ...prev, images: [...prev.images, ...newImages] }
    })
  }, [])

  const handleRemoveImage = useCallback((id) => {
    setFormData((prev) => {
      const image = prev.images.find((item) => item.id === id)
      if (image) URL.revokeObjectURL(image.previewUrl)
      return {
        ...prev,
        images: prev.images.filter((item) => item.id !== id),
      }
    })
  }, [])

  const handleContinue = useCallback(
    (event) => {
      event.preventDefault()
      if (!formData.description.trim()) return

      navigate('/confirmation', {
        state: {
          categoryId,
          description: formData.description.trim(),
          images: formData.images.map(({ name }) => ({ name })),
          referenceId: generateReferenceId(),
          timestamp: new Date().toISOString(),
        },
      })
    },
    [categoryId, formData, navigate],
  )

  if (!CATEGORY_IDS.includes(categoryId)) {
    return <Navigate to="/" replace />
  }

  const canContinue = formData.description.trim().length > 0

  return (
    <Page width="prose">
      <form onSubmit={handleContinue} noValidate>
        <Stack gap="xl">
          <PageHeader
            titleId={titleId}
            helperId={helperId}
            title={t('screens.details.title')}
            subtitle={t('screens.details.subtitle')}
            helper={t('screens.details.helper')}
          >
            <CategoryBadge
              categoryId={categoryId}
              label={t(`categories.${categoryId}.label`)}
              className="mt-1"
            />
          </PageHeader>

          <Stack gap="lg" aria-labelledby={titleId} aria-describedby={helperId}>
            <Stack gap="xs">
              <div className="flex items-baseline justify-between gap-2">
                <label
                  htmlFor={descriptionId}
                  className="text-sm font-medium text-ink"
                >
                  {t('screens.details.descriptionLabel')}
                </label>
                <span
                  className="text-xs tabular-nums text-ink-subtle"
                  aria-live="polite"
                >
                  {formData.description.length}/{MAX_DESCRIPTION}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-ink-muted">
                {t('screens.details.descriptionHelper')}
              </p>
              <textarea
                id={descriptionId}
                name="description"
                rows={5}
                required
                value={formData.description}
                onChange={(e) => updateDescription(e.target.value)}
                placeholder={t('screens.details.descriptionPlaceholder')}
                aria-describedby={`${descriptionId}-hint`}
                className={cn(
                  'surface-panel w-full resize-y px-3.5 py-3 text-base leading-relaxed text-ink',
                  'placeholder:text-ink-subtle',
                  'transition-[border-color,box-shadow] duration-150',
                  'focus-visible:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
                  speech.isListening && 'border-accent/40 ring-1 ring-accent/10',
                )}
              />
              <p id={`${descriptionId}-hint`} className="sr-only">
                {t('screens.details.descriptionHelper')}
              </p>
            </Stack>

            <VoiceInput
              supported={speech.supported}
              isListening={speech.isListening}
              status={speech.status}
              errorMessage={speechError}
              labels={voiceLabels}
              onToggle={handleSpeechToggle}
            />

            <ImageUpload
              images={formData.images}
              maxImages={MAX_IMAGES}
              labels={imageLabels}
              onAdd={handleAddImages}
              onRemove={handleRemoveImage}
            />
          </Stack>

          <Stack
            gap="sm"
            className="border-t border-border pt-6 sm:flex-row-reverse sm:items-center sm:justify-between"
          >
            <Button
              type="submit"
              disabled={!canContinue}
              className="h-12 w-full text-base sm:w-auto sm:min-w-[10rem]"
            >
              {t('nav.continue')}
            </Button>
            <BackLink to="/">{t('nav.back')}</BackLink>
          </Stack>
        </Stack>
      </form>
    </Page>
  )
}
