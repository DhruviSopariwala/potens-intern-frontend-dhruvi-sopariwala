import { cn } from '@/lib/cn'

const variants = {
  body: 'type-body',
  small: 'type-small',
  caption: 'type-caption',
  overline: 'type-overline',
}

export function Text({
  as: Component = 'p',
  variant = 'body',
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cn(variants[variant], className)}
      {...props}
    >
      {children}
    </Component>
  )
}
