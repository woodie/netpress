// netpress "periodic table" homepage -- one entry per project, grouped into
// families the way a real periodic table groups elements by shared
// properties. Each entry links to its real github.com/woodie/<repo>.

// GitHub's per-language colors (linguist) run invert(1) hue-rotate(180deg) --
// the classic light-to-dark-mode filter trick -- to get variants that read
// well against this page's near-black background. Any result that still
// landed too dark (below ~32% lightness) got lifted to a legible mid-tone.
// source hexes: https://github.com/ozh/github-colors (mirrors linguist's languages.yml)
export const LANGUAGES = [
  { name: 'Go', color: '#22d3ee' },
  { name: 'Kotlin', color: '#8b5de1' },
  { name: 'Java', color: '#bd7f26' },
  { name: 'JavaScript', color: '#ffb700' },
  { name: 'Ruby', color: '#fb7185' },
  { name: 'Swift', color: '#ff6e55' }
]

export const FAMILIES = [
  { id: 'apps', name: 'Apps', color: '#fbbf24' },
  { id: 'testing', name: 'Testing', color: '#22d3ee' },
  { id: 'infra', name: 'Infrastructure', color: '#a78bfa' },
  { id: 'libraries', name: 'Libraries', color: '#34d399' },
  { id: 'contrib', name: 'Contributions', color: '#fb7185' }
]

export const ELEMENTS = [

  // -- Apps -----------------------------------------------------------
  {
    symbol: 'Rk',
    name: 'Huck',
    repo: 'huck',
    family: 'apps',
    tier: 'highlight',
    lang: 'Kotlin',
    blurb: 'A Windows and macOS desktop client for scan servers.',
    detail:
      'The Kotlin partner to zouk, with a Windows installer and a signed, ' +
      'notarized macOS package. A real-world check on humane-kotlin; its ' +
      'tests drove kwick and use kotidy for their output.'
  },
  {
    symbol: 'Rs',
    name: 'Zouk',
    repo: 'zouk',
    family: 'apps',
    tier: 'highlight',
    lang: 'Swift',
    blurb: 'A macOS desktop client for scan servers.',
    detail:
      'The Swift partner to huck. A signed, notarized installer (brew ' +
      'install --cask zouk), so a non-technical family member can just ' +
      'double-click it. ' +
      'A real-world check on humane-swift, with test output from xctidy.'
  },
  {
    symbol: 'Nk',
    name: 'Next Caltrain Kotlin',
    repo: 'next-caltrain-kotlin',
    family: 'apps',
    tier: 'highlight',
    lang: 'Kotlin',
    blurb: 'Next Caltrain, for Android.',
    detail: 'The Android build of the Next Caltrain schedule app.'
  },
  {
    symbol: 'Ns',
    name: 'Next Caltrain Swift',
    repo: 'next-caltrain-swift',
    family: 'apps',
    tier: 'highlight',
    lang: 'Swift',
    blurb: 'Next Caltrain, for iOS.',
    detail: 'The iOS build of the same schedule app, native Swift.'
  },
  {
    symbol: 'Np',
    name: 'Next Caltrain PWA',
    repo: 'next-caltrain-pwa',
    family: 'apps',
    tier: 'standard',
    lang: 'JavaScript',
    blurb: 'Next Caltrain, as a PWA -- built for KaiOS feature phones.',
    detail:
      'A progressive web app version of the schedule, aimed squarely at ' +
      'KaiOS devices -- a third platform for the same one idea.'
  },
  {
    symbol: 'Nj',
    name: 'Next Caltrain J2ME',
    repo: 'next-caltrain-j2me',
    family: 'apps',
    tier: 'standard',
    lang: 'Java',
    blurb: 'A Caltrain schedule for J2ME feature phones -- pre-AI, pixel by pixel.',
    detail:
      'Hand-built UI for a J2ME MIDlet, back when "low-level" meant drawing ' +
      'your own layout on a tiny display buffer with no framework and no ' +
      'autocomplete to lean on. Kind of wild to look back on now.'
  },

  // -- Testing & Dev Tools ---------------------------------------------
  {
    symbol: 'Kw',
    name: 'kwick',
    repo: 'kwick',
    family: 'testing',
    tier: 'highlight',
    lang: 'Kotlin',
    blurb: 'Now Kotlin can have justBeforeEach like Swift.',
    detail:
      'Separate what varies (declared via ordinary beforeEach in each context) ' +
      'from the action under test (declared once, in the parent). Write tests ' +
      'with easy access to nested context.'
  },
  {
    symbol: 'Ex',
    name: 'expect',
    repo: 'expect',
    family: 'testing',
    tier: 'highlight',
    lang: 'Go',
    blurb: 'A generics-based matcher library for Go tests.',
    detail:
      'Type-safe assertion matchers for Go, built on generics rather than ' +
      'reflection or interface{} -- the same instinct behind the rest of ' +
      'this family: tests should read like plain sentences.'
  },
  {
    symbol: 'Kt',
    name: 'kotidy',
    repo: 'kotidy',
    family: 'testing',
    tier: 'highlight',
    lang: 'Kotlin',
    blurb: 'RSpec-style test output for Kotlin, via a real Gradle plugin.',
    detail:
      "Hooks Gradle's own TestListener API directly and renders a dense, " +
      'deduped describe/context/it tree -- four switchable styles ' +
      '(classic/fd/fs/fv). Published to the Gradle Plugin Portal.'
  },
  {
    symbol: 'Xt',
    name: 'xctidy',
    repo: 'xctidy',
    family: 'testing',
    tier: 'highlight',
    lang: 'Swift',
    blurb: 'RSpec-style test output for Swift, via xcodebuild or swift test.',
    detail:
      'Reformats raw xcodebuild test output into a nested, describe/context/it ' +
      "tree -- four switchable styles (classic/fd/fs/fv), matching kotidy's " +
      "and gorderly's exact flag surface."
  },
  {
    symbol: 'Gt',
    name: 'gorderly',
    repo: 'gorderly',
    family: 'testing',
    tier: 'highlight',
    lang: 'Go',
    blurb: 'RSpec-style output for go test, no external framework required.',
    detail:
      "Turns plain go test -v's own console output into a nested " +
      'describe/context/it tree -- four switchable styles (classic/fd/fs/fv).'
  },
  {
    symbol: 'Rt',
    name: 'rutidy',
    repo: 'rutidy',
    family: 'testing',
    tier: 'highlight',
    lang: 'Ruby',
    blurb: 'RSpec-style output for RSpec itself, via a real formatter.',
    detail:
      "Hooks RSpec's own example_group notifications to build a real " +
      'describe/context/it tree -- four switchable styles (classic/fd/fs/fv), ' +
      'same architecture as gorderly and kotidy.'
  },

  // -- Humane -------------------------------------------------------------
  {
    symbol: 'Hr',
    name: 'humane-ruby',
    repo: 'humane-ruby',
    family: 'libraries',
    tier: 'highlight',
    lang: 'Ruby',
    blurb: 'Finder-style file sizes and Rails-style relative dates, as a Ruby gem.',
    detail:
      'The same ActionView wording Rails apps already use, without pulling ' +
      'in all of Rails, plus file sizes that match Finder. Used by ' +
      'scandalous, with test output from rutidy.'
  },
  {
    symbol: 'Hg',
    name: 'humane-go',
    repo: 'humane',
    family: 'libraries',
    tier: 'highlight',
    lang: 'Go',
    blurb: 'Finder-style file sizes and Rails-style relative dates, in Go.',
    detail:
      'Ports ByteCountFormatter\'s rules, checked against real Finder output, ' +
      'plus ActionView\'s relative-date wording, past or future. Used by ' +
      'lambada, with tests written in expect.'
  },
  {
    symbol: 'Hs',
    name: 'humane-swift',
    repo: 'humane-swift',
    family: 'libraries',
    tier: 'highlight',
    lang: 'Swift',
    blurb: 'File sizes and relative dates the way macOS shows them, in Swift.',
    detail:
      'Sizes come straight from Apple\'s ByteCountFormatter, so they match ' +
      'Finder exactly ("4.1 MB"). Relative dates use Rails ActionView\'s ' +
      'wording ("about 3 hours ago") and handle the future too ("in 3 ' +
      'minutes"). The reference for the Go, Ruby and Kotlin versions; used ' +
      'by zouk.'
  },
  {
    symbol: 'Hk',
    name: 'humane-kotlin',
    repo: 'humane-kotlin',
    family: 'libraries',
    tier: 'highlight',
    lang: 'Kotlin',
    blurb: 'Finder-style file sizes and Rails-style relative dates, in Kotlin.',
    detail:
      'Same rules as the Swift original, with no platform formatter to lean ' +
      'on. Published on Maven Central; used by huck, and the proving ground ' +
      'for kwick and kotidy.'
  },

  // -- Infrastructure & Services ---------------------------------------
  {
    symbol: 'Sc',
    name: 'scandalous',
    repo: 'scandalous',
    family: 'infra',
    tier: 'highlight',
    lang: 'Ruby',
    blurb: 'A scan server for old scanners, in Ruby.',
    detail:
      'Hand-crafted in Ruby to do a simple task, and now where web ideas ' +
      'get tried first before moving to its partner, lambada. A ' +
      'real-world check on humane-ruby, with test output from rutidy.'
  },
  {
    symbol: 'La',
    name: 'lambada',
    repo: 'lambada',
    family: 'infra',
    tier: 'highlight',
    lang: 'Go',
    blurb: 'A scan server for old scanners, in Go.',
    detail:
      'Embraces web dev standards from Ruby, by way of its partner ' +
      'scandalous. A real-world check on humane-go, with tests written ' +
      'in expect.'
  },
  {
    symbol: 'Nr',
    name: 'nanoserver-ruby',
    repo: 'nanoserver-ruby',
    family: 'infra',
    tier: 'standard',
    lang: 'Ruby',
    blurb: 'Ruby, packaged on the much smaller Nano Server base image.',
    detail: "Ruby in a Windows container, on Microsoft's slimmer Nano Server base image."
  },
  {
    symbol: 'Db',
    name: 'dubious',
    repo: 'dubious',
    family: 'infra',
    tier: 'highlight',
    lang: 'Java',
    blurb: 'A starter framework for building Mirah apps on Google App Engine.',
    detail:
      'Rails-familiar conventions for building apps in Mirah, which ' +
      'compiles ahead-of-time with no runtime dependencies -- Mirah apps ' +
      'skip the JRuby-style initialization cost entirely.'
  },

  // -- Contributions -----------------------------------------------------
  {
    symbol: 'Tk',
    name: 'tenkit',
    repo: 'tenkit',
    family: 'contrib',
    tier: 'standard',
    lang: 'Ruby',
    blurb: "A wrapper for Apple's WeatherKit API in Ruby.",
    detail:
      'Ongoing work through Netpress -- recent enhancements to a Ruby ' +
      "wrapper around Apple's WeatherKit API."
  },
  {
    symbol: 'Cv',
    name: 'common-cartridge-viewer',
    repo: 'common-cartridge-viewer',
    family: 'contrib',
    tier: 'standard',
    lang: 'JavaScript',
    blurb: "Contributed to Instructure's Common Cartridge viewer.",
    detail:
      'A React app for viewing Common Cartridge course exports in the ' +
      'browser -- contributed to while building course-export tooling at ' +
      'the Chan Zuckerberg Initiative.'
  },
  {
    symbol: 'Gw',
    name: 'gollum-wiki-oauth',
    repo: 'gollum-wiki-oauth',
    family: 'contrib',
    tier: 'standard',
    lang: 'Ruby',
    blurb: 'Gollum wiki, fronted by Nginx and OAuth.',
    detail:
      'Packages the Gollum git-backed wiki with an Nginx front end and ' +
      "OAuth login, so it's not sitting open on the internet."
  },
  {
    symbol: 'Gb',
    name: 'geminabox-ldap',
    repo: 'geminabox-ldap',
    family: 'contrib',
    tier: 'standard',
    lang: 'Ruby',
    blurb: 'A private gem server with LDAP/AD authentication, in a container.',
    detail:
      'Geminabox ("a gem in a box") wrapped in a Docker image that adds ' +
      'LDAP/Active Directory auth for uploads -- built for real at a job ' +
      '(ShoreTel), published for anyone else who needs the same thing.'
  }
]
