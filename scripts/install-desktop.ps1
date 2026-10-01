[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)][string] $PackagePath,
    [string] $DshCommand,
    [string] $DshHome
)

$ErrorActionPreference = 'Stop'
if (-not $DshCommand) {
    $candidate = Get-Command dsh.cmd -ErrorAction SilentlyContinue
    if (-not $candidate) { throw 'Pass -DshCommand with the Desktop resources/runtime/cli/bin/dsh.cmd path.' }
    $DshCommand = $candidate.Source
}
$dshCli = (Resolve-Path -LiteralPath $DshCommand).Path
if (-not $DshHome) {
    $DshHome = if ($env:DSH_HOME) { $env:DSH_HOME } else { Join-Path $env:USERPROFILE '.dsh' }
}
$installHome = [IO.Path]::GetFullPath($DshHome)
$package = (Resolve-Path -LiteralPath $PackagePath).Path
$packageName = [IO.Path]::GetFileName($package)
if ($packageName -notmatch '^dsh-wsl-native-(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)\.tgz$') {
    throw 'Expected a versioned dsh-wsl-native-<version>.tgz release package.'
}
$expectedVersion = $Matches[1]
$profileDir = Join-Path $installHome 'profiles/desktop'
$profileManifest = Join-Path $profileDir 'package.json'
if (-not (Test-Path -LiteralPath $profileManifest -PathType Leaf)) {
    throw "Desktop profile not found: $profileManifest. Open DSH Desktop once or set -DshHome."
}
$before = Get-Content -LiteralPath $profileManifest -Raw -Encoding UTF8 | ConvertFrom-Json
$backupDir = Join-Path $installHome ('backups/dsh-wsl-native/install-' + (Get-Date -Format 'yyyyMMdd-HHmmss-fff'))
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
foreach ($name in @('package.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml', 'cordis.yml', 'cordis.patch.yml')) {
    $source = Join-Path $profileDir $name
    if (Test-Path -LiteralPath $source -PathType Leaf) { Copy-Item -LiteralPath $source -Destination (Join-Path $backupDir $name) }
}

$sourceHash = (Get-FileHash -LiteralPath $package -Algorithm SHA256).Hash
$packageDir = Join-Path $installHome ('dsh-wsl-native/packages/' + $sourceHash.Substring(0, 16).ToLowerInvariant())
New-Item -ItemType Directory -Path $packageDir -Force | Out-Null
$stablePackage = Join-Path $packageDir $packageName
if (Test-Path -LiteralPath $stablePackage) {
    if ((Get-FileHash -LiteralPath $stablePackage -Algorithm SHA256).Hash -ne $sourceHash) {
        throw "A different package with the same version already exists at $stablePackage. Use a new release version."
    }
} else {
    Copy-Item -LiteralPath $package -Destination $stablePackage
}
Write-Host "Desktop CLI: $dshCli"
Write-Host "Configuration backup: $backupDir"
Write-Host "Package SHA256: $sourceHash"
$previousDshHome = $env:DSH_HOME
try {
    $env:DSH_HOME = $installHome
    & $dshCli plugin --profile desktop add $stablePackage
    if ($LASTEXITCODE -ne 0) { throw "DSH plugin installation failed with exit code $LASTEXITCODE. Backup: $backupDir" }
} finally {
    $env:DSH_HOME = $previousDshHome
}

$after = Get-Content -LiteralPath $profileManifest -Raw -Encoding UTF8 | ConvertFrom-Json
$installedDir = Join-Path $profileDir 'node_modules/dsh-wsl-native'
$installed = Get-Content -LiteralPath (Join-Path $installedDir 'package.json') -Raw -Encoding UTF8 | ConvertFrom-Json
if ($installed.version -ne $expectedVersion) { throw "Installed version $($installed.version) does not match $expectedVersion." }
if ('dsh-wsl-native' -notin @($after.dsh.profile.bundles)) { throw 'Plugin is installed but missing from Desktop bundles.' }
foreach ($name in $before.dependencies.PSObject.Properties.Name) {
    if ($name -notin $after.dependencies.PSObject.Properties.Name) { throw "Existing dependency disappeared: $name. Inspect backup: $backupDir" }
}
foreach ($name in @($before.dsh.profile.bundles)) {
    if ($name -notin @($after.dsh.profile.bundles)) { throw "Existing bundle disappeared: $name. Inspect backup: $backupDir" }
}
$record = [ordered]@{
    date = (Get-Date).ToUniversalTime().ToString('o')
    package = "dsh-wsl-native@$expectedVersion"
    profile = 'desktop'
    officialPluginInstall = $true
    previousDependenciesPreserved = $true
    previousBundlesPreserved = $true
    packageSha256 = $sourceHash.ToLowerInvariant()
    installedClientSha256 = (Get-FileHash -LiteralPath (Join-Path $installedDir 'lib/client.js') -Algorithm SHA256).Hash.ToLowerInvariant()
    nativeWindowUiClicked = $false
}
$utf8 = New-Object System.Text.UTF8Encoding($false)
[IO.File]::WriteAllText((Join-Path $backupDir 'installation.json'), ($record | ConvertTo-Json -Depth 6), $utf8)
Write-Host "Installed dsh-wsl-native $expectedVersion in Desktop. Existing plugins are preserved."
Write-Host 'If the entry is not visible, finish active tasks, quit DSH from its tray, and reopen it.'
Write-Output ([pscustomobject]@{ Version = $expectedVersion; Profile = $profileDir; Package = $stablePackage; Backup = $backupDir })
