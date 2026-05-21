import { memo } from 'react'
import { cn } from '@/lib/cn'

const variants = {
  primary:
    'bg-accent text-white hover:bg-accent-hover border-transparent active:bg-accent-hover',
  secondary:
    'bg-surface-raised text-ink border-border hover:bg-surface-muted active:bg-surface-muted',
  ghost:
    'bg-transparent text-accent border-transparent hover:bg-accent-subtle active:bg-accent-subtle',
}

export const Button = memo(function Button({
  variant = 'primary',
  className,
  children,
  ...props
}) {
  return (
    <button
      type="button"
      className={cn(
        'touch-target inline-flex items-center justify-center rounded-md border px-4 py-2',
        'text-sm font-medium transition-[background-color,transform,opacity] duration-150 ease-out',
        'active:scale-[0.99] motion-reduce:active:scale-100',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
})
