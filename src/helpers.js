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

// An element's lang is one language name, or an array of them for a
// project written in several (e.g. ['Go', 'JS/TS']). Names match LANGUAGES
// exactly -- 'JS/TS' is a single legend entry, not two.
export function langList (lang) {
  if (!lang) return []
  return Array.isArray(lang) ? lang : [lang]
}

// Tiles take the first language's color
export function langColor (lang) {
  const fallback = '#8ecae6'
  const found = LANGUAGES.find((l) => l.name === langList(lang)[0])
  return found ? found.color : fallback
}

export function langMatches (elLang, lang) {
  return langList(elLang).includes(lang)
}

export function langLabel (lang) {
  return langList(lang).join(' · ')
}
