import { cn } from '@/lib/cn'

export function Skeleton({ className }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'rounded-md bg-surface-muted motion-reduce:animate-none',
        'animate-pulse',
        className,
      )}
    />
  )
}
