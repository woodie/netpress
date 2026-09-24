import { LANGUAGES } from './data.js'

// Picks a mobile grid column count that splits a family's tiles as evenly
// as possible across rows, instead of always using a fixed 3 (which leaves
// an awkward lone tile on its own row for any count where n mod 3 == 1,
// e.g. 4 -> 3+1 or 7 -> 3+3+1). Capped at 3 columns since that's about as
// wide as a single tile+label reads comfortably on a phone.
export function balancedCols (n, maxCols = 3) {
  if (n <= maxCols) return n
  const rows = Math.ceil(n / maxCols)
  return Math.ceil(n / rows)
}

export function githubUrl (repo) {
  return `https://github.com/woodie/${repo}`
}

export function langColor (lang) {
  const fallback = '#8ecae6'
  if (!lang) return fallback
  const exact = LANGUAGES.find((l) => l.name === lang)
  if (exact) return exact.color
  // compound entries like "Ruby / Docker" -- match on the first language
  const first = lang.split('/')[0].trim()
  const partial = LANGUAGES.find((l) => l.name === first)
  return partial ? partial.color : fallback
}

export function langMatches (elLang, lang) {
  if (!elLang) return false
  if (elLang === lang) return true
  return elLang.split('/').map((s) => s.trim()).includes(lang)
}
