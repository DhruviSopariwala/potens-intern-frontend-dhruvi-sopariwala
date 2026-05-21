import { memo } from 'react'
import { Heading } from './Heading'
import { cn } from '@/lib/cn'

export const PageHeader = memo(function PageHeader({
  title,
  titleId,
  subtitle,
  helper,
  helperId,
  className,
  children,
}) {
  return (
    <header className={cn('flex flex-col space-y-2.5', className)}>
      <Heading variant="title" id={titleId}>
        {title}
      </Heading>
      {subtitle && (
        <p className="type-body text-base leading-relaxed">{subtitle}</p>
      )}
      {helper && (
        <p
          id={helperId}
          className="text-sm leading-relaxed text-ink-subtle"
        >
          {helper}
        </p>
      )}
      {children}
    </header>
  )
})
