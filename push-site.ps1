param(
  [string]$Message = ""
)

$ErrorActionPreference = "Stop"
$repo = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $repo

function Invoke-Git {
  param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$GitArgs
  )

  & git @GitArgs
  if ($LASTEXITCODE -ne 0) {
    throw "git $($GitArgs -join ' ') failed with exit code $LASTEXITCODE"
  }
}

$branch = (& git rev-parse --abbrev-ref HEAD).Trim()
if ($LASTEXITCODE -ne 0) {
  throw "Could not read the current Git branch."
}
if ($branch -ne "main") {
  throw "Refusing to push branch '$branch'. Switch to main first."
}

Invoke-Git add -A
$status = & git status --porcelain
if ($LASTEXITCODE -ne 0) {
  throw "Could not read Git status."
}
$hasChanges = -not [string]::IsNullOrWhiteSpace(($status -join "`n"))

if ($hasChanges) {
  if ([string]::IsNullOrWhiteSpace($Message)) {
    $Message = "Update J MEDIA site $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
  }

  $oldSkip = $env:JMEDIA_SKIP_AUTO_PUSH
  try {
    $env:JMEDIA_SKIP_AUTO_PUSH = "1"
    Invoke-Git commit -m $Message
  } finally {
    $env:JMEDIA_SKIP_AUTO_PUSH = $oldSkip
  }
} else {
  Write-Host "No local changes to commit."
}

Invoke-Git push origin main
Write-Host "Live site: https://jmedia-creative-clone.pages.dev/"
