import { memo, useCallback } from 'react'
import { CategoryIcon } from './CategoryIcon'
import { cn } from '@/lib/cn'

export const CategoryCard = memo(function CategoryCard({
  id,
  label,
  description,
  selected,
  onSelect,
}) {
  const handleClick = useCallback(() => onSelect(id), [id, onSelect])

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={handleClick}
      className={cn(
        'group flex w-full items-start gap-4 rounded-lg border bg-surface-raised p-4 text-left',
        'transition-[border-color,background-color,box-shadow,transform] duration-150 ease-out',
        'hover:border-border-strong hover:bg-surface-muted/40',
        'active:scale-[0.995] motion-reduce:active:scale-100',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
        selected
          ? 'border-accent/50 bg-accent-subtle/50 shadow-sm ring-1 ring-accent/15'
          : 'border-border shadow-sm',
      )}
    >
      <span
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-md transition-colors duration-150',
          selected
            ? 'bg-accent/10 text-accent'
            : 'bg-surface-muted text-ink-subtle group-hover:text-accent',
        )}
      >
        <CategoryIcon categoryId={id} />
      </span>

      <span className="min-w-0 flex-1 pt-0.5">
        <span className="type-heading block">{label}</span>
        <span className="mt-1.5 block text-sm leading-relaxed text-ink-muted">
          {description}
        </span>
      </span>

      <span
        aria-hidden="true"
        className={cn(
          'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-150',
          selected
            ? 'border-accent bg-accent'
            : 'border-border-strong bg-transparent',
        )}
      >
        <svg
          viewBox="0 0 12 12"
          className={cn(
            'size-2.5 text-white transition-opacity duration-150',
            selected ? 'opacity-100' : 'opacity-0',
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 6l2.5 2.5 5-5" />
        </svg>
      </span>
    </button>
  )
})
