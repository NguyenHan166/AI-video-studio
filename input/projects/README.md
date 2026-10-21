# Project input packages

Keep each reusable video project in its own folder named with a stable slug.

```text
<slug>/
  brief.md
  voice.srt
  voice.mp3       # Optional recorded narration; never synthesized by this tool
  assets/         # Optional user-owned or licensed images/video
  sources.md      # Optional research sources and asset licenses
  media-plan.md   # Optional narrative and visual plan
  production.json # Optional project metadata
```

Pass the chosen files explicitly to `npm run prepare -- ...`. The prepare command copies media into `public/media/<slug>/` and selects that project as the active Remotion composition; it does not edit the original package.
