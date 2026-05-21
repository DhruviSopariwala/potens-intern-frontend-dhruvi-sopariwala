import { memo } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

export const BackLink = memo(function BackLink({ to = '/', children, className }) {
  return (
    <Link
      to={to}
      className={cn(
        'touch-target inline-flex w-full items-center justify-center rounded-md border border-border',
        'bg-surface-raised px-4 text-sm font-medium text-ink',
        'transition-[background-color,transform] duration-150 ease-out',
        'hover:bg-surface-muted active:scale-[0.99] motion-reduce:active:scale-100',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
        'sm:w-auto',
        className,
      )}
    >
      {children}
    </Link>
  )
})
