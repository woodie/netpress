# Blog outline: RSpec Everywhere (overview post)

Companion piece to the three language-specific posts (Kotlin, Go, Swift).
Ties them together under one thesis; doesn't re-explain any single tool in
depth -- links out to the deep dives instead. Complements (doesn't
replace) the conference-talk proposal already drafted in
`rspec-everywhere.md` in this folder -- this outline is for the written,
skimmable version; reuse the talk's abstract/hook freely.

**Working title:** "RSpec Everywhere: Carrying One Testing Discipline Into
Every Language"

**Audience:** engineers working across multiple languages/stacks (or
pairing with AI to do so), who already value RSpec-style tests but haven't
seen the pattern translated outside Ruby.

**Hook:** RSpec's real contribution isn't the `expect(x).to` syntax --
it's nested `describe`/`context`/`it` structure that reads like
documentation, plus a `subject`/`let` discipline that keeps scenarios DRY.
That discipline is portable. This post shows the same shape, deliberately
re-implemented (not just approximated) in Kotlin, Go, and Swift.

## 1. The problem worth solving

- Why test *structure* matters more than assertion syntax: a well-nested
  suite documents intent; a flat suite doesn't, regardless of how nice the
  matchers read.
- Why this matters more with AI writing a growing share of test code: a
  human reviewer needs to judge test quality fast, even in a language
  they're not fluent in. Legible structure is what makes that possible.
- The three things every language needs to get this: (1) nested
  context/lifecycle structure, (2) a matcher library, (3) test output that
  actually renders the nesting instead of flattening it.

## 2. The pattern, once, then three times

- Ruby/RSpec as the baseline everyone already recognizes:
  `describe`/`context`/`it`, `subject`/`let`, `before`/`after`.
- Same three pieces, per language, different native tools:
  - **Kotlin:** Kotest's `DescribeSpec` (structure) + `kwick`
    (`justBeforeEach`) + `kotidy` (tree-rendered Gradle output).
  - **Go:** `spec` (structure) + `expect` (matchers) + `gorderly`
    (tree-rendered `go test -v` output).
  - **Swift:** Quick/Nimble (structure + matchers, already RSpec-shaped)
    + `xctidy` (tree-rendered `xcodebuild`/`swift test` output).
- Callout: notice the shape repeats -- one structure library, one matcher
  library (or none needed, Kotlin/Swift), one renderer that turns raw
  runner output into a real nested tree. That repetition *is* the thesis.

## 3. Where the translation is faithful vs. where it isn't

- Faithful: nested context, nesting-scoped setup/teardown, nested tree
  output.
- Deliberately different per language, not a compromise: Go's `before`
  hook standing in for Ruby's real `let`; Kotlin's `shouldBe` staying
  native instead of adopting `expect()` syntax; Swift already having
  Quick/Nimble so no new structure library was needed there at all.
- The principle: match each language's own idiom rather than importing a
  pattern verbatim from wherever it was invented.

## 4. Why this matters for AI-paired development specifically

- A growing share of test code is co-written with AI, which raises the
  stakes on legibility, not lowers them.
- Side-by-side output across ports in different languages should look
  visually identical -- that's the actual, checkable payoff, not just a
  nice idea.
- A non-expert in a given language should still be able to judge whether a
  test is good from its structure and naming alone.

## 5. Where to go deeper

- Link out to the three language posts (one line of teaser each).
- Link to the tools' READMEs/GitHub repos.
- CTA: try the pairing in whichever language you're already in, or the one
  you're reaching for next with AI's help.
