export function getBlur(numberOfGuesses: number) {
  let blurClass = ''

  switch (numberOfGuesses) {
    case 0:
      blurClass = 'blur-md'
      break
    case 1:
      blurClass = 'blur-sm'
      break
    case 2:
      blurClass = 'blur-xs'
      break
    default:
      blurClass = 'blur-none'
  }

  return blurClass
}
