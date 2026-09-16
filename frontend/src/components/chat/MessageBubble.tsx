import { Bot, Info, User } from 'lucide-react'

import type { ChatMessage } from '../../types/chat'

export interface MessageBubbleProps {
  message: ChatMessage
}

const roleMeta: Record<ChatMessage['role'], { label: string; icon: typeof Bot }> = {
  assistant: { label: 'Copilot', icon: Bot },
  user: { label: 'You', icon: User },
  system: { label: 'System', icon: Info },
}

function formatTimestamp(createdAt: string): string {
  const parsed = new Date(createdAt)

  if (Number.isNaN(parsed.getTime())) {
    return 'Now'
  }

  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(parsed)
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const meta = roleMeta[message.role]
  const Icon = meta.icon
  const timestamp = formatTimestamp(message.createdAt)

  return (
    <article
      className={`si-message si-message--${message.role}`}
      aria-label={`${meta.label} at ${timestamp}`}
    >
      <div className="si-message__meta">
        <span className="si-message__avatar" aria-hidden="true">
          <Icon size={14} />
        </span>
        <strong>{meta.label}</strong>
        <time dateTime={message.createdAt}>{timestamp}</time>
      </div>
      <p className="si-message__content">{message.content}</p>
    </article>
  )
}

export default MessageBubble