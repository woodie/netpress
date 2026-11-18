# How to Use Public Information in an Election

**Track:** Civic Tech

## Abstract

A voter's first question is "what's on my ballot?", and answering it takes one fact: the precinct for their address. Counties hold that answer, and campaigns and parties buy it from data vendors. Everyone else gets "here's everything in your ZIP code." This talk shows a precinct lookup for all 58 California counties, built only from data the counties publish themselves, running entirely in the browser. It ends with what any county can publish, often in minutes, to make the lookup exact.

## Detailed Description

It started with a cross-county voter guide for the Peninsula Democratic Coalition (San Mateo and Santa Clara Counties, November 2026). The guide needed each address's precinct. Census TIGER street ranges and the Statewide Database's voters by block got about three addresses in four, and the misses clustered where a precinct line runs behind houses or along long rural roads.

So I looked at what counties already publish, and it turned out to be a lot. Most California counties keep their precincts and address points as public map layers, nearly all on ArcGIS. Placing each address point on the county's precinct map and joining neighbors into street ranges answers about 99.9% of a county's own addresses. A few counties go further and publish street data, each address with the precinct the county assigns it, and those are a direct mapping. Some of the smallest counties lead: Inyo, with 18,000 people, and Tehama publish exactly that.

Every county's precincts become public eventually, through the Statewide Database after each election. A lookup is needed before an election, though, when precincts have already been redrawn. Publishing the current map is just being early with what's going public anyway.

The result is an open-source package, precinct-lookup, and a public demo. The data is a small file per ZIP code, the match happens in the browser, no voter data is used, and the address never leaves the device.

Outline:

1. The voter's question, and why it comes down to one fact: the precinct.
2. What every county already publishes, directly or through the Statewide Database.
3. Three ways to build a lookup from it: street data, address points, and parcels, with Census ranges filling gaps.
4. All 58 counties: a quick tour of who publishes what, sorted so a county can find its neighbors and its size.
5. Demo: address in, precinct out, in the browser.
6. How good is it, measured against each county's own addresses, and where the misses come from.
7. Privacy by design: no voter data, no server, and the address never leaves the browser.
8. The ask: publish current precincts and addresses as public layers, and street data where possible. Publishing once is less work than answering the same request every election.
9. Takeaway: do a little and get back a lot. One public layer can make a county's lookup exact for everyone.

## Why This Talk Matters

Knowing what's on your ballot shouldn't depend on who can afford a data vendor. California counties already publish most of what a precinct lookup needs, and the rest is often a sharing setting away. Showing that a statewide lookup works today, from public data alone, gives every election office a concrete, low-cost reason to publish current data, and gives newspapers, clubs and small parties a free tool to build on.

## References

- Dan Scollon, "Geographic Information Systems (GIS)," [TEDxRedding](https://www.youtube.com/watch?v=9V_Mz7NDy3o).
  A GIS educator at Shasta College makes the case for GIS to a general audience.

## Speaker Profile

**Name:** John Woodell

**Email:** woodie@netpress.com

**Company/Organization:** Sr. Software Engineer @ Netpress.com

**Bio:** John Woodell has years of experience building tools and apps across a variety of stacks, for startups and companies including Google and Twitter. He builds voter guides for Democratic clubs on the San Francisco Peninsula.

**Socials:** https://x.com/johnwoodell
