# Sends a prompt file to Gemini CLI and saves the answer.
# Usage: powershell -File tools/ask-gemini.ps1 -PromptFile prompts/g2_world.md -OutFile content/world.json
# The API key is read from the user's GEMINI_API_KEY environment variable and never printed.
param(
  [Parameter(Mandatory = $true)][string]$PromptFile,
  [Parameter(Mandatory = $true)][string]$OutFile
)

$key = [Environment]::GetEnvironmentVariable('GEMINI_API_KEY', 'User')
if (-not $key) { Write-Error 'GEMINI_API_KEY chưa được đặt. Chạy: setx GEMINI_API_KEY "..."'; exit 2 }
$env:GEMINI_API_KEY = $key
$env:Path = 'C:\Program Files\nodejs;' + $env:Path

$prompt = Get-Content -Raw -Encoding UTF8 $PromptFile
$dir = Split-Path -Parent $OutFile
if ($dir) { New-Item -ItemType Directory -Force $dir | Out-Null }

$answer = $prompt | & 'C:\Users\Administrator\.gemini-cli\gemini.cmd' --skip-trust -p 'Làm đúng yêu cầu trong nội dung được gửi kèm. Chỉ trả về kết quả, không giải thích.'
if ($LASTEXITCODE -ne 0) { Write-Error "Gemini lỗi (exit $LASTEXITCODE)"; exit $LASTEXITCODE }

# Strip a ```json fence if Gemini added one.
$text = ($answer -join "`n") -replace '^\s*```(json)?\s*', '' -replace '\s*```\s*$', ''
[IO.File]::WriteAllText((Join-Path (Get-Location) $OutFile), $text, (New-Object Text.UTF8Encoding $false))
Write-Output "Đã lưu $OutFile"
