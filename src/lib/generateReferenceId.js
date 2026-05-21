/** Civic-style reference: CIV-YYYYMMDD-XXXXXX */
export function generateReferenceId() {
  const date = new Date()
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const rand = crypto.randomUUID().replace(/-/g, '').slice(0, 6).toUpperCase()
  return `CIV-${y}${m}${d}-${rand}`
}
