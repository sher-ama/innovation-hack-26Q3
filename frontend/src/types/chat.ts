export type ChatRole = 'user' | 'assistant' | 'system'

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  createdAt: string
}

export interface ChatRequestDto {
  message: string
  history?: ChatHistoryItem[]
}

export interface ChatHistoryItem {
  role: ChatRole
  message: string
}

export interface GroundingEntryDto {
  id: string
  question: string
  answer: string
}

export interface ChatResponseDto {
  answer: string
  grounding: GroundingEntryDto[]
}

export interface SuggestedPromptsResponseDto {
  prompts: string[]
}

export interface FaqEntryDto {
  id: string
  question: string
  answer: string
}

export interface FaqResponseDto {
  entries: FaqEntryDto[]
}

export interface UseChatOptions {
  initialMessages?: ChatMessage[]
  autoLoadSuggestedPrompts?: boolean
}