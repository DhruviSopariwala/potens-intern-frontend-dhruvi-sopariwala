const iconClass = 'size-5'

const icons = {
  maintenance: (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={iconClass} fill="none">
      <path
        d="M10 4v2M8 6h4M7.5 9.5 10 11l2.5 2.5M10 11l-2.5 2.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  ),
  sanitation: (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={iconClass} fill="none">
      <path
        d="M8 3v1.5M7 5.5h2M6.5 7h5l-.5 8a1 1 0 0 1-1 .9H8a1 1 0 0 1-1-.9L6.5 7Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 10h3"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  ),
  utilities: (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={iconClass} fill="none">
      <path
        d="M10 3.5v2.5M8.25 5.75h3.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M6.5 9c0-1.9 1.6-3.5 3.5-3.5S13.5 7.1 13.5 9c0 3.1-3.5 5.75-3.5 5.75S6.5 12.1 6.5 9Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  ),
  permits: (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={iconClass} fill="none">
      <path
        d="M6.5 4h4.5l2.5 2.5v9H6.5V4Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M11 4v2.5h2.5M8 10.5h4M8 13h2.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  ),
}

export function CategoryIcon({ categoryId }) {
  return icons[categoryId] ?? null
}
