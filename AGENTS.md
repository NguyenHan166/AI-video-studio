# Project rules for Antigravity agents

- This is a Windows-first local Remotion video project. Never run commands outside this workspace without approval.
- The user creates TTS externally. NEVER synthesize narration or change the recorded voice.
- Input: topic/narrative, SRT, optional MP3/WAV, optional user images/videos, template.
- SRT is the authority for narrated timing; do not invent or paraphrase cues.
- Do not equate a subtitle cue with a scene. Group related cues into meaningful narrative beats.
- Prioritize provided media. Any supplementary images require reliable sourcing and clear licenses; never pretend AI reconstructions are historic photographs.
- Only use licensed or user-supplied assets and keep a manifest of source/license for each image.
- Keep Vietnamese diacritics exact. All text in portrait safe areas, no clipping, no jitter, no excessive camera movement.
- Never claim the MP4 exists until `npm run render` completes and the file is verified.
- Always run `npm run check` before rendering and inspect stills for each scene after changes.
- Do not delete or overwrite original input recordings, captions, images, or reference videos.
- Prefer editing `src/generated/current-project.json` and reusable scene components, not regenerating the entire codebase.
- Remotion composition ID: `EditorialVideo`, frame size 1080x1920, 30fps.
- If audio duration and SRT differ > 0.5s, report mismatch and choose an explicit policy rather than silently time-stretching the voice.
- The optional `.agents/skills/nns-cut-silence` utility is standalone only, not a normal project-prep or render step. Never run it on `input/projects/`, project voice MP3/WAV files, SRT files, or rendered Remotion videos. Use it only for a separately requested silence-cut derivative from a standalone source copy inside this workspace, with a new output under `output/<slug>/`; review any time-map or subtitle changes before using a derivative as project input.
- No credentials or secrets should be stored in source files.

## Project structure

- Shared composition, timing, caption, audio, and data contracts belong in `src/core/`.
- Remotion bootstrap and composition registration belong in `src/app/`.
- Each visual template owns `src/templates/<template-id>/Scene.tsx` and `theme.ts`.
- Register template IDs, supported scene kinds, and bootstrap scene kinds in `src/templates/manifest.json`; register runtime components in `src/templates/registry.tsx`.
- Store reusable input packages in `input/projects/<slug>/`; keep one-off uploads in `input/`.
- Store reference videos and extracted frames in `references/<template-id>/`.
- Store generated artifacts in `output/<slug>/`; retain older artifacts under `output/archive/`.
- Keep `src/generated/current-project.json` as the active project loaded by Remotion. Do not write template-specific runtime logic into the shared composition.
- After changing scenes or template code, run `npm run check`, render per-scene stills with `npm run render:stills`, and inspect every scene before rendering the final MP4.
