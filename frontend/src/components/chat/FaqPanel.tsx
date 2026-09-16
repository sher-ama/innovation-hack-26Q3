import { AlertTriangle, CircleHelp, Loader2 } from 'lucide-react'

import type { FaqEntryDto } from '../../types/chat'

export interface FaqPanelProps {
  entries: FaqEntryDto[]
  isLoading: boolean
  error: string | null
  onRetry: () => void
}

export function FaqPanel({ entries, isLoading, error, onRetry }: FaqPanelProps) {
  return (
    <aside className="si-faq-panel" aria-labelledby="si-faq-title">
      <header className="si-faq-panel__header">
        <h2 className="si-faq-panel__title" id="si-faq-title">
          <CircleHelp size={20} aria-hidden="true" />
          Frequently asked questions
        </h2>
      </header>

      <div className="si-faq-panel__body">
        {isLoading && (
          <div className="si-faq-panel__state" role="status" aria-live="polite">
            <Loader2 className="si-faq-panel__spinner" size={22} aria-hidden="true" />
            <p>Loading FAQ entries…</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="si-faq-panel__state si-faq-panel__state--error" role="alert">
            <AlertTriangle size={22} aria-hidden="true" />
            <p>{error}</p>
            <button type="button" className="si-faq-panel__retry" onClick={onRetry}>
              Try again
            </button>
          </div>
        )}

        {!isLoading && !error && entries.length === 0 && (
          <div className="si-faq-panel__state">
            <p>No FAQ entries are available right now.</p>
          </div>
        )}

        {!isLoading && !error && entries.length > 0 && (
          <div className="si-faq-panel__accordion">
            {entries.map((entry) => (
              <details key={entry.id} className="si-faq-panel__item">
                <summary className="si-faq-panel__question">{entry.question}</summary>
                <p className="si-faq-panel__answer">{entry.answer}</p>
              </details>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}

export default FaqPanel
