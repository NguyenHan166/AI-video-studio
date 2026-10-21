# AI Video Studio

Local video production workspace built with Remotion. Add a brief, timed SRT, optional recorded narration and permitted media; choose a template; edit the generated storyboard; preview each scene; render an MP4.

This is a local production tool starter, not a hosted service. The active project is selected through `src/generated/current-project.json`. Preparing another project changes that active selection, while original inputs stay in `input/`.

## Project structure

```text
input/
  assets/                         # Drop area for one-off user media
  projects/<slug>/                # Reusable input packages and project notes
references/<template-id>/         # User reference video and extracted keyframes
src/
  app/                            # Remotion entry and composition registration
  core/                           # Shared types, captions, audio, timeline renderer
  generated/current-project.json  # Active project data, loaded by Remotion
  templates/                      # Runtime templates and template catalog
templates/<template-id>/          # Human-readable style specifications
public/assets/                    # Shared template artwork and textures
public/media/<slug>/              # Local copies of selected project media
scripts/                          # Prepare, validate, preview, render
output/<slug>/                    # Per-project storyboard, manifest, previews, MP4
output/archive/                   # Earlier outputs retained for reference
.agents/skills/                   # create-video and learn-video-style workflows
```

Template **runtime code** lives under `src/templates/<template-id>/`; the matching `templates/<template-id>/STYLE.md` defines its visual design. The template list and supported scene kinds live in `src/templates/manifest.json`; runtime registration is in `src/templates/registry.tsx`.

## Setup on Windows

Install Node.js LTS, Git, and FFmpeg with `ffprobe` available on `PATH`. From this workspace:

```powershell
npm install
npm run templates
npm run check
npm run studio
```

`npm run templates` lists the selectable template IDs. The starter demo uses `input/demo.srt` and has no narration audio.

## Add a project and choose a template

For a reusable project, keep files together under `input/projects/<slug>/`:

```text
input/projects/sa-pa-xua/
  brief.md
  voice.srt
  voice.mp3       # Optional, user-recorded or user-generated externally
  assets/         # Optional user-owned/licensed images or video
  sources.md      # Optional factual sources and asset provenance
  media-plan.md   # Optional scene/media notes
```

Prepare the project with the chosen template:

```powershell
npm run prepare -- --topic "Sa Pa thập niên 1990" --srt input/projects/sa-pa-xua/voice.srt --audio input/projects/sa-pa-xua/voice.mp3 --assets input/projects/sa-pa-xua/assets --template vintage-editorial --slug sa-pa-xua
```

Omit `--audio` when the video should be silent. `--template` must be one of the IDs shown by `npm run templates`:

- `vintage-editorial`
- `illustrated-paper-textured`
- `cyber-security-alert`

The prepare command validates the selected template, parses SRT, copies supported images and MP4/WebM files into `public/media/<slug>/`, writes the active project to `src/generated/current-project.json`, and writes `output/<slug>/storyboard.json` plus `output/<slug>/asset-manifest.json`. Imported assets are marked as user-supplied and `needs-review`; confirm reuse rights and add source details before publishing. If the storyboard already exists, use a new slug or pass `--overwrite`; unsaved active project edits are snapshotted under `output/archive/active-project-backups/`. The starter groups cues by time; edit it into meaningful narrative scenes before rendering. The SRT wording and timecodes remain authoritative. Video files are staged in project data; a scene must use a Remotion video component before they appear in the render.

## Preview and render

```powershell
npm run check
npm run render:stills
npm run studio
```

`render:stills` creates one midpoint image per scene at `output/<slug>/previews/`. Inspect every scene for safe areas, legibility, crop, clipping, and correct content before rendering.

When ready to export:

```powershell
npm run render
```

The MP4 target is `output/<slug>/video.mp4`. The render script refuses to replace an existing file by default. Use a new slug to keep both versions, or explicitly replace the same target with:

```powershell
npm run render -- --overwrite
```

Only report a successful video after the render command completes and the resulting MP4 is verified with `ffprobe`.

## Audio and captions

- Never synthesize narration as part of this project. Do not change the recorded voice or source SRT.
- Project duration follows the last SRT cue (`audioSyncPolicy: "srt-authoritative"`). If audio and SRT differ by more than 0.5 seconds, report both durations and explain that audio will not be time-stretched.
- SRT provides sentence timing. Word highlighting is used only when real `wordTimings` are supplied; otherwise captions remain sentence-level.
- Vietnamese diacritics must remain exact. Keep all text inside portrait safe areas.

## Add a template

1. Study a user-supplied reference with `/learn-video-style` and save it under `references/<template-id>/`.
2. Add runtime components and a `theme.ts` under `src/templates/<template-id>/`.
3. Add template metadata and supported/bootstrap scene kinds in `src/templates/manifest.json`.
4. Register its renderer, background and caption presentation in `src/templates/registry.tsx`.
5. Add or refine scene fields in `src/core/types.ts`, validation in `scripts/verify-project.mjs`, and the style guide at `templates/<template-id>/STYLE.md`.
6. Run `npm run check`, render and inspect a still for every scene, then update the skills if the workflow changed.

Keep composition, captions, timing and audio behavior shared in `src/core/`. Keep template-only visuals and tokens inside its template module. Do not add a new template branch to the composition renderer.

## Media rights and sources

Use user-provided or clearly licensed media. Record the source URL, creator, license, and related scenes in `output/<slug>/asset-manifest.json`. A page used to fact-check a topic does not grant rights to its photographs. Do not present generated reconstructions as historical photographs or use active scam links, scannable QR codes, or real personal data.

## Common commands

| Command | Purpose |
| --- | --- |
| `npm run templates` | List available templates |
| `npm run prepare -- --help` | Show project preparation arguments |
| `npm run prepare:demo` | Load the SRT-only demo project |
| `npm run check` | Type-check and validate project data/assets |
| `npm run render:stills` | Render one preview per scene |
| `npm run studio` | Open Remotion Studio |
| `npm run render` | Render the active project to MP4 |
