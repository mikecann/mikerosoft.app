#!/usr/bin/env bash
# Prepares a Codex worktree for the mikerosoft.app website.

set -euo pipefail

if [[ -n "${CODEX_WORKTREE_PATH:-}" ]]; then
  REPO_ROOT="$CODEX_WORKTREE_PATH"
else
  REPO_ROOT="$(git rev-parse --show-toplevel)"
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "Codex setup: missing required command: npm" >&2
  exit 1
fi

echo "Codex setup: installing website dependencies..."
(cd "$REPO_ROOT" && npm ci --no-audit --no-fund)
echo "Codex setup: ready."
