# Blog post draft: AirPrint for a 2008 printer, from a Pi I already had

**Working title:** "One Command Made My 2008 Printer an AirPrint Printer"

**Audience:** anyone with an old network printer that still works fine but
won't show up when they tap Print on a phone.

**Hook:** My HP Color LaserJet CM2320nf is from 2008. It prints beautifully,
but my phone can't see it. The fix wasn't a new printer or a gadget -- it
was one command on the Raspberry Pi that already runs my scanner relay.

## 1. The printer that phones can't see

- An HP Color LaserJet CM2320nf MFP: networked, color, duplex, still going.
- What it doesn't speak is AirPrint, the protocol iPhones, iPads and Macs
  use to find printers on their own. So it never appears in the Print menu.
- Years ago I bought a fix for exactly this: a small Lantronix xPrintServer
  (Cloud Print Edition) that sat between the network and the printer.
  Google Cloud Print, half of what it was for, shut down at the end of 2020,
  and the box itself was dead when I dug it out of a drawer. Nothing to
  update, nothing to repair.

## 2. Finding things on the home network

- Before writing anything off, I wanted to know what was actually on the
  network. Two built-in macOS tools did most of it:
  - `dns-sd -B _ipp._tcp` lists anything advertising itself as a printer.
    Nothing showed up -- confirming the HP doesn't announce itself.
  - `arp -a` lists every device the Mac has seen, with its hardware (MAC)
    address.
- The first half of a MAC address identifies who made the network adapter.
  Looking those up turned an anonymous list into a map of the house: Apple
  (the router), Ring (the doorbell), Raspberry Pi (lambada's Pi), and
  Hewlett Packard at `10.0.1.210` -- the printer, already on the network.
- `curl -s http://10.0.1.210/ | grep -io '<title>[^<]*'` read the model
  name straight off the printer's own status page.

## 3. The Pi already had everything

- The Pi Zero-class board in the closet already runs lambada, which catches
  this same printer's scan-to-email and serves the scans on the home network
  (see the lambada post). Now the Pi would handle the other direction too.
- I expected a long install. Instead, a read-only check found CUPS (the
  Linux print system), Avahi (which announces services on the network, the
  way AirPrint expects) and HP's driver packages all already installed --
  they come with the full Raspberry Pi OS image.
- My last memory of CUPS was fighting its web admin page and its PAM login.
  None of that was needed: everything can be done from the command line over
  SSH.

## 4. The one decision that mattered: PostScript, not PCL

- HP ships two kinds of driver for this printer: PCL, where the computer
  draws every page as an image before sending it, and PostScript, where the
  printer does that work itself.
- On a slow ARMv6 board with under half a gigabyte of memory, that's the
  whole difference. With PostScript, the Pi only converts a PDF to
  PostScript -- light work -- and the printer's own processor does the rest.
- `sudo lpinfo -m | grep -i cm2320` listed HP's exact PostScript driver for
  the model, marked "(recommended)".

## 5. The one command

```
sudo lpadmin -p HP_CM2320nf -D "HP Color LaserJet CM2320nf" -E \
  -v socket://10.0.1.210:9100 \
  -m postscript-hp:0/ppd/hplip/HP/hp-color_laserjet_cm2320nf_mfp-ps.ppd \
  -o printer-is-shared=true
sudo cupsctl --share-printers
```

- `-v socket://10.0.1.210:9100` sends jobs to the printer's raw printing
  port; `-m` picks HP's PostScript driver; `printer-is-shared=true` plus
  `cupsctl --share-printers` makes CUPS share it, and Avahi announces it as
  an AirPrint printer.
- CUPS prints a warning that "printer drivers are deprecated" -- expected in
  CUPS 2.4; the driver works.
- Undo is just as short: `sudo lpadmin -x HP_CM2320nf` and
  `sudo cupsctl --no-share-printers`.
- Then: open a photo on the phone, Share, Print -- and the 2008 printer is
  right there.

## 6. The only fragile part

- The Pi reaches the printer by IP address, so if the router ever handed the
  printer a new one, printing would quietly stop.
- My router already had DHCP reservations for the printer and the Pi, so
  both keep their addresses. Worth checking on any setup like this.
- It only works at home, like lambada does. Printing from elsewhere would
  mean adding a private network such as Tailscale -- not needed so far.

## 7. Closing thought

- Same theme as lambada: perfectly good hardware ends up in a landfill
  because the software around it moved on. One CM2320nf, one Pi already in
  the closet: lambada handles scans coming out of the machine, CUPS handles
  pages going in, and a 2008 MFP works with a 2026 phone in both directions.
- CTA: before replacing an old network printer, check whether it speaks
  PostScript and whether there's a Pi in the house.
