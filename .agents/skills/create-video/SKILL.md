---
name: create-video
description: Turn a Vietnamese brief, timed SRT, optional user audio and licensed media into a portrait Remotion video using a selected project template.
---

# Create a video

Use this skill when the user asks to create, prepare, edit, or render a video from project inputs. Follow the workspace `AGENTS.md` first. The recorded voice and SRT are source material: never synthesize narration, replace the voice, retime the voice, or rewrite subtitle wording.

## Project layout

- `input/` is the drop area for one-off inputs and the starter demo.
- `input/projects/<slug>/` holds a reusable project package: `brief.md`, `voice.srt`, optional `voice.mp3`/`voice.wav`, `assets/`, `sources.md`, `media-plan.md`, and optional `production.json`.
- `src/generated/current-project.json` is the active Remotion project loaded by Studio and render scripts. Preparing another project changes this active selection; unsaved active-project edits are snapshotted under `output/archive/active-project-backups/` first.
- `src/templates/manifest.json` is the supported template catalog and the source of bootstrap scene kinds.
- `src/templates/<template-id>/` contains runtime theme and scene code. `templates/<template-id>/STYLE.md` is the design specification.
- `public/media/<slug>/` contains local copies needed by `staticFile()`.
- `output/<slug>/` contains that project's storyboard, asset manifest, previews, and final render. Older outputs under `output/archive/` are historical references.

## Inputs and template selection

1. Identify the project package or user-provided file paths. Prefer project-local files under `input/projects/<slug>/`; do not search outside this workspace.
2. Read the brief, SRT, optional production metadata, and asset notes. SRT cues are the authority for spoken words and timing. Do not turn each cue into a scene; group related cues into narrative beats.
3. If the template is not specified, show the catalog with `npm run templates` and use the user's stated choice. If the user has not chosen and the task can proceed, use `vintage-editorial` and state that assumption.
4. Read `templates/<template-id>/STYLE.md` and inspect the matching runtime module under `src/templates/<template-id>/` before authoring the storyboard.

Supported IDs are `vintage-editorial`, `illustrated-paper-textured`, and `cyber-security-alert`. The exact list is in `src/templates/manifest.json`.

## Prepare and edit the storyboard

Run `npm run prepare --` with explicit input paths and the selected template. For example:

```powershell
npm run prepare -- --topic "Cầu ngói chợ Lương" --srt input/projects/cau-ngoi-cho-luong/voice.srt --audio input/projects/cau-ngoi-cho-luong/voice.mp3 --assets input/projects/cau-ngoi-cho-luong/assets --template vintage-editorial --slug cau-ngoi-cho-luong
```

The command writes `src/generated/current-project.json`, copies input media into `public/media/<slug>/`, creates `output/<slug>/storyboard.json`, and initializes `output/<slug>/asset-manifest.json`. Imported images/videos get user-supplied entries marked `needs-review`; keep those entries and fill in the rights/source details before publishing. Existing manifest entries are preserved. If a storyboard already exists, choose a new slug or pass `--overwrite` to regenerate it. The storyboard is a timing-based bootstrap, not an editorially complete cut.

Before rendering:

- Edit `src/generated/current-project.json` so scenes follow meaningful narrative beats, use the chosen template's scene kinds, and cover the full timeline without gaps or overlaps.
- Keep every caption cue's exact Vietnamese text and SRT timing. Do not invent, paraphrase, or delete spoken content.
- Keep titles, claims, dates, statistics, domain examples, and hotline information supported by the brief or cited sources. Do not infer details from a blocked/unavailable source.
- Match each scene's visual fields to the component's data contract. Remove unsupported template defaults rather than letting generic placeholder copy appear in the finished video.
- Prioritize supplied images/video. For every external image, use a reliable license or public-domain source and record `source_url`, `author`, `license`, and `relevant_cues` in `output/<slug>/asset-manifest.json`. For supplied assets, confirm the user has reuse rights and update `review_status`. A source used for factual research does not grant rights to reuse its images.
- Keep phishing chats and links clearly fictional, nonfunctional, and free of scannable QR codes. Do not expose real personal data or real victims.
- Use still images directly. If using video, add the appropriate Remotion video component and verify trimming/cropping; do not treat video as an image path.

## Timing and audio policy

Compare audio duration with the final SRT cue end using `ffprobe` or `npm run check`.

- When the difference is at most 0.5 seconds, keep the SRT-driven composition and report the measured difference if it is useful.
- When the difference exceeds 0.5 seconds, report both durations and the difference before rendering. This project records `audioSyncPolicy: "srt-authoritative"`: composition duration follows the SRT, the voice is never time-stretched, and any overhang or silence remains visible as a timing issue. Do not silently change this policy.
- Word-by-word highlighting is allowed only when actual word timing data exists in `wordTimings`. Plain SRT should render as sentence-level captions.

## Quality checks and rendering

1. Run `npm run check` after editing the project. Fix errors before continuing.
2. Run `npm run render:stills`. It writes one midpoint preview for each scene to `output/<slug>/previews/`. Inspect every scene for Vietnamese diacritics, safe areas, clipping, image crop, readability, and template consistency. Fix and repeat the check/preview cycle when needed.
3. Render only when the user asks for a final video or the task clearly includes rendering: `npm run render`. The target is `output/<slug>/video.mp4`. If it already exists, use a new slug or ask before replacing it; explicit replacement uses `npm run render -- --overwrite`.
4. After a successful render, verify the MP4 exists and inspect it with `ffprobe` for duration, 1080x1920 dimensions, 30fps, and audio-track presence. Do not claim the MP4 exists or is ready before this verification.
5. Report the absolute MP4 path only after verification, plus the selected template, source manifest, preview directory, audio/SRT difference, and any asset or factual gaps.

## Adding or changing a template

Do not add template-specific branches to the composition's main renderer. Follow the template extension workflow in `learn-video-style/SKILL.md`: create a module under `src/templates/<template-id>/`, register its metadata and scene kinds in `src/templates/manifest.json`, register its runtime renderer/theme in `src/templates/registry.tsx`, add a style specification under `templates/<template-id>/STYLE.md`, and update type/verification rules where needed. Keep shared timing, audio, captions, and project orchestration in `src/core/`.

## Never do these

- Never synthesize narration or modify the provided recorded voice or SRT source files.
- Never delete or overwrite original input media, captions, reference videos, or unrelated project outputs.
- Never claim that a render passed based only on storyboard JSON, stills, or a prior MP4.
- Never use unsourced statistics, pretend generated imagery is an archival photograph, or treat a publicly visible image as licensed.
