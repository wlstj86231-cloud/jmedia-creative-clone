param(
  [string]$Message = ""
)

$ErrorActionPreference = "Stop"
$repo = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $repo

$branch = (git rev-parse --abbrev-ref HEAD).Trim()
if ($branch -ne "main") {
  throw "Refusing to push branch '$branch'. Switch to main first."
}

git add -A
$hasChanges = (git status --porcelain) -ne $null

if ($hasChanges) {
  if ([string]::IsNullOrWhiteSpace($Message)) {
    $Message = "Update J MEDIA site $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
  }

  $oldSkip = $env:JMEDIA_SKIP_AUTO_PUSH
  try {
    $env:JMEDIA_SKIP_AUTO_PUSH = "1"
    git commit -m $Message
  } finally {
    $env:JMEDIA_SKIP_AUTO_PUSH = $oldSkip
  }
} else {
  Write-Host "No local changes to commit."
}

git push origin main
Write-Host "Live site: https://jmedia-creative-clone.pages.dev/"
