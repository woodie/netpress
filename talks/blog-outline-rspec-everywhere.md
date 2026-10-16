# Blog outline: RSpec Everywhere (overview post)

Companion piece to the four language-specific posts (Kotlin, Go, Swift,
Ruby). Ties them together under one thesis; doesn't re-explain any single
tool in depth -- links out to the deep dives instead. Complements
(doesn't replace) the conference-talk proposal already drafted in
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
  - **JS/TS:** Vitest already covers structure, matchers and a tree
    reporter (`--reporter=tree`); the one missing piece is the hook, which
    `penultimate` adds. No dedicated post yet -- worth one once it's on
    npm.
- Callout: notice the shape repeats -- one structure library, one matcher
  library (or none needed, Kotlin/Swift), one renderer that turns raw
  runner output into a real nested tree. That repetition *is* the thesis.
- A second, smaller repetition worth naming: Ginkgo's `JustBeforeEach`
  (a hook that runs after every `BeforeEach` at every level, right before
  the test) turns out to be a gap in more than one ecosystem. Quick has
  it natively, which is where this family first used it. Kotest's
  `DescribeSpec` never had it -- `kwick` adds it as an extension. Upstream
  `sclevine/spec` never had it either -- `woodie/spec` adds it directly,
  forking rather than extending. Vitest doesn't have it -- `penultimate`
  adds it by swapping each test's body for one that runs the queued steps
  first, leaving Vitest's own `it` alone. Three different mechanisms, same
  missing piece.
- One example, four languages: the `kwick`, `woodie/spec` and
  `penultimate` READMEs now share the same `#divide` example (defaults in
  the parent, each `context` overriding one input, one hoisted action).
  Put it side by side with the RSpec version as the post's main figure --
  the checkable version of "same shape everywhere." The language posts
  keep their real-project examples (Kotlin's `GoodTimesSpec.kt`); the
  overview is where one shared toy example earns its place, since a
  comparison needs the same example in every column.

## 3. Where the translation is faithful vs. where it isn't

- Faithful: nested context, nesting-scoped setup/teardown, nested tree
  output.
- Deliberately different per language, not a compromise: Go's `before`
  hook standing in for Ruby's real `let`; Kotlin's `shouldBe` staying
  native instead of adopting `expect()` syntax; Swift already having
  Quick/Nimble so no new structure library was needed there at all.
- The principle: match each language's own idiom rather than importing a
  pattern verbatim from wherever it was invented.
- The clearest case: `justBeforeEach` is how an eager language gets
  RSpec's lazy `subject`. RSpec never needs the hook -- `subject` is
  evaluated when an `it` first touches it, after every `before` and with
  the innermost `let` override in place. Elsewhere, the mapping is:
  defaults in a parent `beforeEach` play `let`, a `context`'s own
  `beforeEach` plays the `let` override, and `justBeforeEach` plays
  `subject`. RSpec's style-guide order (`subject`, then `let`, then
  hooks) has the same shape.
- The error path translates per language too: an action under test that
  might throw has to be captured as a value, not left to fail setup.
  Kotlin uses `runCatching`, TypeScript a `try`/`catch` that clears the
  outcome first, and Go gets it for free from `(result, err)` returns.

## 4. Why this matters for AI-paired development specifically

- A growing share of test code is co-written with AI, which raises the
  stakes on legibility, not lowers them.
- Side-by-side output across ports in different languages should look
  visually identical -- that's the actual, checkable payoff, not just a
  nice idea.
- A non-expert in a given language should still be able to judge whether a
  test is good from its structure and naming alone.

## 5. Where to go deeper

- Link out to the four language posts (one line of teaser each) --
  including Ruby's, the odd one out: it didn't need a structure library or
  matchers, just the same tree-rendered report the other three get.
- Link to the tools' READMEs/GitHub repos.
- CTA: try the pairing in whichever language you're already in, or the one
  you're reaching for next with AI's help.
