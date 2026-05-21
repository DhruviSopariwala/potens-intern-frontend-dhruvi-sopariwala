import { cn } from '@/lib/cn'

const gaps = {
  xs: 'gap-[var(--spacing-stack-xs)]',
  sm: 'gap-[var(--spacing-stack-sm)]',
  md: 'gap-[var(--spacing-stack-md)]',
  lg: 'gap-[var(--spacing-stack-lg)]',
  xl: 'gap-[var(--spacing-stack-xl)]',
  '2xl': 'gap-[var(--spacing-stack-2xl)]',
}

export function Stack({
  as: Component = 'div',
  gap = 'md',
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cn('flex flex-col', gaps[gap], className)}
      {...props}
    >
      {children}
    </Component>
  )
}
