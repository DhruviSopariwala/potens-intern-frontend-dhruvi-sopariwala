import { cn } from '@/lib/cn'

const variants = {
  display: 'type-display',
  title: 'type-title',
  heading: 'type-heading',
}

const tags = {
  display: 'h1',
  title: 'h2',
  heading: 'h3',
}

export function Heading({
  as,
  variant = 'heading',
  className,
  children,
  ...props
}) {
  const Component = as ?? tags[variant]

  return (
    <Component
      className={cn(variants[variant], className)}
      {...props}
    >
      {children}
    </Component>
  )
}
