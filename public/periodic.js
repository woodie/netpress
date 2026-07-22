// netpress "periodic table" homepage -- one entry per project, grouped into
// families the way a real periodic table groups elements by shared
// properties. Each entry links to its real github.com/woodie/<repo>.
//
// tier: "highlight" (bigger, brighter, the ones with the best story),
//       "standard", or "minor" (smaller, dimmer -- still real, just quieter).

const FAMILIES = [
  { id: "apps", name: "Apps", color: "#fbbf24" },
  { id: "testing", name: "Testing & Dev Tools", color: "#22d3ee" },
  { id: "libraries", name: "Libraries", color: "#34d399" },
  { id: "infra", name: "Infrastructure & Services", color: "#a78bfa" },
  { id: "contrib", name: "Contributions", color: "#fb7185" },
];

const ELEMENTS = [

  // -- Apps -----------------------------------------------------------
  {
    symbol: "Zk",
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
    symbol: "Hc",
    name: "Huck",
    repo: "huck",
    family: "apps",
    tier: "highlight",
    lang: "Kotlin",
    blurb: "The desktop client for the lambada/scandalous scan system.",
    detail:
      "Pulls scanned pages down and files them locally -- the third piece " +
      "of the scan-server trio. Recently switched its own test output over " +
      "to kotidy.",
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
    symbol: "Cm",
    name: "Next Caltrain J2ME",
    repo: "Caltrain-Schedule-MIDlet",
    family: "apps",
    tier: "standard",
    lang: "Java (J2ME)",
    blurb: "A Caltrain schedule for J2ME feature phones -- pre-AI, pixel by pixel.",
    detail:
      "Hand-built UI for a J2ME MIDlet, back when \"low-level\" meant drawing " +
      "your own layout on a tiny display buffer with no framework and no " +
      "autocomplete to lean on. Kind of wild to look back on now.",
  },

  // -- Testing & Dev Tools ---------------------------------------------
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
      "(classic/fd/fs/fv). Published to the Gradle Plugin Portal. The " +
      "newest of the family, and the one this whole approach is named after.",
  },
  {
    symbol: "Xc",
    name: "xctidy",
    repo: "xctidy",
    family: "testing",
    tier: "highlight",
    lang: "Swift",
    blurb: "gorderly's idea, ported to xcodebuild output.",
    detail:
      "Reformats raw xcodebuild test output into the same nested, " +
      "RSpec-style tree as gorderly -- so a Swift project gets the same " +
      "readable test output as a Go one.",
  },
  {
    symbol: "Go",
    name: "gorderly",
    repo: "gorderly",
    family: "testing",
    tier: "highlight",
    lang: "Go",
    blurb: "The original -- RSpec-style output for go test.",
    detail:
      "Where the whole family started: nested, RSpec-doc-style output for " +
      "Go's own go test, with no external test framework required. " +
      "xctidy and kotidy both follow its lead.",
  },
  {
    symbol: "Gk",
    name: "ginkgo-fd",
    repo: "ginkgo-fd",
    family: "testing",
    tier: "highlight",
    lang: "Go",
    blurb: "A better output format for Ginkgo, Go's BDD test framework.",
    detail:
      "Ginkgo already does BDD-style specs for Go; this reformats its own " +
      "console output to read more like RSpec's -fd documentation format.",
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

  // -- Humane -------------------------------------------------------------
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
      "count -- modeled on Rails' ActionView helpers. The one the other " +
      "three ports measure themselves against.",
  },
  {
    symbol: "Hg",
    name: "humane-go",
    repo: "humane",
    family: "libraries",
    tier: "highlight",
    lang: "Go",
    blurb: "The Go port of humane-swift's formatting helpers.",
    detail: "Same human-readable sizes/dates idea, idiomatic Go this time.",
  },
  {
    symbol: "Hr",
    name: "humane-ruby",
    repo: "humane-ruby",
    family: "libraries",
    tier: "highlight",
    lang: "Ruby",
    blurb: "The Ruby port -- closest in spirit to the Rails helpers it copies.",
    detail:
      "Ruby gem version of the same formatting helpers, for projects that " +
      "want the ActionView-style wording without pulling in all of Rails.",
  },
  {
    symbol: "Hk",
    name: "humane-kotlin",
    repo: "humane-kotlin",
    family: "libraries",
    tier: "highlight",
    lang: "Kotlin",
    blurb: "The Kotlin port, and kotidy's own test subject.",
    detail:
      "Fourth language, same idea. Also doubles as the real-world proving " +
      "ground for kotidy's own describe/context/it tree renderer.",
  },

  // -- Infrastructure & Services ---------------------------------------
  {
    symbol: "Lb",
    name: "lambada",
    repo: "lambada",
    family: "infra",
    tier: "highlight",
    lang: "Go",
    blurb: "A scan server for old scanners.",
    detail:
      "Keeps aging scanner hardware useful by giving it a modern server " +
      "front end. First of a three-piece home system, alongside scandalous " +
      "and huck.",
  },
  {
    symbol: "Sc",
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
    lang: "Mirah",
    blurb: "Started solo at Google -- with other contributors.",
    detail:
      "This is s starter project for Mirah on App Engine. " +
      "Dubious provide a way to build apps in Mirah, with conventions " +
      "familiar to Rails developers. Mirah has no runtime dependencies, " +
      "everything is compiled ahead-of-time. Mirah apps have none of the " +
      "initialization costs associated with JRuby.",
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
    symbol: "Cc",
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
    symbol: "Gl",
    name: "geminabox-ldap",
    repo: "geminabox-ldap",
    family: "contrib",
    tier: "standard",
    lang: "Ruby / Docker",
    blurb: "A private gem server with LDAP/AD authentication, in a container.",
    detail:
      "Geminabox (\"a gem in a box\") wrapped in a Docker image that adds " +
      "LDAP/Active Directory auth for uploads -- built for real at a job " +
      "(ShoreTel), published for anyone else who needs the same thing.",
  },
];

function githubUrl(repo) {
  return `https://github.com/woodie/${repo}`;
}

function renderLegend() {
  const legend = document.getElementById("legend");
  legend.innerHTML = FAMILIES.map(
    (f) =>
      `<span class="legend-item"><i style="background:${f.color};color:${f.color}"></i>${f.name}</span>`
  ).join("");
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
          <button type="button" class="element tier-${el.tier}" style="--fam-color:${family.color}"
            data-index="${ELEMENTS.indexOf(el)}" title="${el.name}">
            <span class="num">${num}</span>
            <span class="symbol">${el.symbol}</span>
            <span class="ename">${el.name}</span>
          </button>`;
      })
      .join("");
    return `
      <div class="family-block">
        <h3 style="color:${family.color}">${family.name}</h3>
        <div class="family-row">${cells}</div>
      </div>`;
  }).join("");
  grid.innerHTML = blocks;

  grid.querySelectorAll(".element").forEach((btn) => {
    btn.addEventListener("click", () => showDetail(Number(btn.dataset.index), btn));
  });
}

function showDetail(index, btn) {
  document.querySelectorAll(".element.active").forEach((b) => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const el = ELEMENTS[index];
  const family = FAMILIES.find((f) => f.id === el.family);
  const panel = document.getElementById("detail");
  panel.style.setProperty("--fam-color", family.color);
  panel.innerHTML = `
    <div class="detail-symbol">${el.symbol}</div>
    <div class="detail-body">
      <h2>${el.name} <span class="lang">${el.lang}</span></h2>
      <p class="detail-blurb">${el.blurb}</p>
      <p class="detail-text">${el.detail}</p>
      <a class="detail-link" href="${githubUrl(el.repo)}" target="_blank" rel="noopener">
        github.com/woodie/${el.repo} &rarr;
      </a>
    </div>`;
  if (btn) panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

document.addEventListener("DOMContentLoaded", () => {
  renderLegend();
  renderGrid();
  showDetail(0, null);
});
