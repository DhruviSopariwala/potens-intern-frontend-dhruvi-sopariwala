import { memo, useId, useRef } from 'react'
import { cn } from '@/lib/cn'

function ImageIcon({ className }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <rect x="3" y="4" width="14" height="12" rx="1.5" />
      <circle cx="7.5" cy="8.5" r="1.5" />
      <path d="M3 14l3.5-3.5 2.5 2.5L13 10l4 4" strokeLinejoin="round" />
    </svg>
  )
}

export const ImageUpload = memo(function ImageUpload({
  images,
  maxImages = 3,
  labels,
  onAdd,
  onRemove,
}) {
  const inputId = useId()
  const inputRef = useRef(null)
  const atLimit = images.length >= maxImages

  function handleFileChange(event) {
    const files = Array.from(event.target.files ?? [])
    if (files.length) onAdd(files)
    event.target.value = ''
  }

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <label htmlFor={inputId} className="text-sm font-medium text-ink">
            {labels.title}
          </label>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">
            {labels.hint}
          </p>
        </div>
        <span className="shrink-0 text-xs tabular-nums text-ink-subtle">
          {images.length}/{maxImages}
        </span>
      </div>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        disabled={atLimit}
        onChange={handleFileChange}
        aria-describedby={`${inputId}-hint`}
      />

      <button
        type="button"
        disabled={atLimit}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border-strong',
          'bg-surface-raised px-4 py-5 text-sm font-medium text-accent',
          'transition-[background-color,border-color,transform] duration-150',
          'hover:border-accent/40 hover:bg-accent-subtle/40',
          'active:scale-[0.995] motion-reduce:active:scale-100',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
        aria-describedby={`${inputId}-hint`}
      >
        <ImageIcon className="size-5" />
        {atLimit ? labels.limitReached : labels.add}
      </button>

      <p id={`${inputId}-hint`} className="sr-only">
        {labels.hint}
      </p>

      {images.length === 0 && labels.empty ? (
        <p className="text-center text-sm text-ink-subtle">{labels.empty}</p>
      ) : null}

      {images.length > 0 && (
        <ul className="m-0 grid list-none grid-cols-3 gap-2 p-0">
          {images.map((image) => (
            <li key={image.id} className="relative">
              <img
                src={image.previewUrl}
                alt=""
                loading="lazy"
                decoding="async"
                className="aspect-square w-full rounded-md border border-border object-cover"
              />
              <button
                type="button"
                onClick={() => onRemove(image.id)}
                aria-label={labels.remove(image.name)}
                className={cn(
                  'absolute top-1 right-1 flex size-7 items-center justify-center rounded-full',
                  'border border-border bg-surface-raised/95 text-ink shadow-sm',
                  'transition-colors duration-150 hover:bg-surface-muted',
                  'active:scale-95 motion-reduce:active:scale-100',
                  'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus',
                )}
              >
                <span aria-hidden="true" className="text-sm leading-none">
                  ×
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
})
