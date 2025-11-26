interface CorrectProps {
  displayName: string
}

export function Correct({ displayName }: CorrectProps) {
  return (
    <div className="text-center bg-green-100/95 border-4 border-green-500 rounded-2xl px-8 py-6 shadow-2xl">
      <h2 className="text-2xl font-bold text-green-700 mb-2">Correct!</h2>
      <p className="text-lg text-green-900">It&apos;s a {displayName}!</p>
    </div>
  )
}
