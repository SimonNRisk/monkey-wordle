interface FailureProps {
  displayName: string
}

export default function Failure({ displayName }: FailureProps) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-2">Out of Guesses!</h2>
      <p className="text-lg text-gray-700">The answer was: {displayName}</p>
    </div>
  )
}
