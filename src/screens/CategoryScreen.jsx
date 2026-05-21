import { useCallback, useId, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CategoryCard } from '@/components/category/CategoryCard'
import { Page } from '@/components/layout/Page'
import { Stack } from '@/components/layout/Stack'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/ui/PageHeader'
import { useLanguage } from '@/context/LanguageContext'
import { CATEGORY_IDS } from '@/data/categories'
import { cn } from '@/lib/cn'

export function CategoryScreen() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [selectedId, setSelectedId] = useState(null)
  const titleId = useId()
  const helperId = useId()

  const handleKeyDown = useCallback((event) => {
    const currentIndex = selectedId
      ? CATEGORY_IDS.indexOf(selectedId)
      : -1
    let nextIndex = currentIndex

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      nextIndex =
        currentIndex < CATEGORY_IDS.length - 1 ? currentIndex + 1 : 0
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault()
      nextIndex =
        currentIndex > 0 ? currentIndex - 1 : CATEGORY_IDS.length - 1
    } else if (event.key === 'Home') {
      event.preventDefault()
      nextIndex = 0
    } else if (event.key === 'End') {
      event.preventDefault()
      nextIndex = CATEGORY_IDS.length - 1
    } else {
      return
    }

    setSelectedId(CATEGORY_IDS[nextIndex])
  }, [selectedId])

  const handleContinue = useCallback(() => {
    if (selectedId) navigate(`/details/${selectedId}`)
  }, [navigate, selectedId])

  const categories = useMemo(
    () =>
      CATEGORY_IDS.map((id) => ({
        id,
        label: t(`categories.${id}.label`),
        description: t(`categories.${id}.description`),
      })),
    [t],
  )

  return (
    <Page>
      <Stack gap="xl">
        <PageHeader
          titleId={titleId}
          helperId={helperId}
          title={t('screens.category.title')}
          subtitle={t('screens.category.subtitle')}
          helper={t('screens.category.helper')}
        />

        <div
          role="radiogroup"
          aria-labelledby={titleId}
          aria-describedby={helperId}
          onKeyDown={handleKeyDown}
          className="outline-none"
        >
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {categories.map(({ id, label, description }) => (
              <li key={id}>
                <CategoryCard
                  id={id}
                  label={label}
                  description={description}
                  selected={selectedId === id}
                  onSelect={setSelectedId}
                />
              </li>
            ))}
          </ul>
        </div>

        <div
          aria-live="polite"
          className={cn(
            'transition-[max-height,opacity,transform] duration-200 ease-out motion-reduce:transition-none',
            selectedId
              ? 'pointer-events-auto max-h-20 translate-y-0 opacity-100'
              : 'pointer-events-none max-h-0 -translate-y-1 overflow-hidden opacity-0',
          )}
        >
          <Button
            type="button"
            onClick={handleContinue}
            className="h-12 w-full text-base"
            aria-label={t('nav.continue')}
          >
            {t('nav.continue')}
          </Button>
        </div>
      </Stack>
    </Page>
  )
}
