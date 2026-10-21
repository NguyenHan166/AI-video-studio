param(
  [Parameter(Mandatory = $true)][string]$Video,
  [ValidateSet('vintage-editorial', 'illustrated-paper-textured', 'cyber-security-alert')]
  [string]$Template = 'vintage-editorial'
)
$ErrorActionPreference = "Stop"
$ReferenceDirectory = Join-Path "references" $Template
$KeyframeDirectory = Join-Path $ReferenceDirectory "keyframes"
New-Item -ItemType Directory -Force $KeyframeDirectory | Out-Null
ffprobe -v error -show_entries format=duration:stream=codec_name,width,height,r_frame_rate -of json $Video
ffmpeg -hide_banner -loglevel error -y -i $Video -vf "fps=1/7,scale=540:-2" -frames:v 15 (Join-Path $KeyframeDirectory "frame_%03d.jpg")
Write-Host "Xong: $KeyframeDirectory"
