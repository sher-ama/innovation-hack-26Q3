import { AlertTriangle, Armchair, Loader2, X } from 'lucide-react'

import type { ChatMessage } from '../../types/chat'
import { MessageBubble } from './MessageBubble'

export interface ChatWindowProps {
  messages: ChatMessage[]
  isLoading?: boolean
  error?: string | null
  onDismissError?: () => void
  emptyStateTitle?: string
  emptyStateBody?: string
}

export function ChatWindow({
  messages,
  isLoading = false,
  error = null,
  onDismissError,
  emptyStateTitle = 'Ready when you are',
  emptyStateBody = 'Ask for seat recommendations, disruption handling, or passenger comfort analysis.',
}: ChatWindowProps) {
  return (
    <section className="si-chat-window" aria-labelledby="si-chat-window-title">
      <div className="sr-only" id="si-chat-window-title">
        Conversation panel
      </div>

      {error ? (
        <div className="si-chat-window__error" role="alert">
          <AlertTriangle className="si-chat-window__error-icon" size={18} aria-hidden="true" />
          <p>{error}</p>
          {onDismissError ? (
            <button type="button" onClick={onDismissError} aria-label="Dismiss error message" title="Dismiss">
              <X size={16} aria-hidden="true" />
            </button>
          ) : null}
        </div>
      ) : null}

      {messages.length === 0 ? (
        <div className="si-empty-state" role="status" aria-live="polite">
          <div className="si-empty-state__icon" aria-hidden="true">
            <Armchair size={28} />
          </div>
          <div className="si-empty-state__copy">
            <h2>{emptyStateTitle}</h2>
            <p>{emptyStateBody}</p>
          </div>
        </div>
      ) : (
        <div className="si-chat-window__messages" aria-live="polite" aria-busy={isLoading}>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {isLoading ? (
            <div className="si-message si-message--assistant si-message--typing" aria-label="Copilot is preparing a reply">
              <Loader2 className="si-typing-icon" size={16} aria-hidden="true" />
              <span>Thinking…</span>
            </div>
          ) : null}
        </div>
      )}
    </section>
  )
}

export default ChatWindow