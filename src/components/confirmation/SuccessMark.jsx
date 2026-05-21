import { memo } from 'react'
import { cn } from '@/lib/cn'

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12.5 9.5 17 19 7" />
    </svg>
  )
}

export const SuccessMark = memo(function SuccessMark({ revealed }) {
  return (
    <div
      role="img"
      aria-label="Success"
      className={cn(
        'mx-auto flex size-14 items-center justify-center rounded-full',
        'border border-accent/20 bg-accent-subtle text-accent',
        'transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none',
        revealed ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
      )}
    >
      <CheckIcon />
    </div>
  )
})
