# Blog outline: RSpec-style testing for Kotlin (kwick + kotidy)

**Working title:** "RSpec-Style Testing for Kotlin: `justBeforeEach` and a
Real Nested Tree"

**Audience:** Kotlin/Android developers already using (or evaluating)
Kotest's `DescribeSpec`, who want RSpec's actual day-to-day experience,
not just its vocabulary.

**Hook:** Kotest's `DescribeSpec` already gives Kotlin real
`describe`/`context`/`it` nesting and `beforeEach`/`afterEach`. Two real
gaps remain once you've used RSpec itself: no hook for "the action under
test, run once, after every level of setup," and no test output that
actually looks like the suite you wrote. `kwick` and `kotidy` close those
two gaps independently -- useful together, but neither depends on the
other.

## 1. Why `DescribeSpec` alone isn't quite enough

- What Kotest already gives you for free: `describe`/`context` nesting,
  `beforeEach`/`afterEach` at any depth, infix `shouldBe` matchers.
- The two gaps this post is about: (a) no `justBeforeEach`-equivalent hook,
  (b) Gradle's own test output doesn't preserve or render the nesting you
  wrote.

## 2. `kwick`: a `justBeforeEach` hook for `DescribeSpec`

- The problem stated concretely: an action that needs to run after *every*
  `beforeEach` at every level, immediately before the `it` -- so what
  varies (inputs) and the action under test can live at different nesting
  levels instead of being duplicated per `context`.
- Standalone example: the `Calculator#divideBy` walkthrough from the
  README (numerator/denominator/`justBeforeEach`), unchanged, self-
  contained, no other project's domain code.
- Setup: registering `JustBeforeEachExtension` on `ProjectConfig` --
  and the gotcha that a forgotten registration is a silent no-op.
- The `runCatching`-outcome convention: hoisting an action that might throw
  into `justBeforeEach` without it becoming a setup failure instead of an
  assertion failure.
- Scoping variables gotcha: `lateinit var` for reference types vs. a
  placeholder `var` for primitives/inline value classes -- a real Kotlin-
  specific wrinkle worth calling out since it trips people up.
- This isn't a hypothetical gap: [kotest/kotest#952](https://github.com/kotest/kotest/issues/952)
  (filed against KotlinTest, Kotest's predecessor, back in 2019) asked for
  exactly this -- a scoped `beforeEachTest` closure, explicitly citing
  Ginkgo's `JustBeforeEach` as the model. It's closed with no PR six years
  later. The filer's own sketch (a `BaseTest` subclass collecting closures
  via an overridden `beforeTest`, requiring `IsolationMode.InstancePerLeaf`)
  raised the exact questions a real implementation has to answer --
  whether subclassing `DescribeSpec` is safe with more complex setups,
  listeners, and extensions, and whether there are threading gotchas --
  which is precisely what `JustBeforeEachExtension` had to get right as a
  real, working extension rather than a proposal. Worth a line wondering
  in print whether this could ever land upstream in `DescribeSpec` itself
  (making `kwick` unnecessary -- a fine outcome) -- the issue being closed,
  unresolved, since 2019 suggests it isn't coming soon.

## 3. `kotidy`: RSpec-style output for Kotest, via a real Gradle plugin

- The problem stated concretely: Gradle's own JUnit Platform integration
  flattens nested Kotest names to leaf-only output -- you wrote a tree, the
  console doesn't show one.
- Why not an existing plugin: `gradle-test-logger-plugin`'s blank-line
  padding with no way to disable it; `kotest-gradle-plugin`'s alpha status
  and its own `kotest` task replacing `test` entirely rather than adding to
  it.
- How `kotidy` actually works: hooks Gradle's `TestListener` API directly,
  walks the real `TestDescriptor.parent` chain, re-renders as a dense,
  deduped tree -- no raw text parsing.
- The four output styles (classic, `fd`, `fs`, `fv`) -- screenshot-worthy,
  good visual anchor for the post.
- One-line install via the Gradle Plugin Portal -- emphasize how low-
  friction adoption is (no CLI wrapper, every `Test` task picks it up
  automatically).

## 4. Using them together

- `kwick` for how you *write* the spec, `kotidy` for what you *see* when
  you run it -- independent tools, complementary payoff.
- Brief mention that the same two-gap shape (structure hook + tree
  renderer) recurs in Go and Swift, teeing up the overview post without
  re-explaining it.

## 5. Try it

- Links: `kwick`/`kotidy` GitHub repos, install snippets from each README.
- CTA: if you're already on Kotest, both are additive -- nothing to
  migrate away from.
