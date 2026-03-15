param(
  [string]$InputPath = "",
  [string]$SourceDeckPath = "source/company-profile/SGB PROFILE - A5.ppt.pptx",
  [string]$OutputJsonPath = "data/generated/company-profile.json",
  [string]$AssetsRoot = "public/company-profile"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-RepoPath([string]$RelativePath) {
  return Join-Path -Path $PSScriptRoot -ChildPath "..\$RelativePath"
}

function Normalize-Whitespace([string]$Value) {
  if ([string]::IsNullOrWhiteSpace($Value)) {
    return ""
  }

  return (
    $Value `
      -replace "\s+", " " `
      -replace "\s+,", "," `
      -replace ",(?=\S)", ", " `
      -replace "\.(?=\S)", ". "
  ).Trim()
}

function Get-Slug([string]$Value) {
  $normalized = Normalize-Whitespace $Value
  if ([string]::IsNullOrWhiteSpace($normalized)) {
    return "item"
  }

  $slug = $normalized.ToLowerInvariant() -replace "[^a-z0-9]+", "-" -replace "^-|-$", ""
  if ([string]::IsNullOrWhiteSpace($slug)) {
    return "item"
  }

  return $slug
}

function Get-ParagraphTexts([xml]$XmlDoc, [System.Xml.XmlNamespaceManager]$Ns) {
  $paragraphs = @()
  foreach ($paragraphNode in $XmlDoc.SelectNodes("//a:p", $Ns)) {
    $parts = @()
    foreach ($textNode in $paragraphNode.SelectNodes(".//a:t", $Ns)) {
      if ($null -ne $textNode -and $null -ne $textNode.InnerText) {
        $parts += $textNode.InnerText
      }
    }

    $paragraphText = Normalize-Whitespace ($parts -join "")
    if (-not [string]::IsNullOrWhiteSpace($paragraphText)) {
      $paragraphs += $paragraphText
    }
  }

  return $paragraphs
}

function Get-SectionType([string]$Title) {
  $value = (Normalize-Whitespace $Title).ToLowerInvariant()

  if ($value -match "certification|iso|bizsafe|bca") { return "certifications" }
  if ($value -match "client") { return "clients" }
  if ($value -match "service") { return "services" }
  if ($value -match "project") { return "projects" }
  if ($value -match "manpower|organizational|team chart|staff|termination team") { return "team" }
  if ($value -match "quality|testing procedure") { return "quality" }
  if ($value -match "equipment") { return "equipment" }
  if ($value -match "thank you") { return "general" }
  if ($value -match "about|excellence") { return "overview" }
  return "general"
}

function Read-XmlEntry([System.IO.Compression.ZipArchive]$Zip, [string]$EntryPath) {
  $entry = $Zip.GetEntry($EntryPath)
  if ($null -eq $entry) {
    return $null
  }

  $reader = [System.IO.StreamReader]::new($entry.Open())
  try {
    [xml]$reader.ReadToEnd()
  }
  finally {
    $reader.Dispose()
  }
}

function Get-ImageDimensions([byte[]]$Bytes, [string]$Extension) {
  if ($Extension -notin @(".png", ".jpg", ".jpeg", ".gif", ".bmp")) {
    return @{
      width = $null
      height = $null
    }
  }

  Add-Type -AssemblyName System.Drawing
  $stream = [System.IO.MemoryStream]::new($Bytes)
  try {
    $image = [System.Drawing.Image]::FromStream($stream, $false, $false)
    try {
      return @{
        width = $image.Width
        height = $image.Height
      }
    }
    finally {
      $image.Dispose()
    }
  }
  catch {
    return @{
      width = $null
      height = $null
    }
  }
  finally {
    $stream.Dispose()
  }
}

function Get-TableRows([string[]]$Paragraphs, [int]$Columns, [string[]]$HeadersToRemove) {
  $filtered = @()
  foreach ($item in $Paragraphs) {
    if ($HeadersToRemove -contains $item) {
      continue
    }
    if ($item -eq "SGB ENGINEERING & TRADING PTE.LTD") {
      continue
    }
    $filtered += $item
  }

  $rows = @()
  for ($index = 0; $index -lt $filtered.Count; $index += $Columns) {
    $slice = $filtered[$index..([Math]::Min($index + $Columns - 1, $filtered.Count - 1))]
    if ($slice.Count -eq $Columns) {
      $rows += ,$slice
    }
  }

  return $rows
}

function New-ImageRecord(
  [hashtable]$MediaInfo,
  [string]$PublicRelativePath,
  [string]$AltText,
  [bool]$IsLikelyDecorative
) {
  return [pscustomobject][ordered]@{
    originalName = $MediaInfo.originalName
    outputPath = "/" + ($PublicRelativePath -replace "\\", "/")
    width = $MediaInfo.width
    height = $MediaInfo.height
    sizeBytes = $MediaInfo.sizeBytes
    altText = $AltText
    isLikelyDecorative = $IsLikelyDecorative
  }
}

Add-Type -AssemblyName System.IO.Compression.FileSystem

$defaultInput = "C:\Users\siamu\Downloads\SGB PROFILE  - A5.ppt.pptx"
if ([string]::IsNullOrWhiteSpace($InputPath)) {
  $sourceDeckFullPath = Get-RepoPath $SourceDeckPath
  if (Test-Path -LiteralPath $sourceDeckFullPath) {
    $InputPath = $sourceDeckFullPath
  }
  else {
    $InputPath = $defaultInput
  }
}

$resolvedInputPath = [System.IO.Path]::GetFullPath($InputPath)
if (-not (Test-Path -LiteralPath $resolvedInputPath)) {
  throw "PPTX file not found: $resolvedInputPath"
}

$sourceDeckFullPath = Get-RepoPath $SourceDeckPath
$sourceDeckDir = Split-Path -Parent $sourceDeckFullPath
$outputJsonFullPath = Get-RepoPath $OutputJsonPath
$outputJsonDir = Split-Path -Parent $outputJsonFullPath
$assetsRootFullPath = Get-RepoPath $AssetsRoot

New-Item -ItemType Directory -Force -Path $sourceDeckDir, $outputJsonDir, $assetsRootFullPath | Out-Null
if ([System.IO.Path]::GetFullPath($resolvedInputPath) -ne [System.IO.Path]::GetFullPath($sourceDeckFullPath)) {
  Copy-Item -LiteralPath $resolvedInputPath -Destination $sourceDeckFullPath -Force
}
Get-ChildItem -LiteralPath $assetsRootFullPath -Force -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force

$zip = [System.IO.Compression.ZipFile]::OpenRead($sourceDeckFullPath)
try {
  $slideEntries = $zip.Entries |
    Where-Object { $_.FullName -match '^ppt/slides/slide\d+\.xml$' } |
    Sort-Object { [int]([regex]::Match($_.Name, 'slide(\d+)').Groups[1].Value) }

  $mediaEntries = $zip.Entries | Where-Object { $_.FullName -like 'ppt/media/*' }
  $mediaBytesByName = @{}
  $mediaInfoByName = @{}

  foreach ($mediaEntry in $mediaEntries) {
    $memoryStream = [System.IO.MemoryStream]::new()
    $stream = $mediaEntry.Open()
    try {
      $stream.CopyTo($memoryStream)
      $bytes = $memoryStream.ToArray()
    }
    finally {
      $stream.Dispose()
      $memoryStream.Dispose()
    }

    $fileName = [System.IO.Path]::GetFileName($mediaEntry.FullName)
    $extension = [System.IO.Path]::GetExtension($fileName).ToLowerInvariant()
    $dimensions = Get-ImageDimensions -Bytes $bytes -Extension $extension

    $mediaBytesByName[$fileName] = $bytes
    $mediaInfoByName[$fileName] = @{
      originalName = $fileName
      extension = $extension
      sizeBytes = $mediaEntry.Length
      width = $dimensions.width
      height = $dimensions.height
    }
  }

  $slideRecords = @()
  $mediaUsage = @{}

  foreach ($slideEntry in $slideEntries) {
    $slideNumber = [int]([regex]::Match($slideEntry.Name, 'slide(\d+)').Groups[1].Value)
    $slideXml = Read-XmlEntry -Zip $zip -EntryPath $slideEntry.FullName
    if ($null -eq $slideXml) {
      continue
    }

    $ns = [System.Xml.XmlNamespaceManager]::new($slideXml.NameTable)
    $ns.AddNamespace("a", "http://schemas.openxmlformats.org/drawingml/2006/main")
    $paragraphs = Get-ParagraphTexts -XmlDoc $slideXml -Ns $ns
    $usableParagraphs = $paragraphs | Where-Object { $_ -ne "SGB ENGINEERING & TRADING PTE.LTD" }
    $title = if ($usableParagraphs.Count -gt 0) { $usableParagraphs[0] } else { "Slide $slideNumber" }
    $sectionType = Get-SectionType $title

    $relationshipPath = "ppt/slides/_rels/$($slideEntry.Name).rels"
    $relationshipXml = Read-XmlEntry -Zip $zip -EntryPath $relationshipPath
    $mediaNames = @()
    if ($null -ne $relationshipXml) {
      foreach ($relationship in $relationshipXml.Relationships.Relationship) {
        if ($relationship.Target -like '../media/*') {
          $mediaName = [System.IO.Path]::GetFileName($relationship.Target)
          $mediaNames += $mediaName
          if (-not $mediaUsage.ContainsKey($mediaName)) {
            $mediaUsage[$mediaName] = @()
          }
          $mediaUsage[$mediaName] += $slideNumber
        }
      }
    }

    $slideRecords += [pscustomobject][ordered]@{
      slideNumber = $slideNumber
      title = $title
      rawParagraphs = $paragraphs
      textBlocks = $usableParagraphs | Select-Object -Skip 1
      sectionType = $sectionType
      mediaNames = $mediaNames
    }
  }

  $writtenMedia = @{}
  $slidesWithImages = @()

  foreach ($slideRecord in $slideRecords) {
    $titleSlug = Get-Slug $slideRecord.title
    $sectionFolder = $slideRecord.sectionType
    $slideImages = @()
    $indexWithinSlide = 0

    foreach ($mediaName in $slideRecord.mediaNames) {
      if (-not $mediaInfoByName.ContainsKey($mediaName)) {
        continue
      }

      $indexWithinSlide++
      $mediaInfo = $mediaInfoByName[$mediaName]
      $useCount = $mediaUsage[$mediaName].Count
      $isLikelyDecorative = $useCount -ge 6 -or ($mediaInfo.width -and $mediaInfo.height -and $mediaInfo.width -ge 1200 -and $mediaInfo.height -le 600)
      $finalFolder = if ($isLikelyDecorative) { "general" } else { $sectionFolder }
      $baseFileName =
        if ($isLikelyDecorative) { "shared-$([System.IO.Path]::GetFileNameWithoutExtension($mediaName))" }
        else { "slide-{0:D2}-{1}-{2:D2}" -f $slideRecord.slideNumber, $titleSlug, $indexWithinSlide }

      $publicRelativePath = Join-Path -Path "company-profile" -ChildPath (Join-Path -Path $finalFolder -ChildPath ($baseFileName + $mediaInfo.extension))
      $targetRelativePath = Join-Path -Path "public" -ChildPath $publicRelativePath
      $targetFullPath = Get-RepoPath $targetRelativePath
      $targetDirectory = Split-Path -Parent $targetFullPath
      New-Item -ItemType Directory -Force -Path $targetDirectory | Out-Null

      if (-not $writtenMedia.ContainsKey($mediaName)) {
        [System.IO.File]::WriteAllBytes($targetFullPath, $mediaBytesByName[$mediaName])
        $writtenMedia[$mediaName] = $publicRelativePath
      }

      $altText = if ($isLikelyDecorative) {
        "$($slideRecord.title) supporting visual"
      }
      else {
        "$($slideRecord.title) reference image"
      }

      $slideImages += New-ImageRecord -MediaInfo $mediaInfo -PublicRelativePath $writtenMedia[$mediaName] -AltText $altText -IsLikelyDecorative $isLikelyDecorative
    }

    $slidesWithImages += [pscustomobject][ordered]@{
      slideNumber = $slideRecord.slideNumber
      title = $slideRecord.title
      rawParagraphs = $slideRecord.rawParagraphs
      textBlocks = $slideRecord.textBlocks
      sectionType = $slideRecord.sectionType
      images = $slideImages
    }
  }

  $overviewSlide = $slidesWithImages | Where-Object slideNumber -eq 2 | Select-Object -First 1
  $clientsSlide = $slidesWithImages | Where-Object slideNumber -eq 3 | Select-Object -First 1
  $certificationSlide = $slidesWithImages | Where-Object slideNumber -eq 4 | Select-Object -First 1
  $onsiteManpowerSlide = $slidesWithImages | Where-Object slideNumber -eq 5 | Select-Object -First 1
  $skilledManpowerSlide = $slidesWithImages | Where-Object slideNumber -eq 6 | Select-Object -First 1
  $additionalResourcesSlide = $slidesWithImages | Where-Object slideNumber -eq 9 | Select-Object -First 1
  $servicesSlide = $slidesWithImages | Where-Object slideNumber -eq 24 | Select-Object -First 1

  $overviewParagraphs = @()
  if ($null -ne $overviewSlide) {
    foreach ($paragraph in $overviewSlide.rawParagraphs) {
      if ($paragraph -in @("About SGB", "SGB ENGINEERING & TRADING PTE.LTD", $overviewSlide.title)) {
        continue
      }
      $overviewParagraphs += $paragraph
    }
  }

  $clients = @()
  if ($null -ne $clientsSlide) {
    foreach ($paragraph in $clientsSlide.rawParagraphs) {
      if ($paragraph -in @($clientsSlide.title, "Existing Clients", "SGB ENGINEERING & TRADING PTE.LTD")) {
        continue
      }
      $clients += $paragraph
    }
  }

  $certifications = @()
  if ($null -ne $certificationSlide) {
    $nonDecorativeCertImages = $certificationSlide.images | Where-Object { -not $_.isLikelyDecorative }
    $certTitles = $certificationSlide.rawParagraphs |
      Where-Object { $_ -notin @($certificationSlide.title, "Certifications", "SGB ENGINEERING & TRADING PTE.LTD") }

    for ($index = 0; $index -lt $certTitles.Count; $index++) {
      $certifications += [pscustomobject][ordered]@{
        id = Get-Slug $certTitles[$index]
        title = $certTitles[$index]
        image = if ($index -lt $nonDecorativeCertImages.Count) { $nonDecorativeCertImages[$index] } else { $null }
      }
    }
  }

  $onsiteManpower = @()
  if ($null -ne $onsiteManpowerSlide) {
    $rows = Get-TableRows -Paragraphs $onsiteManpowerSlide.rawParagraphs -Columns 2 -HeadersToRemove @("Designation", "Pax", "On-Site", "Manpower Capabilities")
    foreach ($row in $rows) {
      $designation = $row[0]
      $headcount = $row[1]
      if ($designation -eq "LEW") {
        $headcount = ($row[1..($row.Count - 1)] -join ", ")
      }
      $onsiteManpower += [pscustomobject][ordered]@{
        designation = $designation
        headcount = $headcount
      }
    }
  }

  if ($onsiteManpower.Count -ge 5 -and $onsiteManpower[4].designation -eq "LEW" -and $onsiteManpower[4].headcount -eq "1x Regular") {
    $onsiteManpower[4].headcount = "1x Regular, 2x Outsourced"
    $onsiteManpower = $onsiteManpower | Where-Object { $_.designation -ne "2x Outsourced" }
  }

  $skilledManpower = @()
  if ($null -ne $skilledManpowerSlide) {
    $rows = Get-TableRows -Paragraphs $skilledManpowerSlide.rawParagraphs -Columns 2 -HeadersToRemove @("Designation", "Pax", "Skilled-Personnel", "Manpower Capabilities")
    foreach ($row in $rows) {
      $skilledManpower += [pscustomobject][ordered]@{
        designation = $row[0]
        headcount = $row[1]
      }
    }
  }

  $additionalResources = @()
  if ($null -ne $additionalResourcesSlide) {
    $rows = Get-TableRows -Paragraphs $additionalResourcesSlide.rawParagraphs -Columns 3 -HeadersToRemove @("Additional Manpower Resources", "Company Name", "Worker type", "Availability")
    foreach ($row in $rows) {
      $additionalResources += [pscustomobject][ordered]@{
        companyName = $row[0]
        workerType = $row[1]
        availability = $row[2]
      }
    }
  }

  $serviceList = @()
  if ($null -ne $servicesSlide) {
    foreach ($paragraph in $servicesSlide.rawParagraphs) {
      if ($paragraph -in @($servicesSlide.title, "SGB ENGINEERING & TRADING PTE.LTD")) {
        continue
      }
      $serviceList += $paragraph
    }
  }

  $serviceSlides = $slidesWithImages | Where-Object { $_.slideNumber -ge 25 -and $_.slideNumber -le 38 }
  $services = @()
  foreach ($serviceSlide in $serviceSlides) {
    $services += [pscustomobject][ordered]@{
      id = Get-Slug $serviceSlide.title
      title = $serviceSlide.title
      summary = "$($serviceSlide.title) delivered as part of SGB's installation and termination portfolio."
      images = $serviceSlide.images | Where-Object { -not $_.isLikelyDecorative }
    }
  }

  $projectSlides = $slidesWithImages | Where-Object { $_.slideNumber -ge 39 -and $_.slideNumber -le 43 }
  $projects = @()
  foreach ($projectSlide in $projectSlides) {
    $status = if ($projectSlide.slideNumber -eq 39) { "Ongoing" } else { "Completed" }
    $projects += [pscustomobject][ordered]@{
      id = "slide-$($projectSlide.slideNumber)"
      title = "$($projectSlide.title) Portfolio"
      status = $status
      description = "Project evidence retained from the company profile deck. Detailed project names on this slide are image-based and should be verified from the source deck where needed."
      images = $projectSlide.images | Where-Object { -not $_.isLikelyDecorative }
      sourceSlideNumber = $projectSlide.slideNumber
    }
  }

  $teamSlides = $slidesWithImages | Where-Object { $_.slideNumber -in @(7, 8, 13, 14, 15, 16) }
  $qualitySlides = $slidesWithImages | Where-Object { $_.slideNumber -in @(10, 18, 21, 23) }
  $equipmentSlides = $slidesWithImages | Where-Object { $_.slideNumber -in @(11, 12, 17, 19, 20, 22) }

  $deckTitle = ($slidesWithImages | Where-Object slideNumber -eq 1 | Select-Object -ExpandProperty title -First 1)
  $coverSlide = $slidesWithImages | Where-Object slideNumber -eq 1 | Select-Object -First 1
  $coverImage = $coverSlide.images |
    Where-Object { -not $_.isLikelyDecorative } |
    Sort-Object { ($_.width * $_.height) } -Descending |
    Select-Object -First 1

  $structured = [pscustomobject][ordered]@{
    source = [pscustomobject][ordered]@{
      sourceFileName = [System.IO.Path]::GetFileName($sourceDeckFullPath)
      sourceRelativePath = $SourceDeckPath -replace "\\", "/"
      importedAt = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssK")
      slideCount = $slidesWithImages.Count
    }
    company = [pscustomobject][ordered]@{
      name = "SGB ENGINEERING & TRADING PTE. LTD."
      shortName = "SGB Engineering & Trading"
      tagline = "Excellence in Engineering & Trading Solutions"
      establishedYear = "2012"
      contactPerson = "Mohammad Mozammal Hoque"
      contactRole = "Operations Director"
      coverImage = $coverImage
      overviewParagraphs = $overviewParagraphs
      certificationsMentioned = @("BCA Registered", "ISO 9001", "ISO 45001", "bizSAFE STAR")
    }
    sections = [pscustomobject][ordered]@{
      hero = [pscustomobject][ordered]@{
        title = "Singapore-based electrical, communication, and security systems execution"
        summary = "SGB Engineering & Trading supports procurement, installation, rectification works, and project management for small to medium-sized projects as both main contractor and subcontractor."
      }
      about = [pscustomobject][ordered]@{
        title = "About SGB"
        paragraphs = $overviewParagraphs
      }
      clients = [pscustomobject][ordered]@{
        title = "Existing Clients"
        items = $clients
      }
      certifications = [pscustomobject][ordered]@{
        title = "Certifications"
        items = $certifications
      }
      manpower = [pscustomobject][ordered]@{
        title = "Manpower Capabilities"
        onsite = $onsiteManpower
        skilled = $skilledManpower
        additionalResources = $additionalResources
        teamSlides = $teamSlides
      }
      quality = [pscustomobject][ordered]@{
        title = "Quality Check and Testing"
        qualitySlides = $qualitySlides
        equipmentSlides = $equipmentSlides
      }
      services = [pscustomobject][ordered]@{
        title = "Service Portfolio"
        list = $serviceList
        detailSlides = $services
      }
      projects = [pscustomobject][ordered]@{
        title = "Project Portfolio"
        items = $projects
      }
    }
    slides = $slidesWithImages
  }

  $json = $structured | ConvertTo-Json -Depth 100
  Set-Content -LiteralPath $outputJsonFullPath -Value $json -Encoding UTF8

  Write-Output "Imported company profile from $resolvedInputPath"
  Write-Output "Source copy: $sourceDeckFullPath"
  Write-Output "Structured data: $outputJsonFullPath"
  Write-Output "Extracted media root: $assetsRootFullPath"
}
finally {
  $zip.Dispose()
}
