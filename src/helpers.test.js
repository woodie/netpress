import { describe, it, expect } from 'vitest'
import { balancedCols, githubUrl, langColor, langLabel, langList, langMatches } from './helpers.js'

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
    // desktop rows: six stays one row, eight splits 4-over-4
    expect(balancedCols(6, 6)).toBe(6)
    expect(balancedCols(8, 6)).toBe(4)
  })
})

describe('githubUrl', () => {
  it('builds a github.com/woodie/<repo> URL', () => {
    expect(githubUrl('humane-go')).toBe('https://github.com/woodie/humane-go')
  })
})

describe('langList', () => {
  it('wraps a single language', () => {
    expect(langList('Go')).toEqual(['Go'])
  })

  it('passes an array through', () => {
    expect(langList(['Go', 'JS/TS'])).toEqual(['Go', 'JS/TS'])
  })

  it('treats JS/TS as one language, not two', () => {
    expect(langList('JS/TS')).toEqual(['JS/TS'])
  })

  it('is empty for a missing language', () => {
    expect(langList(undefined)).toEqual([])
  })
})

describe('langColor', () => {
  it('returns the exact match color', () => {
    expect(langColor('Go')).toBe('#22d3ee')
  })

  it('uses the first language of an array', () => {
    expect(langColor(['Go', 'JS/TS'])).toBe(langColor('Go'))
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

  it('matches any language in an array', () => {
    expect(langMatches(['Go', 'JS/TS'], 'Go')).toBe(true)
    expect(langMatches(['Go', 'JS/TS'], 'JS/TS')).toBe(true)
  })

  it('does not match an unrelated language, or a missing one', () => {
    expect(langMatches('Swift', 'Kotlin')).toBe(false)
    expect(langMatches(['Go', 'JS/TS'], 'Ruby')).toBe(false)
    expect(langMatches(undefined, 'Kotlin')).toBe(false)
  })
})

describe('langLabel', () => {
  it('lists every language', () => {
    expect(langLabel(['Go', 'JS/TS'])).toBe('Go · JS/TS')
    expect(langLabel('Swift')).toBe('Swift')
  })
})
