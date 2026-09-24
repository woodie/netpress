#!/bin/sh

# app.yaml maps every URL straight to a file in public/ (static_files
# handlers, no dynamic backend) -- so a plain static file server serves
# it identically to how App Engine would. This used to shell out to the
# Cloud SDK's dev_appserver.py (the App Engine local emulator), which
# only ever mattered for apps with real dynamic handlers; for a static
# site it was doing nothing dev_appserver-specific, just serving files,
# and it stopped working once dev_appserver.py's Cloud SDK component
# went missing (per Woodie, 2026-09-23).

python3 -m http.server 8000 --directory public
