// netpress "periodic table" homepage -- one entry per project, grouped into
// families the way a real periodic table groups elements by shared
// properties. Each entry links to its real github.com/woodie/<repo>.

// GitHub's per-language colors (linguist) run invert(1) hue-rotate(180deg) --
// the classic light-to-dark-mode filter trick -- to get variants that read
// well against this page's near-black background. Any result that still
// landed too dark (below ~32% lightness) got lifted to a legible mid-tone.
// source hexes: https://github.com/ozh/github-colors (mirrors linguist's languages.yml)
const LANGUAGES = [
  { name: "Ruby", color: "#fb7185" },
  { name: "Go", color: "#22d3ee" },
  { name: "Swift", color: "#ff6e55" },
  { name: "Kotlin", color: "#8b5de1" },
  { name: "JavaScript", color: "#ffb700" },
  { name: "Java", color: "#bd7f26" },
  { name: "Docker", color: "#a5bac1" },
];

const FAMILIES = [
  { id: "apps", name: "Apps", color: "#fbbf24" },
  { id: "testing", name: "Testing", color: "#22d3ee" },
  { id: "infra", name: "Infrastructure", color: "#a78bfa" },
  { id: "libraries", name: "Libraries", color: "#34d399" },
  { id: "contrib", name: "Contributions", color: "#fb7185" },
];

const ELEMENTS = [

  // -- Apps -----------------------------------------------------------
  {
    symbol: "Rk",
    name: "Huck",
    repo: "huck",
    family: "apps",
    tier: "highlight",
    lang: "Kotlin",
    blurb: "The desktop client for the lambada/scandalous scan system.",
    detail:
      "Pulls scanned pages down and files them locally -- one piece of " +
      "the scan-server trio, alongside lambada and scandalous. Uses kotidy " +
      "for its own test output.",
  },
  {
    symbol: "Rs",
    name: "Zouk",
    repo: "zouk",
    family: "apps",
    tier: "highlight",
    lang: "Swift",
    blurb: "A signed, notarized macOS app -- brew install --cask zouk.",
    detail:
      "Built partly so a non-technical family member could just double-click " +
      "it: real Developer ID signing and Apple notarization in CI, no " +
      "Gatekeeper warning, no Xcode required on their end.",
  },
  {
    symbol: "Nk",
    name: "Next Caltrain Kotlin",
    repo: "next-caltrain-kotlin",
    family: "apps",
    tier: "highlight",
    lang: "Kotlin",
    blurb: "Next Caltrain, for Android.",
    detail: "The Android build of the Next Caltrain schedule app.",
  },
  {
    symbol: "Ns",
    name: "Next Caltrain Swift",
    repo: "next-caltrain-swift",
    family: "apps",
    tier: "highlight",
    lang: "Swift",
    blurb: "Next Caltrain, for iOS.",
    detail: "The iOS build of the same schedule app, native Swift.",
  },
  {
    symbol: "Np",
    name: "Next Caltrain PWA",
    repo: "next-caltrain-pwa",
    family: "apps",
    tier: "standard",
    lang: "JavaScript",
    blurb: "Next Caltrain, as a PWA -- built for KaiOS feature phones.",
    detail:
      "A progressive web app version of the schedule, aimed squarely at " +
      "KaiOS devices -- a third platform for the same one idea.",
  },
  {
    symbol: "Nj",
    name: "Next Caltrain J2ME",
    repo: "next-caltrain-j2me",
    family: "apps",
    tier: "standard",
    lang: "Java",
    blurb: "A Caltrain schedule for J2ME feature phones -- pre-AI, pixel by pixel.",
    detail:
      "Hand-built UI for a J2ME MIDlet, back when \"low-level\" meant drawing " +
      "your own layout on a tiny display buffer with no framework and no " +
      "autocomplete to lean on. Kind of wild to look back on now.",
  },

  // -- Testing & Dev Tools ---------------------------------------------
  {
    symbol: "Kw",
    name: "kwick",
    repo: "kwick",
    family: "testing",
    tier: "highlight",
    lang: "Kotlin",
    blurb: "Now Kotlin can have justBeforeEach like Swift.",
    detail:
      "Separate what varies (declared via ordinary beforeEach in each context) " +
      "from the action under test (declared once, in the parent). Write tests " +
      "with easy access to nested context.",
  },
  {
    symbol: "Ex",
    name: "expect",
    repo: "expect",
    family: "testing",
    tier: "highlight",
    lang: "Go",
    blurb: "A generics-based matcher library for Go tests.",
    detail:
      "Type-safe assertion matchers for Go, built on generics rather than " +
      "reflection or interface{} -- the same instinct behind the rest of " +
      "this family: tests should read like plain sentences.",
  },
  {
    symbol: "Kt",
    name: "kotidy",
    repo: "kotidy",
    family: "testing",
    tier: "highlight",
    lang: "Kotlin",
    blurb: "RSpec-style test output for Kotlin, via a real Gradle plugin.",
    detail:
      "Hooks Gradle's own TestListener API directly and renders a dense, " +
      "deduped describe/context/it tree -- four switchable styles " +
      "(classic/fd/fs/fv). Published to the Gradle Plugin Portal.",
  },
  {
    symbol: "Xt",
    name: "xctidy",
    repo: "xctidy",
    family: "testing",
    tier: "highlight",
    lang: "Swift",
    blurb: "RSpec-style test output for Xcode, via xcodebuild.",
    detail:
      "Reformats raw xcodebuild test output into a nested, describe/context/it " +
      "tree -- four switchable styles (classic/fd/fs/fv), matching kotidy's " +
      "and gorderly's exact flag surface.",
  },
  {
    symbol: "Gt",
    name: "gorderly",
    repo: "gorderly",
    family: "testing",
    tier: "highlight",
    lang: "Go",
    blurb: "RSpec-style output for go test, no external framework required.",
    detail:
      "Turns plain go test -v's own console output into a nested " +
      "describe/context/it tree -- four switchable styles (classic/fd/fs/fv).",
  },
  {
    symbol: "Rt",
    name: "rutidy",
    repo: "rutidy",
    family: "testing",
    tier: "highlight",
    lang: "Ruby",
    blurb: "RSpec-style output for RSpec itself, via a real formatter.",
    detail:
      "Hooks RSpec's own example_group notifications to build a real " +
      "describe/context/it tree -- four switchable styles (classic/fd/fs/fv), " +
      "same architecture as gorderly and kotidy.",
  },

  // -- Humane -------------------------------------------------------------
  {
    symbol: "Hr",
    name: "humane-ruby",
    repo: "humane-ruby",
    family: "libraries",
    tier: "highlight",
    lang: "Ruby",
    blurb: "Human-readable file sizes and relative dates, packaged as a Ruby gem.",
    detail:
      "\"3 minutes ago\" instead of a timestamp, \"1.5 MB\" instead of a byte " +
      "count -- the same ActionView-style wording Rails apps already expect, " +
      "without pulling in all of Rails.",
  },
  {
    symbol: "Hg",
    name: "humane-go",
    repo: "humane",
    family: "libraries",
    tier: "highlight",
    lang: "Go",
    blurb: "Human-readable file sizes and relative dates, in idiomatic Go.",
    detail: "Same human-readable sizes/dates idea, in idiomatic Go.",
  },
  {
    symbol: "Hs",
    name: "humane-swift",
    repo: "humane-swift",
    family: "libraries",
    tier: "highlight",
    lang: "Swift",
    blurb: "Human-readable file sizes and relative dates, natively in Swift.",
    detail:
      "\"3 minutes ago\" instead of a timestamp, \"1.5 MB\" instead of a byte " +
      "count -- modeled on Rails' ActionView helpers.",
  },
  {
    symbol: "Hk",
    name: "humane-kotlin",
    repo: "humane-kotlin",
    family: "libraries",
    tier: "highlight",
    lang: "Kotlin",
    blurb: "Human-readable file sizes and relative dates, in Kotlin.",
    detail:
      "Same human-readable sizes/dates idea, in Kotlin. Also doubles as " +
      "the real-world proving ground for kotidy's own describe/context/it " +
      "tree renderer.",
  },

  // -- Infrastructure & Services ---------------------------------------
  {
    symbol: "Sc ",
    name: "scandalous",
    repo: "scandalous",
    family: "infra",
    tier: "highlight",
    lang: "Ruby",
    blurb: "A mail agent and attachment server, for the same old scanners.",
    detail:
      "Takes what lambada scans and gets it into an inbox as an attachment " +
      "-- the delivery half of the same scanner-rescue system.",
  },
  {
    symbol: "La",
    name: "lambada",
    repo: "lambada",
    family: "infra",
    tier: "highlight",
    lang: "Go",
    blurb: "A scan server for old scanners.",
    detail:
      "Keeps aging scanner hardware useful by giving it a modern server " +
      "front end. One piece of a three-piece home scan system, alongside " +
      "scandalous and huck.",
  },
  {
    symbol: "Nr",
    name: "nanoserver-ruby",
    repo: "nanoserver-ruby",
    family: "infra",
    tier: "standard",
    lang: "Docker",
    blurb: "Ruby, packaged on the much smaller Nano Server base image.",
    detail: "Same idea as windowsservercore-ruby, on Microsoft's slimmer nanoserver base.",
  },
  {
    symbol: "Db",
    name: "dubious",
    repo: "dubious",
    family: "infra",
    tier: "highlight",
    lang: "Java",
    blurb: "A starter framework for building Mirah apps on Google App Engine.",
    detail:
      "Rails-familiar conventions for building apps in Mirah, which " +
      "compiles ahead-of-time with no runtime dependencies -- Mirah apps " +
      "skip the JRuby-style initialization cost entirely.",
  },

  // -- Contributions -----------------------------------------------------
  {
    symbol: "Tk",
    name: "tenkit",
    repo: "tenkit",
    family: "contrib",
    tier: "standard",
    lang: "Ruby",
    blurb: "A wrapper for Apple's WeatherKit API in Ruby.",
    detail:
      "Ongoing work through Netpress -- recent enhancements to a Ruby " +
      "wrapper around Apple's WeatherKit API.",
  },
  {
    symbol: "Cv",
    name: "common-cartridge-viewer",
    repo: "common-cartridge-viewer",
    family: "contrib",
    tier: "standard",
    lang: "JavaScript",
    blurb: "Contributed to Instructure's Common Cartridge viewer.",
    detail:
      "A React app for viewing Common Cartridge course exports in the " +
      "browser -- contributed to while building course-export tooling at " +
      "the Chan Zuckerberg Initiative.",
  },
  {
    symbol: "Gw",
    name: "gollum-wiki-oauth",
    repo: "gollum-wiki-oauth",
    family: "contrib",
    tier: "standard",
    lang: "Ruby",
    blurb: "Gollum wiki, fronted by Nginx and OAuth.",
    detail:
      "Packages the Gollum git-backed wiki with an Nginx front end and " +
      "OAuth login, so it's not sitting open on the internet.",
  },
  {
    symbol: "Gb",
    name: "geminabox-ldap",
    repo: "geminabox-ldap",
    family: "contrib",
    tier: "standard",
    lang: "Docker",
    blurb: "A private gem server with LDAP/AD authentication, in a container.",
    detail:
      "Geminabox (\"a gem in a box\") wrapped in a Docker image that adds " +
      "LDAP/Active Directory auth for uploads -- built for real at a job " +
      "(ShoreTel), published for anyone else who needs the same thing.",
  },
];

// Picks a mobile grid column count that splits a family's tiles as evenly
// as possible across rows, instead of always using a fixed 3 (which leaves
// an awkward lone tile on its own row for any count where n mod 3 == 1,
// e.g. 4 -> 3+1 or 7 -> 3+3+1). Capped at 3 columns since that's about as
// wide as a single tile+label reads comfortably on a phone.
function balancedCols(n, maxCols = 3) {
  if (n <= maxCols) return n;
  const rows = Math.ceil(n / maxCols);
  return Math.ceil(n / rows);
}

function githubUrl(repo) {
  return `https://github.com/woodie/${repo}`;
}

function langColor(lang) {
  const fallback = "#8ecae6";
  if (!lang) return fallback;
  const exact = LANGUAGES.find((l) => l.name === lang);
  if (exact) return exact.color;
  // compound entries like "Ruby / Docker" -- match on the first language
  const first = lang.split("/")[0].trim();
  const partial = LANGUAGES.find((l) => l.name === first);
  return partial ? partial.color : fallback;
}

// Inserts a forced line-break after every `cols`-th item -- a zero-height,
// flex-basis:100% spacer that only does anything under the mobile
// @media block (see periodic.css's .legend-break), so desktop's single
// wide line is unaffected. Unlike the periodic-table tiles, legend items
// are variable-width text, so a fixed-column grid would either clip long
// labels ("JavaScript") or leave odd gaps next to short ones ("Go") --
// forcing a break inside the existing flex-wrap row keeps each item's
// natural width while still balancing exactly `cols` per line.
function withBreaks(items, cols) {
  const out = [];
  items.forEach((html, i) => {
    out.push(html);
    if ((i + 1) % cols === 0 && i !== items.length - 1) {
      out.push('<span class="legend-break"></span>');
    }
  });
  return out.join("");
}

function renderLegend() {
  const langLegend = document.getElementById("lang-legend");
  const langItems = LANGUAGES.map(
    (l) =>
      `<span class="legend-item" data-key="${l.name}"><i style="background:${l.color};color:${l.color}"></i>${l.name}</span>`
  );
  langLegend.innerHTML = withBreaks(langItems, balancedCols(LANGUAGES.length, 4));

  wireLegend("lang-legend", (key) => (el) => langMatches(el.dataset.lang, key));
}

// -- legend hover/click filtering ------------------------------------------
// Hovering a legend entry (language or family) highlights matching cells
// and mutes the rest. Clicking locks that state in place for 5s, then it
// clears itself and everything returns to normal.

let filterLockTimer = null;

function langMatches(elLang, lang) {
  if (!elLang) return false;
  if (elLang === lang) return true;
  return elLang.split("/").map((s) => s.trim()).includes(lang);
}

function applyFilter(matchFn) {
  document.querySelectorAll(".element").forEach((el) => {
    const match = matchFn(el);
    el.classList.toggle("filter-highlight", match);
    el.classList.toggle("filter-muted", !match);
  });
}

function clearFilter() {
  document.querySelectorAll(".element").forEach((el) => {
    el.classList.remove("filter-highlight", "filter-muted");
  });
  document.querySelectorAll(".legend-item.locked").forEach((li) => li.classList.remove("locked"));
}

function wireLegend(containerId, matchFnFor) {
  const items = document.querySelectorAll(`#${containerId} .legend-item`);
  items.forEach((item) => {
    const matchFn = matchFnFor(item.dataset.key);

    item.addEventListener("mouseenter", () => {
      if (!filterLockTimer) applyFilter(matchFn);
    });

    item.addEventListener("mouseleave", () => {
      if (!filterLockTimer) clearFilter();
    });

    item.addEventListener("click", () => {
      if (filterLockTimer) clearTimeout(filterLockTimer);
      applyFilter(matchFn);
      document
        .querySelectorAll(".legend-item")
        .forEach((li) => li.classList.toggle("locked", li === item));
      filterLockTimer = setTimeout(() => {
        clearFilter();
        filterLockTimer = null;
      }, 5000);
    });
  });
}

function renderGrid() {
  const grid = document.getElementById("grid");
  let num = 0;
  const blocks = FAMILIES.map((family) => {
    const items = ELEMENTS.filter((e) => e.family === family.id);
    const cells = items
      .map((el) => {
        num += 1;
        return `
          <button type="button" class="element tier-${el.tier}"
            style="--card-color:${langColor(el.lang)};--fam-color:${family.color}"
            data-index="${ELEMENTS.indexOf(el)}" data-lang="${el.lang}" data-family="${el.family}"
            title="${el.name}">
            <span class="num">${num}</span>
            <span class="symbol">${el.symbol}</span>
            <span class="ename">${el.name}</span>
          </button>`;
      })
      .join("");
    const mobileCols = balancedCols(items.length);
    return `
      <div class="family-block">
        <h3 style="color:${family.color}">${family.name}</h3>
        <div class="family-row" style="--mobile-cols:${mobileCols}">${cells}</div>
      </div>`;
  }).join("");
  grid.innerHTML = blocks;

  grid.querySelectorAll(".element").forEach((btn) => {
    btn.addEventListener("click", () => showDetail(Number(btn.dataset.index), btn));

    // hovering the currently-open card pauses the auto-close countdown --
    // it never opens the drawer itself (see cancelDrawerClose() below).
    btn.addEventListener("mouseenter", () => {
      if (Number(btn.dataset.index) === activeIndex) cancelDrawerClose();
    });
    btn.addEventListener("mouseleave", () => {
      if (Number(btn.dataset.index) === activeIndex) scheduleDrawerClose();
    });
  });
}

// -- detail drawer -----------------------------------------------------
// Pinned to the bottom of the window. Opens only on click/selection
// (showDetail()) and always auto-closes 5s later, unless a real mouse is
// hovering the selected card or the drawer itself, in which case hovering
// just pauses that countdown (cancelDrawerClose()) -- it never reopens an
// already-closed drawer the way calling openDrawer() from a hover used to.

let activeIndex = null;
let drawerCloseTimer = null;

function openDrawer() {
  cancelDrawerClose();
  document.getElementById("detail").classList.add("open");
}

function cancelDrawerClose() {
  if (drawerCloseTimer) {
    clearTimeout(drawerCloseTimer);
    drawerCloseTimer = null;
  }
}

function scheduleDrawerClose() {
  if (drawerCloseTimer) clearTimeout(drawerCloseTimer);
  drawerCloseTimer = setTimeout(() => {
    document.getElementById("detail").classList.remove("open");
    drawerCloseTimer = null;
  }, 5000);
}

function wireDrawer() {
  const panel = document.getElementById("detail");
  panel.addEventListener("mouseenter", () => {
    if (activeIndex !== null) cancelDrawerClose();
  });
  panel.addEventListener("mouseleave", () => {
    if (activeIndex !== null) scheduleDrawerClose();
  });
}

function showDetail(index, btn) {
  activeIndex = index;
  document.querySelectorAll(".element.active").forEach((b) => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const el = ELEMENTS[index];
  const family = FAMILIES.find((f) => f.id === el.family);
  const panel = document.getElementById("detail");
  panel.style.setProperty("--card-color", langColor(el.lang));
  panel.style.setProperty("--fam-color", family.color);
  panel.innerHTML = `
    <div class="detail-inner">
      <div class="detail-symbol">${el.symbol}</div>
      <div class="detail-body">
        <h2>${el.name} <span class="lang">${el.lang}</span></h2>
        <p class="detail-blurb">${el.blurb}</p>
        <p class="detail-text">${el.detail}</p>
        <a class="detail-link" href="${githubUrl(el.repo)}" target="_blank" rel="noopener">
          github.com/woodie/${el.repo} &rarr;
        </a>
      </div>
    </div>`;
  openDrawer();
  // Arms the 5s auto-close unconditionally -- the mouseenter/mouseleave
  // wiring below only re-arms/cancels it for a real mouse hovering the
  // active tile or the drawer itself. On a touch device there's no
  // mouseleave after a tap, so without this the timer never started at
  // all and the drawer stayed open indefinitely.
  scheduleDrawerClose();
}

document.addEventListener("DOMContentLoaded", () => {
  renderLegend();
  renderGrid();
  wireDrawer();
  showDetail(0, null);
});
