import type {
  ChatRequestDto,
  ChatResponseDto,
  FaqEntryDto,
  FaqResponseDto,
  SuggestedPromptsResponseDto,
} from '../types/chat'

const CHAT_ENDPOINT = '/api/chat'
const SUGGESTED_PROMPTS_ENDPOINT = '/api/chat/suggested-prompts'
const FAQ_ENDPOINT = '/api/chat/faq'

function getErrorMessage(payload: unknown): string {
  if (!payload || typeof payload !== 'object') {
    return 'Request failed'
  }

  const detail = (payload as { detail?: unknown }).detail
  if (typeof detail === 'string') {
    return detail
  }

  if (Array.isArray(detail) && detail.length > 0) {
    const first = detail[0]
    if (first && typeof first === 'object' && typeof (first as { msg?: unknown }).msg === 'string') {
      return (first as { msg: string }).msg
    }
  }

  return 'Request failed'
}

async function parseJson(response: Response): Promise<unknown> {
  try {
    return await response.json()
  } catch {
    return null
  }
}

export async function sendChatMessage(payload: ChatRequestDto): Promise<ChatResponseDto> {
  const response = await fetch(CHAT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await parseJson(response)
  if (!response.ok) {
    throw new Error(getErrorMessage(data))
  }

  const answer =
    data && typeof data === 'object' && typeof (data as { answer?: unknown }).answer === 'string'
      ? (data as { answer: string }).answer
      : 'No response from assistant.'

  const groundingRaw = data && typeof data === 'object' ? (data as { grounding?: unknown }).grounding : []
  const grounding = Array.isArray(groundingRaw)
    ? groundingRaw
        .filter(
          (item): item is { id: string; question: string; answer: string } =>
            !!item &&
            typeof item === 'object' &&
            typeof (item as { id?: unknown }).id === 'string' &&
            typeof (item as { question?: unknown }).question === 'string' &&
            typeof (item as { answer?: unknown }).answer === 'string',
        )
        .map((item) => ({
          id: item.id,
          question: item.question,
          answer: item.answer,
        }))
    : []

  return {
    answer,
    grounding,
  }
}

export async function fetchSuggestedPrompts(): Promise<SuggestedPromptsResponseDto> {
  const response = await fetch(SUGGESTED_PROMPTS_ENDPOINT)
  const data = await parseJson(response)

  if (!response.ok) {
    throw new Error(getErrorMessage(data))
  }

  const prompts = (data as { prompts?: unknown } | null)?.prompts
  return {
    prompts: Array.isArray(prompts)
      ? prompts.filter((item): item is string => typeof item === 'string')
      : [],
  }
}

export async function fetchFaqEntries(): Promise<FaqResponseDto> {
  const response = await fetch(FAQ_ENDPOINT)
  const data = await parseJson(response)

  if (!response.ok) {
    throw new Error(getErrorMessage(data))
  }

  const rawEntries = data && typeof data === 'object' ? (data as { entries?: unknown }).entries : []
  const entries: FaqEntryDto[] = Array.isArray(rawEntries)
    ? rawEntries
        .filter(
          (item): item is { id: string; question: string; answer: string } =>
            !!item &&
            typeof item === 'object' &&
            typeof (item as { id?: unknown }).id === 'string' &&
            typeof (item as { question?: unknown }).question === 'string' &&
            typeof (item as { answer?: unknown }).answer === 'string',
        )
        .map((item) => ({
          id: item.id,
          question: item.question,
          answer: item.answer,
        }))
    : []

  return { entries }
}