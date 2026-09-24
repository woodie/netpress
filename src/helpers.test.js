import { describe, it, expect } from 'vitest'
import { balancedCols, githubUrl, langColor, langMatches } from './helpers.js'

describe('balancedCols', () => {
  it('returns n as-is when at or under the column cap', () => {
    expect(balancedCols(1)).toBe(1)
    expect(balancedCols(3)).toBe(3)
  })

  it('balances rows instead of leaving a lone trailing tile', () => {
    // 4 tiles at maxCols=3 would naively be 3+1; balanced is 2+2.
    expect(balancedCols(4)).toBe(2)
    // 7 tiles at maxCols=3 would naively be 3+3+1; balanced is 3+2+2 -> 3 cols.
    expect(balancedCols(7)).toBe(3)
  })

  it('respects a custom column cap', () => {
    expect(balancedCols(6, 4)).toBe(3)
  })
})

describe('githubUrl', () => {
  it('builds a github.com/woodie/<repo> URL', () => {
    expect(githubUrl('humane-go')).toBe('https://github.com/woodie/humane-go')
  })
})

describe('langColor', () => {
  it('returns the exact match color', () => {
    expect(langColor('Go')).toBe('#22d3ee')
  })

  it('matches the first language in a compound entry', () => {
    expect(langColor('Ruby / Docker')).toBe(langColor('Ruby'))
  })

  it('falls back for an unknown or missing language', () => {
    expect(langColor('COBOL')).toBe('#8ecae6')
    expect(langColor(undefined)).toBe('#8ecae6')
  })
})

describe('langMatches', () => {
  it('matches an exact language', () => {
    expect(langMatches('Swift', 'Swift')).toBe(true)
  })

  it('matches one language within a compound "A / B" entry', () => {
    expect(langMatches('Ruby / Docker', 'Docker')).toBe(true)
  })

  it('does not match an unrelated language, or a missing one', () => {
    expect(langMatches('Swift', 'Kotlin')).toBe(false)
    expect(langMatches(undefined, 'Kotlin')).toBe(false)
  })
})
