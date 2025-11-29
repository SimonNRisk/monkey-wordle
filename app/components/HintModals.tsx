import { HintModal } from './HintModal'

interface HintModalsProps {
  showPrimary: boolean
  showSecondary: boolean
  primaryHint: string | null
  secondaryHint: string | null
  onPrimaryClose: () => void
  onSecondaryClose: () => void
}

export function HintModals({
  showPrimary,
  showSecondary,
  primaryHint,
  secondaryHint,
  onPrimaryClose,
  onSecondaryClose
}: HintModalsProps) {
  return (
    <>
      {showPrimary && primaryHint && <HintModal hint={primaryHint} isOpen={showPrimary} onClose={onPrimaryClose} />}
      {showSecondary && secondaryHint && (
        <HintModal hint={secondaryHint} isOpen={showSecondary} onClose={onSecondaryClose} />
      )}
    </>
  )
}
