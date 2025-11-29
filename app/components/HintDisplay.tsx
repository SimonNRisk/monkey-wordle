interface HintDisplayProps {
  primaryHint: string | null
  secondaryHint: string | null
}

export function HintDisplay({ primaryHint, secondaryHint }: HintDisplayProps) {
  if (!primaryHint && !secondaryHint) return null

  return (
    <div className="flex flex-col gap-3">
      {primaryHint && (
        <div className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl shadow-2xl p-4 w-[300px]">
          <h2 className="text-lg font-bold text-green-900 text-center">Hint 1:</h2>
          <h3 className="text-lg text-green-900 italic">{primaryHint}</h3>
        </div>
      )}
      {secondaryHint && (
        <div className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl shadow-2xl p-4 w-[300px]">
          <h2 className="text-lg font-bold text-green-900 text-center">Hint 2:</h2>
          <h3 className="text-lg text-green-900 italic">{secondaryHint}</h3>
        </div>
      )}
    </div>
  )
}
