import { FormEvent, KeyboardEvent, useId, useState } from 'react'
import { Send } from 'lucide-react'

export interface MessageInputProps {
  onSendMessage: (message: string) => void | Promise<void>
  isLoading?: boolean
  disabled?: boolean
  placeholder?: string
}

export function MessageInput({
  onSendMessage,
  isLoading = false,
  disabled = false,
  placeholder = 'Ask about seat maps, disruptions, or passenger comfort...',
}: MessageInputProps) {
  const [draft, setDraft] = useState('')
  const textareaId = useId()
  const isDisabled = disabled || isLoading

  function submitDraft() {
    const nextMessage = draft.trim()
    if (!nextMessage || isDisabled) {
      return
    }

    void onSendMessage(nextMessage)
    setDraft('')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submitDraft()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submitDraft()
    }
  }

  return (
    <form className="si-composer" onSubmit={handleSubmit} aria-label="Message composer">
      <label className="sr-only" htmlFor={textareaId}>
        Message Seating Intelligence Copilot
      </label>
      <textarea
        id={textareaId}
        className="si-composer__input"
        rows={1}
        value={draft}
        placeholder={placeholder}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isDisabled}
        aria-describedby={`${textareaId}-hint`}
      />
      <p className="sr-only" id={`${textareaId}-hint`}>
        Press Enter to send, Shift+Enter for a new line.
      </p>
      <button
        className="si-composer__submit"
        type="submit"
        disabled={isDisabled || !draft.trim()}
        aria-label="Send message"
        title="Send (Enter)"
      >
        <Send size={18} aria-hidden="true" />
        <span>{isLoading ? 'Sending…' : 'Send'}</span>
      </button>
    </form>
  )
}

export default MessageInput