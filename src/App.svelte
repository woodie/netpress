<script>
  import { LANGUAGES, FAMILIES, ELEMENTS } from './data.js'
  import { balancedCols, githubUrl, langColor, langMatches } from './helpers.js'

  // -- grid layout (static -- FAMILIES/ELEMENTS never change at runtime) --
  // Groups ELEMENTS by family in FAMILIES' own order (not ELEMENTS' raw
  // array order, which doesn't match it -- see data.js) and assigns each
  // tile a running display number in that same rendering order. `index`
  // stays each element's real position in ELEMENTS, for showDetail().
  let num = 0
  const grouped = FAMILIES.map((family) => {
    const items = ELEMENTS.filter((e) => e.family === family.id).map((el) => {
      num += 1
      return { ...el, num, index: ELEMENTS.indexOf(el) }
    })
    return { family, items, mobileCols: balancedCols(items.length) }
  })

  // -- language legend, with forced line-breaks every `legendCols` items --
  // (only affects the mobile @media block in periodic.css; desktop's
  // single wide row is unaffected either way.)
  const legendCols = balancedCols(LANGUAGES.length, 4)

  // -- legend hover/click filtering ----------------------------------------
  // Hovering a legend entry highlights matching cells and mutes the rest.
  // Clicking locks that state in place for 5s, then it clears itself.
  let filterKey = null
  let lockedKey = null
  let filterLockTimer = null

  function applyFilter (key) {
    filterKey = key
  }

  function clearFilter () {
    filterKey = null
    lockedKey = null
  }

  function onLegendEnter (key) {
    if (!filterLockTimer) applyFilter(key)
  }

  function onLegendLeave () {
    if (!filterLockTimer) clearFilter()
  }

  function onLegendClick (key) {
    if (filterLockTimer) clearTimeout(filterLockTimer)
    applyFilter(key)
    lockedKey = key
    filterLockTimer = setTimeout(() => {
      clearFilter()
      filterLockTimer = null
    }, 5000)
  }

  // Legend items are clickable (lock the filter) but weren't reachable by
  // keyboard at all in the original vanilla version -- Enter/Space here
  // does the same thing a click does, now that they're real tab stops
  // (tabindex="0" below).
  function onLegendKeydown (key, event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onLegendClick(key)
    }
  }

  // -- detail drawer --------------------------------------------------
  // Pinned to the bottom of the window. Opens only on a tile click
  // (showDetail()) and always auto-closes 5s later, unless a real mouse
  // is hovering the selected tile or the drawer itself, in which case
  // hovering just pauses that countdown (cancelDrawerClose()) -- it
  // never reopens an already-closed drawer.
  //
  // activeIndex is which ELEMENTS entry the drawer is showing (starts at
  // 0, so the drawer has real content from the first render). selectedIndex
  // is which tile gets the .active highlight, and stays null until the
  // user actually clicks a tile -- matching the original's behavior of
  // not highlighting tile 0 on the initial, click-less showDetail(0).
  let activeIndex = 0
  let selectedIndex = null
  let drawerOpen = false
  let drawerCloseTimer = null

  $: activeElement = ELEMENTS[activeIndex]
  $: activeFamily = FAMILIES.find((f) => f.id === activeElement.family)

  function openDrawer () {
    cancelDrawerClose()
    drawerOpen = true
  }

  function cancelDrawerClose () {
    if (drawerCloseTimer) {
      clearTimeout(drawerCloseTimer)
      drawerCloseTimer = null
    }
  }

  function scheduleDrawerClose () {
    if (drawerCloseTimer) clearTimeout(drawerCloseTimer)
    drawerCloseTimer = setTimeout(() => {
      drawerOpen = false
      drawerCloseTimer = null
    }, 5000)
  }

  function showDetail (index, fromClick) {
    activeIndex = index
    if (fromClick) selectedIndex = index
    openDrawer()
    // Arms the 5s auto-close unconditionally -- the tile/drawer
    // mouseenter/mouseleave handlers below only re-arm/cancel it for a
    // real mouse hovering the active tile or the drawer itself. On a
    // touch device there's no mouseleave after a tap, so without this
    // the timer never starts at all and the drawer stays open forever.
    scheduleDrawerClose()
  }

  // Same initial call the vanilla version made on DOMContentLoaded --
  // opens the drawer on element 0 without marking any tile "active".
  showDetail(0, false)
</script>

<div id="lang-legend" class="legend-row">
  {#each LANGUAGES as lang, i (lang.name)}
    <span
      class="legend-item"
      class:locked={lockedKey === lang.name}
      data-key={lang.name}
      role="button"
      tabindex="0"
      on:mouseenter={() => onLegendEnter(lang.name)}
      on:mouseleave={onLegendLeave}
      on:click={() => onLegendClick(lang.name)}
      on:keydown={(e) => onLegendKeydown(lang.name, e)}
    >
      <i style="background:{lang.color};color:{lang.color}"></i>{lang.name}
    </span>
    {#if (i + 1) % legendCols === 0 && i !== LANGUAGES.length - 1}
      <span class="legend-break"></span>
    {/if}
  {/each}
</div>

<div id="grid">
  {#each grouped as { family, items, mobileCols } (family.id)}
    <div class="family-block">
      <h3 style="color:{family.color}">{family.name}</h3>
      <div class="family-row" style="--mobile-cols:{mobileCols}">
        {#each items as el (el.index)}
          <button
            type="button"
            class="element tier-{el.tier}"
            class:active={el.index === selectedIndex}
            class:filter-highlight={filterKey && langMatches(el.lang, filterKey)}
            class:filter-muted={filterKey && !langMatches(el.lang, filterKey)}
            style="--card-color:{langColor(el.lang)};--fam-color:{family.color}"
            data-lang={el.lang}
            data-family={el.family}
            title={el.name}
            on:click={() => showDetail(el.index, true)}
            on:mouseenter={() => { if (el.index === activeIndex) cancelDrawerClose() }}
            on:mouseleave={() => { if (el.index === activeIndex) scheduleDrawerClose() }}
          >
            <span class="num">{el.num}</span>
            <span class="symbol">{el.symbol}</span>
            <span class="ename">{el.name}</span>
          </button>
        {/each}
      </div>
    </div>
  {/each}
</div>

<!--
  Not a control -- just a hover target that pauses the auto-close timer
  while a real mouse is over it (see scheduleDrawerClose above). There's
  no equivalent "pause" a keyboard/screen-reader user needs: the drawer
  always shows whatever was last clicked, and auto-close only hides it,
  it never discards anything.
-->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  id="detail"
  class:open={drawerOpen}
  style="--card-color:{langColor(activeElement.lang)};--fam-color:{activeFamily.color}"
  on:mouseenter={() => { if (activeIndex !== null) cancelDrawerClose() }}
  on:mouseleave={() => { if (activeIndex !== null) scheduleDrawerClose() }}
>
  <div class="detail-inner">
    <div class="detail-symbol">{activeElement.symbol}</div>
    <div class="detail-body">
      <h2>{activeElement.name} <span class="lang">{activeElement.lang}</span></h2>
      <p class="detail-blurb">{activeElement.blurb}</p>
      <p class="detail-text">{activeElement.detail}</p>
      <a class="detail-link" href={githubUrl(activeElement.repo)} target="_blank" rel="noopener">
        github.com/woodie/{activeElement.repo} &rarr;
      </a>
    </div>
  </div>
</div>
