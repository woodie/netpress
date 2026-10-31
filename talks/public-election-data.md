# How to Use Public Information in an Election

**Track:** Civic Tech

## Abstract

A voter's first question is "what's on my ballot?", and answering it takes one fact: the precinct for their address. Counties hold that answer, and campaigns and parties buy it from data vendors; everyone else gets "here's everything in your ZIP code." This talk shows that anyone can build the address-to-precinct match today from public data alone, without ever collecting a voter's address, and makes the case for county governments to step up and make it easier and more accurate.

## Detailed Description

Building a cross-county voter guide for the Peninsula Democratic Coalition (San Mateo and Santa Clara Counties, November 2026), I needed precincts for Santa Clara addresses. The county's voter data staff pointed me to its "Look Up Your Districts" page, which is already approved for public use and shows a voter's precinct. But it's a page for people, not programs: a voter guide could only send voters there to copy a precinct number and come back, and it wasn't clear who could approve an API for it. I was shown a page for requesting an API key, but the details never arrived.

So I looked at what's already public. Two sources were enough: Census TIGER street address ranges, which give the house numbers on each side of every street segment, and UC Berkeley's Statewide Database, which counts registered voters by Census block and precinct. Each side of a street gets the precinct of the block it faces.

Checked against San Mateo's existing street ranges, the public-data ranges answer about three addresses in four, and the endorsed ballot they show is right about 99.8% of the time. The misses cluster where a precinct line runs behind houses through the middle of a block, and on long rural roads. Addresses without a range fall back to the ZIP code.

The guide does the whole match in the browser: no server, no stored addresses, nothing for anyone to leak.

Outline:

1. The voter's question, and why it comes down to one fact: the precinct.
2. Who has the answer today: the county, and whoever can pay a data vendor.
3. What we found along the way: the county's district lookup works for a person at a keyboard, not for a guide, and there's no clear path to an API.
4. What's already public: Census address ranges and Statewide Database block counts. No names, no voter file.
5. Building it: each side of a street gets its block's precinct. Demo: address in, precinct out, in the browser.
6. How good is it: measured against San Mateo's existing street ranges, with a look at the wrong answers and why most don't change the ballot.
7. Privacy by design: a static site where the address never leaves the browser.
8. The ask: counties already hold the exact answer. Publishing address points with a precinct column, or street ranges, is an easy button for every newspaper, club and small party.
9. Takeaway: we can do this today with public data; counties can make it easier and more accurate for everyone.

## Why This Talk Matters

Knowing what's on your ballot shouldn't depend on who can afford a data vendor. Every California county already reports precinct data to the Statewide Database after each statewide election, and the Census publishes street ranges nationwide, so anyone can build this for any county today. Counties hold the exact answer, though, and could publish it with little effort. Showing that the public path works, and where it falls short, gives election offices a concrete reason to step up and publish the exact data.

## Speaker Profile

**Name:** John Woodell

**Email:** woodie@netpress.com

**Company/Organization:** Sr. Software Engineer @ Netpress.com

**Bio:** John Woodell has years of experience building tools and apps across a variety of stacks, for startups and companies including Google and Twitter. He builds voter guides for Democratic clubs on the San Francisco Peninsula.

**Socials:** https://x.com/johnwoodell
