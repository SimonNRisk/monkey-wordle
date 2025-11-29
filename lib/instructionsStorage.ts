const INSTRUCTIONS_KEY = 'monkey-wordle-has-seen-instructions'

/**
 *
 * Next.js uses SSR (Server sends full HTML and hydrates with JS rather than letting client download JS and build the page).
 * Better SEO (search engines can see the full page).
 * More performant (less JS to download and execute).
 * Because of this, our instructionsStorage.ts is run on the server first. There's no window on the server, so trying to get or set the localStorage key will error.
 * Thus, we check for the window object first and return false if it doesn't exist.
 *
 */

export function hasSeenInstructions(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(INSTRUCTIONS_KEY) === 'true'
}

export function markInstructionsAsSeen(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(INSTRUCTIONS_KEY, 'true')
  }
}
