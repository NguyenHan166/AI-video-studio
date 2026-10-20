---
name: create-video
description: Produce portrait Vietnamese documentary videos using a provided SRT, optional MP3/WAV, optional user images, and a reusable Remotion style template. Use when asked to create or render a video by topic and reference template.
---

# Create video — SRT driven / no TTS

Use this skill whenever the user asks for `/create-video` or equivalent. Read `AGENTS.md`, `README-VI.md`, `templates/vintage-editorial/STYLE.md` first. Keep audio narration and SRT content untouched.

## Inputs
- `topic`: topic or supplied content in `input/brief.md` if present; SRT is the authoritative spoken text.
- `srt`: path inside project. Required.
- `audio`: MP3/WAV inside project. Optional; missing audio means **silent narration** and must be disclosed.
- `assets`: optional images in `input/assets`; reuse before sourcing new images.
- `template`: default `vintage-editorial`.

## Procedure
1. Validate input, inspect SRT cues/timecodes, and optionally compare audio duration with SRT via ffprobe. Report >0.5s mismatches; do not speed up voice to hide the issue.
2. Execute `node scripts/prepare-project.mjs --topic "..." --srt input/voice.srt --audio input/voice.mp3 --assets input/assets --slug project-name` (omit `--audio` when none). Run `--help` first if unfamiliar.
3. Review `src/generated/current-project.json`. **Do not keep the purely mechanical placeholder storyboard.** Analyze the narrative meaning of multiple SRT cues, group them into coherent scenes with appropriate boundaries. Keep entire timeline contiguous and total frames equal to project duration.
4. Choose components by narrative function: cover (hook), photo-story / photo-stack (people/places), timeline (journey/history), comparison (contrast), statistic (only when SRT supports real figures), ending (closure). Avoid ungrounded numbers.
5. Media: prioritize user assets; if missing, use browser/web permitted by user to find verifiably licensed or public-domain photos; record `source_url`, `author`, `license`, `relevant_cues` into `output/asset-manifest.json`. Do not misrepresent newly generated imagery as historical archival photos. No arbitrary downloads from restricted sites.
6. Refine headings but do NOT rewrite captions. For each visual element ensure source information is factual. Edit JSON and reusable components as needed; avoid one scene per subtitle cue.
7. Run `npm run check`. Ensure scene boundary coverage and every local file exists. Review SRT gaps and punctuation.
8. Render stills for opening, middle and close of each representative scene using `npx remotion still src/index.ts EditorialVideo output/check-N.png --frame=N` and inspect them. Fix overflow or image crop before rendering.
9. Run `npm run render`. Check rendered MP4 with `ffprobe`, especially video dimensions and audio track presence. Do not claim success before verification.
10. Return absolute MP4 path (`output/<slug>.mp4`), total length, source manifest, preview locations, and any missing assets or legal uncertainty.

## Invariants
- Do not generate TTS. Do not change original audio/SRT.
- Preserve Vietnamese accent marks. Align captions by time (sentence-level initially; word-level requires extra alignment data).
- Use only this project's files unless the user approves external access.
- All images must use valid media file formats supported by the current component. Video clips need an explicit Remotion video component before use.
- Do not use scene kind `statistic` for unverified values.

## Fallbacks
- No audio: render mute narration and state it explicitly.
- No pictures: render with typography and placeholders temporarily; require real assets before publishing.
- Remote media unavailable: use only verified local media or ask for an alternative; never invent URLs.
- No npm installed: stop and give the user the exact `node -v` / `npm -v` diagnostic.
