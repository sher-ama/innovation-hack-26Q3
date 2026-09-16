import { Sparkles } from 'lucide-react'

export interface SuggestedPromptsProps {
  prompts: string[]
  onSelectPrompt: (prompt: string) => void | Promise<void>
  disabled?: boolean
}

export function SuggestedPrompts({
  prompts,
  onSelectPrompt,
  disabled = false,
}: SuggestedPromptsProps) {
  if (prompts.length === 0) {
    return null
  }

  return (
    <section className="si-prompts" aria-labelledby="si-prompts-title">
      <span className="si-prompts__label" id="si-prompts-title">
        <Sparkles size={14} aria-hidden="true" />
        Suggested
      </span>

      <div className="si-prompts__row">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            className="si-prompts__chip"
            onClick={() => void onSelectPrompt(prompt)}
            disabled={disabled}
            title={prompt}
          >
            {prompt}
          </button>
        ))}
      </div>
    </section>
  )
}

export default SuggestedPrompts