# Blog outline: RSpec-style testing for Swift (xctidy)

**Working title:** "Making `xcodebuild` Output Look Like the Tests You
Actually Wrote"

**Audience:** iOS/Swift developers already using Quick/Nimble (or plain
XCTest) who are tired of `xcodebuild`'s raw console output not reflecting
their suite's real structure.

**Hook:** Quick/Nimble already give Swift the full RSpec experience --
`describe`/`context`/`it`, `beforeEach`/`afterEach`,
`expect(x).to(equal(y))`. The missing piece isn't structure or matchers,
it's output: `xcodebuild`/`swift test`'s console text doesn't render that
nesting as a tree. `xctidy` is a small, standalone binary that fixes just
that.

## 1. The gap: you already write RSpec-shaped Swift tests

- Quick gives real nested `describe`/`context`/`it`; Nimble gives
  RSpec-style matchers. Nothing missing on the *writing* side.
- What's missing: `xcodebuild test`'s own console output is noisy and
  flat relative to the structure you actually wrote.
- Existing alternatives and their gap: xcbeautify/xcpretty clean up
  output but don't add nested tree rendering.

## 2. What `xctidy` actually does

- One line: adds nested `describe`/`context`/`it` tree support to
  `xcodebuild`, written in Swift, compiles to a static binary.
- Usage as a pipe, nothing to adopt into the test code itself:
  `xcodebuild test [flags] | xctidy Tests`.
- The exit-status subtlety worth a callout: `xctidy` exits 1 on a real
  test failure it rendered, but can't know about an upstream build
  failure -- `set -o pipefail` alongside it on CI.
- The `swift test` stderr wrinkle: XCTest's status lines go to stderr, not
  stdout, so `swift test 2>&1 | xctidy Tests` needs the redirect
  `xcodebuild` doesn't.

## 3. Output styles, and the fastlane integration

- Four named styles (classic, `-fd`, `-fs`, `-fv`) -- screenshot the `-fd`
  one, matching the README's own example image.
- Drop-in `xcodebuild_formatter` for fastlane's `scan`/`gym`/`snapshot` --
  a one-line config swap from xcbeautify/xcpretty, no new pipeline stage.
- `xctidy --version` as a small but real detail: derived from the nearest
  git tag at build time, not a hand-maintained constant.

## 4. Writing tests that render well

- The one convention that matters most for a clean tree: one `QuickSpec`
  class per file, one top-level `describe` per file, matching the file's
  subject.
- Why: keeps the rendered tree predictable (one root per file) and keeps
  `-only-testing:` selection a one-line lookup instead of a multi-file
  hunt.

## 5. Try it

- Links: `xctidy` GitHub repo, `make install` snippet, fastlane config
  snippet.
- CTA: works with an existing Quick/Nimble suite as-is -- nothing to
  rewrite to get the tree output.
