import { useCallback, useEffect, useRef, useState } from 'react'

import { fetchSuggestedPrompts, sendChatMessage } from '../api/chatClient'
import type { ChatMessage, ChatRequestDto, ChatResponseDto, UseChatOptions } from '../types/chat'

function createMessage(role: ChatMessage['role'], content: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    createdAt: new Date().toISOString(),
  }
}

function getAssistantText(response: ChatResponseDto): string {
  const answerText = response.answer.trim().length > 0 ? response.answer : 'No response from assistant.'

  if (response.grounding.length === 0) {
    return answerText
  }

  const sourceQuestions = response.grounding
    .slice(0, 2)
    .map((entry) => `- ${entry.question}`)
    .join('\n')

  return `${answerText}\n\nGrounding context:\n${sourceQuestions}`
}

export function useChat(options: UseChatOptions = {}) {
  const { initialMessages = [], autoLoadSuggestedPrompts = true } = options

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hasInitializedPromptsRef = useRef(false)

  const initializeSuggestedPrompts = useCallback(async () => {
    setError(null)
    setIsLoading(true)

    try {
      const result = await fetchSuggestedPrompts()
      setSuggestedPrompts(result.prompts)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load suggested prompts')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const sendMessage = useCallback(
    async (message: string) => {
      const text = message.trim()
      if (!text || isLoading) {
        return
      }

      setError(null)
      setMessages((prev) => [...prev, createMessage('user', text)])
      setIsLoading(true)

      try {
        const history: ChatRequestDto['history'] = messages.slice(-20).map((item) => ({
          role: item.role,
          message: item.content,
        }))

        const response = await sendChatMessage({
          message: text,
          history,
        })

        setMessages((prev) => [...prev, createMessage('assistant', getAssistantText(response))])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to send message')
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, messages],
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  useEffect(() => {
    if (!autoLoadSuggestedPrompts || hasInitializedPromptsRef.current) {
      return
    }

    hasInitializedPromptsRef.current = true
    void initializeSuggestedPrompts()
  }, [autoLoadSuggestedPrompts, initializeSuggestedPrompts])

  return {
    messages,
    suggestedPrompts,
    isLoading,
    error,
    sendMessage,
    initializeSuggestedPrompts,
    clearError,
    setMessages,
  }
}