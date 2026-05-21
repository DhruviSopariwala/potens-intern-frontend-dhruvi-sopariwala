const STORAGE_KEY = 'civic-submissions'

export function saveSubmission(submission) {
  try {
    const existing = getSubmissions()
    const next = [submission, ...existing]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    return true
  } catch {
    return false
  }
}

export function getSubmissions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
