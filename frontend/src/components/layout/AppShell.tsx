import { useFaq } from '../../hooks/useFaq'
import type { ChatMessage } from '../../types/chat'
import '../../styles/theme.css'
import '../../styles/global.css'
import '../chat/chat.css'
import { ChatHeader } from '../chat/ChatHeader'
import { ChatWindow } from '../chat/ChatWindow'
import { FaqPanel } from '../chat/FaqPanel'
import { MessageInput } from '../chat/MessageInput'
import { SuggestedPrompts } from '../chat/SuggestedPrompts'

export interface AppShellProps {
  messages: ChatMessage[]
  suggestedPrompts: string[]
  isLoading?: boolean
  error?: string | null
  onSendMessage: (message: string) => void | Promise<void>
  onPromptSelect?: (prompt: string) => void | Promise<void>
  onDismissError?: () => void
}

export function AppShell({
  messages,
  suggestedPrompts,
  isLoading = false,
  error = null,
  onSendMessage,
  onPromptSelect,
  onDismissError,
}: AppShellProps) {
  const handlePromptSelect = onPromptSelect ?? onSendMessage
  const { entries: faqEntries, isLoading: isFaqLoading, error: faqError, loadFaq } = useFaq()

  return (
    <div className="si-app">
      <ChatHeader />

      <div className="si-app__body">
        <main className="si-app__main" aria-label="Chat workspace">
          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            error={error}
            onDismissError={onDismissError}
          />

          <SuggestedPrompts
            prompts={suggestedPrompts}
            onSelectPrompt={handlePromptSelect}
            disabled={isLoading}
          />

          <MessageInput onSendMessage={onSendMessage} isLoading={isLoading} />
        </main>

        <FaqPanel entries={faqEntries} isLoading={isFaqLoading} error={faqError} onRetry={loadFaq} />
      </div>
    </div>
  )
}

export default AppShell