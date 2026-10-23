# Blog outline: RSpec-style testing for Vitest (penultimate)

**Timing:** publish once `penultimate` is on npm, so the install line and
the upstream Vitest issue can both point at a real package.

**Working title:** "`justBeforeEach` for Vitest: The One Hook It Was
Missing"

**Audience:** JavaScript/TypeScript developers on Vitest (or Jest) who
nest `describe` blocks and have felt the pull to duplicate the same
action in every leaf.

**Hook:** Vitest is already the most RSpec-shaped of the runners in this
series: nested `describe`, `beforeEach` at any depth, `expect`, even a
tree reporter. The one thing missing is a hook that runs after every
`beforeEach`, right before the test, so the action under test can be
written once while each `context` changes only its inputs.
`penultimate` adds it, without replacing Vitest's own `it`.

## 1. What Vitest already gives you

- `describe` nesting (with `const context = describe`), `beforeEach`/
  `afterEach` at any depth, built-in `expect`, and `--reporter=tree` for
  output that matches the suite you wrote. Unlike Kotlin, Go and Swift,
  no matcher library or renderer is needed.
- The gap, stated concretely: a parent's `beforeEach` always runs before
  its children's, so an action placed there runs before any `context`
  has changed an input.
- Why Vitest's own tools don't cover it: `aroundEach` (new in 4.1) and
  test fixtures both run *before* `beforeEach`.
- Prior art, checked on npm before writing it: Given/When/Then DSLs
  (jasmine-given, @hirez_io/jest-given) replace `it` with `Then`, and
  given2/given3 are a lazy `let`, not a hook. Nothing adds
  `justBeforeEach` to Vitest or Jest.

## 2. When `expect(subject())` isn't enough

- Concede the obvious first: when the action returns a value, a plain
  function called inside each `it` does the job (`expect(divide()).toBe(5)`),
  and the README says so. `justBeforeEach` earns its place when the action
  takes a payload and has side effects: each `context` changes one field of
  the payload, and the `it` blocks never mention the action at all.
- The example: checking out an order charges its card, marks it paid and
  emails a receipt. A coupon changes the amount; an expired card does none
  of that, and a day later sends a reminder.

```js
describe('checkout', () => {
  let order, gateway, mailer

  beforeEach(() => {
    vi.useFakeTimers()
    order = { items: [{ sku: 'mug', price: 12 }], card: 'valid', coupon: null, status: 'unpaid' }
    gateway = { charge: vi.fn(async (card) => ({ ok: card === 'valid' })) }
    mailer = { send: vi.fn() }
  })

  justBeforeEach(() => checkout(order, { gateway, mailer }))

  it('charges the card', () => {
    expect(gateway.charge).toHaveBeenCalledWith('valid', 12)
  })

  it('marks the order paid', () => {
    expect(order.status).toBe('paid')
  })

  it('emails a receipt', () => {
    expect(mailer.send).toHaveBeenCalledWith('receipt')
  })

  context('with a coupon', () => {
    beforeEach(() => { order.coupon = 'HALF' })

    it('charges half', () => {
      expect(gateway.charge).toHaveBeenCalledWith('valid', 6)
    })
  })

  context('when the card has expired', () => {
    beforeEach(() => { order.card = 'expired' })

    it('leaves the order unpaid', () => {
      expect(order.status).toBe('unpaid')
    })

    it('sends no receipt', () => {
      expect(mailer.send).not.toHaveBeenCalled()
    })

    context('and a day passes', () => {
      justBeforeEach(() => { vi.advanceTimersByTime(24 * 60 * 60 * 1000) })

      it('emails a reminder', () => {
        expect(mailer.send).toHaveBeenCalledWith('reminder')
      })
    })
  })
})
```

- Four things this shows, each checked by running it:
  - **Each `context` changes one field, not the call.** `order.coupon =
    'HALF'` and `order.card = 'expired'` are the whole difference between
    contexts, RSpec's `let` override. Nobody rewrites
    `checkout({ ...order, card: 'expired' }, deps)` in each `it`.
  - **`beforeEach` can't hold the action.** Moved there, it runs before any
    `context` has changed the payload, and all four tests in the coupon and
    expired-card contexts fail.
  - **Calling it inside each `it` is easy to forget, and silent.** Without
    the action, `"leaves the order unpaid"` and `"sends no receipt"` still
    pass, since the order starts unpaid and nothing was sent. With
    `expect(subject())` the action sits inside the assertion; with side
    effects it doesn't, so the hook is what guarantees it ran.
  - **A nested `context` can add a step after the action.** `"and a day
    passes"` would otherwise need every `it` in it to repeat
    `await checkout(...)` and then advance the clock.

## 3. The real example: `lambada`'s page spec

- `lambada`'s `spec/javascript/main.spec.js`, `"clicking delete"`: the
  top-level `beforeEach` stubs `confirm` to return `true` and the server
  to answer `DELETE` with 204, and `justBeforeEach(clickDelete)` makes the
  click once. `"when cancelled"` overrides only `confirm`; `"when the
  server refuses (for example, locked in Finder)"` overrides only the
  status, to 423. That's RSpec's `let` override, one input per `context`.
- Same suite, a second shape worth showing: `"and a minute passes"` adds
  `justBeforeEach(() => vi.advanceTimersByTime(60_000))` under the
  top-level `justBeforeEach(subject)`. Stacked hooks run outermost first,
  so this reads as "load the page, then let a minute pass" -- the one kind
  of nesting that stays clear.
- The shared `#divide` example from the README is for the overview post's
  side-by-side figure; this post leads with checkout, then the real one.

## 4. How it works without wrapping `it`

- The first draft exported its own `it` that ran the queued steps. It
  broke `it.each`/`it.skip`/`it.concurrent`, and a forgotten import
  turned every step into a silent no-op.
- What shipped instead: the first `justBeforeEach` to fire for a test
  swaps that test's body for one that runs the queue, then the original.
  Vitest reads the body only after every `beforeEach`, so the order comes
  out right with the stock `it`. Compare `kwick`, which needs one
  registration line in Kotest's `ProjectConfig`; here there's nothing to
  configure.
- Per-test queues (a `WeakMap` keyed by the test) so concurrent tests
  don't share steps and a retried test runs them again.
- Screenshot: the dogfood suite under `--reporter=tree` -- ordering,
  async steps, `it.each`, `it.concurrent` and `retry`, each with its own
  `context`.

## 5. A step that might throw

- Hoisting an action that's expected to fail breaks naively: the throw
  fails the test before any expectation runs.
- The fix: catch it into a variable, clearing the outcome at the top of
  the step so no test sees one left over from the last. Same idea as
  `kwick`'s `runCatching` convention; Go gets it for free from
  `(result, err)`.

## 6. Vitest 5, and taking it upstream

- Why the package says `vitest >=4.1.0 <5`: Vitest 5 bundles
  `@vitest/runner`, and its replacement, `TestRunner.setTestFn`, is
  defined as the getter (`getFn`), so nothing public can set a test's
  body. A one-line bug, worth reporting on its own.
- The plan, in Vitest's own order (its PR policy auto-closes PRs without
  an `approved` issue): the bug issue first, then a feature issue for
  `justBeforeEach` with `penultimate` as the working proof, then a PR
  shaped like `aroundEach`'s. Making `penultimate` unnecessary would be a
  fine outcome.
- Vitest's AI policy asks that issues and PRs be written in the
  contributor's own voice -- a natural place to say how this series uses
  AI pairing.

## 7. Try it

- Links: `penultimate` GitHub repo and npm page, install snippet
  (`npm install --save-dev penultimate`, into `devDependencies`).
- CTA: if you're on Vitest 4, it's one import -- no config, and your
  existing `it` calls keep working.
