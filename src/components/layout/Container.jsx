import { cn } from '@/lib/cn'

const widths = {
  content: 'max-w-[var(--max-width-content)]',
  prose: 'max-w-[var(--max-width-prose)]',
  full: 'max-w-none',
}

export function Container({
  as: Component = 'div',
  width = 'content',
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cn(
        'mx-auto w-full px-[var(--spacing-page-x)]',
        widths[width],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
