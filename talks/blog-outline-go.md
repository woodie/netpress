# Blog outline: RSpec-style testing for Go (expect + gorderly)

**Working title:** "RSpec-Style Testing for Go, With Nothing But `go
test`"

**Audience:** Go developers who've reached for Ginkgo/Gomega before (or
ruled it out) and want the RSpec experience without leaving stdlib
`testing`.

**Hook:** Go's stdlib `testing` package plus `t.Run` already gives you
real nested subtests -- what's missing is a generics-safe matcher library
and output that renders that nesting as a tree instead of a flat,
`/`-joined list. `expect` and `gorderly` each solve one of those, neither
requiring the other, and neither requiring Ginkgo.

## 1. Why not Ginkgo/Gomega

- Ginkgo owns its own execution and reporting -- a suite built on it shows
  up as one flat wrapper test under `go test -v`, with no real subtest
  tree for anything else to parse.
- The pre-generics reason Gomega/testify look the way they do: no
  type-safe `Expect(x).To(Equal(y))` without leaning on `interface{}` and
  reflection, plus a global fail-handler/wrapper. Generics remove that
  need entirely.
- Frame `expect`+`gorderly` as "what Gomega would look like if designed
  today, on top of `t.Run` instead of instead of it."

## 2. `expect`: generics-based matchers, dependency-free

- The pitch in one line: pass in `t`, otherwise it's Gomega -- `Equal`,
  `Contain`, `Succeed`, `HaveOccurred`, `BeNumerically`, `Panic`, etc.
  against a plain `*testing.T`/`testing.TB`.
- Standalone example: the three-way comparison already in the README --
  plain `go test` (`t.Error`) vs. Gomega standalone (wrapper) vs. `expect`
  (no wrapper) -- same assertion, fewest lines last. Good, concrete, and
  already written.
- The lowercase-alias convention (`func expect[T any](got T, t
  testing.TB) Expectation[T]`) -- why it's needed (dot-imported names must
  stay capitalized) and why it's a real generic function, not a closure,
  so nothing is lost on type inference.
- Where it differs from Gomega, briefly: `Equal`/`DeepEqual` split,
  occasional explicit `[T]` -- worth one paragraph, not the center of the
  post.

## 3. `gorderly`: RSpec-style output for plain `go test`

- The problem stated concretely: `go test -v`'s subtests already carry a
  real `/`-joined hierarchy (via `t.Run`) -- nothing renders it as an
  actual tree by default.
- How it works: reads `go test -v`'s raw text directly (same protocol
  every other Go tool parses), no `--json-report` round trip, no
  third-party BDD DSL required to already understand your tests.
- Where it sits relative to `gotestsum`: that tool already covers
  `dots`/`testname`/`pkgname`/`testdox` well -- `gorderly` exists
  specifically for the one format it doesn't, a real deduped nested tree.
- The four output styles (classic, `-fd`, `-fs`, `-fv`) -- screenshot.
- Usage is a pipe, nothing to adopt: `go test -v ./... | gorderly -fd`.

## 4. Using them together (plus `spec` for structure)

- `spec` (`sclevine/spec`) gives `describe`/`context`/`it` and
  `before`/`after` on top of `t.Run` -- the structural piece neither
  `expect` nor `gorderly` provides on its own.
- One short, complete example: a full suite using all three, piped through
  `gorderly -fd`, rendering as a real tree.
- Each piece is independent and swappable -- `expect` works in
  table-driven tests with no BDD framework at all; `gorderly` renders any
  suite's output, `spec`-based or not.

## 5. Try it

- Links: `expect`/`gorderly`/`sclevine/spec` repos, install snippets.
- CTA: works with whatever `testing`-based suite you already have; nothing
  to migrate off of first.
