import { memo } from 'react'
import { CategoryIcon } from '@/components/category/CategoryIcon'
import { cn } from '@/lib/cn'

export const CategoryBadge = memo(function CategoryBadge({
  label,
  categoryId,
  className,
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2.5 rounded-md border border-border bg-surface-muted/50 px-3 py-2',
        className,
      )}
    >
      <span className="flex size-8 items-center justify-center rounded-md bg-surface-raised text-accent">
        <CategoryIcon categoryId={categoryId} />
      </span>
      <span className="text-sm font-medium text-ink">{label}</span>
    </div>
  )
})
