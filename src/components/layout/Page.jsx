import { memo } from 'react'
import { Section } from './Section'
import { cn } from '@/lib/cn'

export const Page = memo(function Page({
  width = 'content',
  className,
  containerClassName,
  children,
  ...props
}) {
  return (
    <Section
      width={width}
      className={cn('pb-[var(--spacing-stack-2xl)]', className)}
      containerClassName={cn('max-w-lg w-full', containerClassName)}
      {...props}
    >
      <div className="page-enter">{children}</div>
    </Section>
  )
})
