interface CorrectProps {
  displayName: string
}

export default function Correct({ displayName }: CorrectProps) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-2">Correct!</h2>
      <p className="text-lg text-gray-700">It&apos;s a {displayName}!</p>
    </div>
  )
}
