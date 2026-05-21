export function formatTimestamp(iso, locale) {
  const tag = locale === 'hi' ? 'hi-IN' : 'en-IN'
  return new Intl.DateTimeFormat(tag, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso))
}
