import { AppShell } from './components/layout/AppShell'
import { useChat } from './hooks/useChat'

function App() {
  const {
    messages,
    suggestedPrompts,
    isLoading,
    error,
    sendMessage,
    clearError,
  } = useChat({ autoLoadSuggestedPrompts: true })

  return (
    <AppShell
      messages={messages}
      suggestedPrompts={suggestedPrompts}
      isLoading={isLoading}
      error={error}
      onSendMessage={sendMessage}
      onPromptSelect={sendMessage}
      onDismissError={clearError}
    />
  )
}

export default App
