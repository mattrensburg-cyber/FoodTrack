$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $repoRoot

try {
  git rev-parse --is-inside-work-tree *> $null
} catch {
  Write-Host "Not inside a Git repository. Skipping sync."
  exit 0
}

$gitDir = (git rev-parse --git-dir).Trim()
$blockedStates = @(
  "MERGE_HEAD",
  "rebase-merge",
  "rebase-apply",
  "CHERRY_PICK_HEAD",
  "REVERT_HEAD"
)

foreach ($state in $blockedStates) {
  if (Test-Path (Join-Path $gitDir $state)) {
    Write-Host "Git operation already in progress. Skipping sync."
    exit 0
  }
}

$branch = (git rev-parse --abbrev-ref HEAD).Trim()
if ($branch -eq "HEAD") {
  Write-Host "Detached HEAD. Fetched only."
  git fetch --prune origin
  exit 0
}

git fetch --prune origin

$status = git status --porcelain
if ($status) {
  Write-Host "Local changes found. Fetched only; pull skipped to avoid conflicts."
  exit 0
}

git pull --ff-only origin $branch
Write-Host "Safe Git sync complete."
