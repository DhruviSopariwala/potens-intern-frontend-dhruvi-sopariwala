import { cn } from '@/lib/cn'

export function Main({ children, className }) {
  return (
    <main
      className={cn('flex flex-1 flex-col', className)}
      id="main-content"
    >
      {children}
    </main>
  )
}
