import { cn } from '@/lib/cn'
import { Container } from './Container'

export function Section({
  as: Component = 'section',
  width = 'content',
  padding = true,
  className,
  containerClassName,
  children,
  ...props
}) {
  return (
    <Component
      className={cn(
        padding && 'py-[var(--spacing-section)]',
        className,
      )}
      {...props}
    >
      <Container width={width} className={containerClassName}>
        {children}
      </Container>
    </Component>
  )
}
