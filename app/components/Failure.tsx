interface FailureProps {
  displayName: string
}

export default function Failure({ displayName }: FailureProps) {
  return (
    <div className="text-center bg-orange-100/95 border-4 border-orange-500 rounded-2xl px-8 py-6 shadow-2xl">
      <h2 className="text-2xl font-bold text-orange-700 mb-2">Out of Guesses!</h2>
      <p className="text-lg text-orange-900">The answer was: {displayName}</p>
    </div>
  )
}
