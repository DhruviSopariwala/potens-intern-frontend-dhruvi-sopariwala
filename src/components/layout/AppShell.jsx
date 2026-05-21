import { cn } from '@/lib/cn'

export function AppShell({ children, className }) {
  return (
    <div
      className={cn(
        'flex min-h-dvh flex-col bg-surface text-ink',
        className,
      )}
    >
      {children}
    </div>
  )
}
