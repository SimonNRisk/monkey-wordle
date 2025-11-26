export function checkFuzzyMatch(guessText: string, correctText: string): boolean {
  // First check exact match (case-insensitive)
  if (guessText.toLowerCase() === correctText.toLowerCase()) {
    return true
  }

  // Split into words and filter out "monkey" (case-insensitive)
  const guessWords = guessText
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word !== 'monkey' && word.length > 0)

  const correctWords = correctText
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word !== 'monkey' && word.length > 0)

  // Check if any word from guess matches any word from correct answer
  return guessWords.some((guessWord) => correctWords.includes(guessWord))
}
