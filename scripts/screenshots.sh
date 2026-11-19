#!/bin/bash
# Takes a screenshot of each project's homepage into public/screenshots/.
# Usage: npm run screenshots
# Names must match the `image` field in src/data/projects.ts.
set -euo pipefail

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/screenshots"
mkdir -p "$OUT"

shoot() {
  local name="$1" url="$2"
  echo "→ $name  $url"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --window-size=1280,800 --virtual-time-budget=8000 \
    --screenshot="$OUT/$name.png" "$url" >/dev/null 2>&1
}

shoot nexus-eam   https://nexus-eam.vercel.app
shoot nexus-ad    https://nexus-ad.vercel.app
shoot tennis      https://tennis-counter-six.vercel.app
shoot nexus-ppm   https://myapp-ochre-nu.vercel.app
shoot iot         https://nexus-iot-neon.vercel.app

ls -l "$OUT"
