import { memo } from 'react'
import { cn } from '@/lib/cn'

function MicIcon({ className }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="7" y="3" width="6" height="10" rx="3" />
      <path d="M5 9a5 5 0 0 0 10 0M10 14v2.5M7.5 16.5h5" strokeLinecap="round" />
    </svg>
  )
}

export const VoiceInput = memo(function VoiceInput({
  supported,
  isListening,
  status,
  errorMessage,
  labels,
  onToggle,
}) {
  const disabled = !supported || status === 'unsupported'

  return (
    <div className="surface-panel p-4">
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={onToggle}
          disabled={disabled}
          aria-pressed={isListening}
          aria-label={isListening ? labels.stop : labels.start}
          className={cn(
            'relative flex size-12 shrink-0 items-center justify-center rounded-full border',
            'transition-[background-color,border-color,transform] duration-150 ease-out',
            'active:scale-[0.97] motion-reduce:active:scale-100',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
            'disabled:cursor-not-allowed disabled:opacity-50',
            isListening
              ? 'border-accent bg-accent text-white shadow-sm'
              : 'border-border-strong bg-surface-muted text-accent hover:border-accent/40 hover:bg-accent-subtle',
          )}
        >
          <MicIcon className="size-5" />
        </button>

        <div className="min-w-0 flex-1 space-y-1 pt-0.5">
          <p className="text-sm font-medium text-ink">{labels.title}</p>
          <p className="text-sm leading-relaxed text-ink-muted">
            {isListening ? labels.listening : labels.hint}
          </p>
          {!supported && (
            <p className="text-sm text-ink-subtle" role="status">
              {labels.unsupported}
            </p>
          )}
          {errorMessage && (
            <p className="text-sm text-accent" role="alert">
              {errorMessage}
            </p>
          )}
        </div>
      </div>

      {isListening && (
        <p
          className="mt-3 border-t border-border pt-3 text-xs tracking-wide text-ink-subtle uppercase"
          aria-live="polite"
        >
          {labels.listeningStatus}
        </p>
      )}
    </div>
  )
})
