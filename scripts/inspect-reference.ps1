param([string]$Video = "references\sapa-reference.mp4")
$ErrorActionPreference = "Stop"
New-Item -ItemType Directory -Force "references\keyframes" | Out-Null
ffprobe -v error -show_entries format=duration:stream=codec_name,width,height,r_frame_rate -of json $Video
ffmpeg -hide_banner -loglevel error -y -i $Video -vf "fps=1/7,scale=540:-2" -frames:v 15 "references\keyframes\frame_%03d.jpg"
Write-Host "Xong: references\keyframes"
