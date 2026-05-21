import { memo } from 'react'

export const DetailRow = memo(function DetailRow({ label, children }) {
  return (
    <div>
      <dt className="type-caption">{label}</dt>
      <dd className="mt-1.5 text-sm text-ink">{children}</dd>
    </div>
  )
})
