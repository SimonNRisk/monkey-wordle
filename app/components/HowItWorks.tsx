export const HowItWorks = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl shadow-2xl p-4 w-[300px]">
        <h2 className="text-lg font-bold text-green-900 mb-3 text-center">How to Play</h2>
        <div className="space-y-2 text-sm text-green-900">
          <p>Guess the monkey species from the blurred image!</p>
          <p>Each incorrect guess reduces the blur slightly, with the image fully unblurred after 3 guesses.</p>
          <p>After 4 guesses, you&apos;ll get a hint.</p>
          <p>After 5 guesses, you&apos;ll get another hint.</p>
          <p className="font-semibold pt-2">You have 6 guesses total to solve the puzzle!</p>
        </div>
      </div>
    </div>
  )
}
