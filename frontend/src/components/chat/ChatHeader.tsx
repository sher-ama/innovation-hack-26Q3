import { Armchair, CircleHelp } from 'lucide-react'

import amadeusLogo from '../../assets/amadeus-logo.png'

export interface ChatHeaderProps {
  title?: string
  subtitle?: string
  statusLabel?: string
  onOpenFaq?: () => void
}

export function ChatHeader({
  title = 'Seating Intelligence Copilot',
  subtitle = 'Cabin-aware guidance for seat maps and passenger comfort.',
  statusLabel = 'Online',
  onOpenFaq,
}: ChatHeaderProps) {
  return (
    <header className="si-header" aria-label="Seating Intelligence Copilot header">
      <div className="si-header__brand">
        <img className="si-header__logo" src={amadeusLogo} alt="Amadeus" />
        <span className="si-header__divider" aria-hidden="true" />
        <div className="si-header__titles">
          <h1 className="si-header__title">
            <Armchair className="si-header__title-icon" size={20} aria-hidden="true" />
            {title}
          </h1>
          <p className="si-header__subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="si-header__actions">
        {onOpenFaq && (
          <button
            type="button"
            className="si-header__faq-trigger"
            onClick={onOpenFaq}
            aria-haspopup="dialog"
            aria-label="Open frequently asked questions"
          >
            <CircleHelp size={17} aria-hidden="true" />
            <span className="si-header__faq-trigger-label">FAQ</span>
          </button>
        )}

        <div className="si-header__status" role="status" aria-live="polite">
          <span className="si-header__status-dot" aria-hidden="true" />
          <span className="si-header__status-label">{statusLabel}</span>
        </div>
      </div>
    </header>
  )
}

export default ChatHeader