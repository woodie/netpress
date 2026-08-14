# Blog outline: RSpec-style testing for RSpec itself (rutidy)

**Working title:** "The One Language That Didn't Have This Yet Was Ruby"

**Audience:** Ruby/RSpec developers, and readers of the Kotlin/Go/Swift
posts wondering why the "everywhere" series ends up back where it
started.

**Hook:** Every other stop on this tour borrowed RSpec's shape and gave it
to a language that didn't have it. Ruby already has the real thing --
`--format documentation` renders a live nested tree in your terminal.
What it doesn't have is a *report*: `--format json` flattens every
`describe`/`context`/`it` into one space-joined string, so nothing
downstream -- CI dashboards, cross-language comparisons, further
reprocessing -- can rebuild the hierarchy `gorderly`/`xctidy`/`kotidy`
give their own languages for free. `rutidy` is what closes that gap.

## 1. The twist: why does RSpec need this at all

- Address the obvious objection first: RSpec already renders nested
  output beautifully with `--format documentation`. This isn't "Ruby
  finally gets a tree renderer."
- The real gap: `--format json` (`RSpec::Core::Formatters::JsonFormatter`)
  only gives each example a flattened `full_description` -- every level
  concatenated with plain spaces, no separator. Reconstructing a tree from
  that is strictly worse than the comma-disambiguation problem `xctidy`
  solves for Quick/Nimble, since RSpec doesn't even delimit with commas.
- So: no structured report to build anything *else* on -- no consistent
  CI artifact, no cross-language diffing, none of the four-style rendering
  the other three siblings get.

## 2. What `Rutidy::Formatter` actually does

- One line: a real RSpec formatter, not a text post-processor -- hooks
  `example_group_started`/`example_group_finished`, the same notifications
  `--format documentation` uses internally, so the hierarchy comes from
  the real stack the runner already maintains.
- Emits the same field set as stock `--format json`, plus the one field
  that format is missing: `hierarchy`, a real per-level array.
- Frame it as building the report RSpec should have shipped, using RSpec's
  own internal mechanism to do it -- not a workaround, the same approach
  its own formatter takes.

## 3. `rutidy` the CLI, and the four styles

- Same "wrap the CLI, or read its report" duality `gomeleon` offers for
  Ginkgo: `rutidy spec/` wraps `rspec` directly, `rutidy report.json`
  renders an existing report, `rspec ... | rutidy -fs` reads piped stdin.
- Four named styles (classic, `-fd`, `-fs`, `-fv`) -- screenshot the
  `-fs` one, matching the README's own example image.
- The punchline: this is the same table as `kotidy`/`gorderly`/`xctidy`,
  verbatim. Ruby was the pattern everyone else copied; now it renders in
  the same four looks as its own copies.

## 4. Closing the loop across the whole family

- Side-by-side output across Kotlin, Go, Swift, *and* Ruby suites is now
  visually identical -- the "everywhere" thesis was three-quarters true
  until this one shipped.
- Short callback to the overview post's repeating shape (structure +
  matchers + renderer) -- Ruby needed only the third piece, since RSpec
  already owns the first two outright.

## 5. Try it

- Links: `rutidy` GitHub repo, `gem install rutidy` / Gemfile snippet.
- CTA: if you've already read the Kotlin/Go/Swift posts, this is the one
  that makes the comparison actually checkable -- run your own RSpec suite
  through it and hold the output next to the others.
