#!/usr/bin/env bash
# ============================================
# sync-env.sh — Push .env.local to Vercel
# ============================================
# Single source of truth: .env.local
# Usage: pnpm env:push
#
# This reads .env.local, strips comments and blank lines,
# removes each matching env var from Vercel, then re-adds it
# with the exact value (no trailing newlines).

set -euo pipefail

ENV_FILE=".env.local"
TARGET_ENV="${1:-production}"

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: $ENV_FILE not found"
  exit 1
fi

if ! command -v vercel &> /dev/null; then
  echo "Error: Vercel CLI not installed. Run: npm i -g vercel"
  exit 1
fi

echo "Syncing $ENV_FILE → Vercel ($TARGET_ENV)..."
echo ""

COUNT=0

while IFS= read -r line; do
  # Skip comments and blank lines
  [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue

  # Parse KEY=VALUE
  KEY="${line%%=*}"
  VALUE="${line#*=}"

  # Skip lines without =
  [[ "$KEY" == "$line" ]] && continue

  # Skip NEXTAUTH_URL (localhost-only)
  [[ "$KEY" == "NEXTAUTH_URL" ]] && continue

  # Trim whitespace
  KEY="$(echo -n "$KEY" | xargs)"
  VALUE="$(echo -n "$VALUE" | xargs)"

  # Skip placeholder values
  [[ "$VALUE" == "change-me" || "$VALUE" == "change-me-generate-with-openssl-rand-base64-32" ]] && continue

  echo "  → $KEY"

  # Remove existing (suppress errors if it doesn't exist)
  vercel env rm "$KEY" "$TARGET_ENV" --yes 2>/dev/null || true

  # Add with exact value via printf (no trailing newline)
  printf '%s' "$VALUE" | vercel env add "$KEY" "$TARGET_ENV" 2>/dev/null

  COUNT=$((COUNT + 1))
done < "$ENV_FILE"

echo ""
echo "Synced $COUNT variables to Vercel ($TARGET_ENV)."
echo ""
echo "Now redeploy with: pnpm deploy:prod"
