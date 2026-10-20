---
name: learn-video-style
description: Study a user-supplied reference video by extracting frames, design tokens and scene patterns, then implement or improve a reusable Remotion documentary template.
---

# Learn video style from reference

1. Accept a local video path, default `references/sapa-reference.mp4`.
2. Run `ffprobe` for duration, resolution, fps and codecs; execute `powershell -ExecutionPolicy Bypass -File scripts/inspect-reference.ps1` or equivalent FFmpeg commands to extract roughly one frame every seven seconds.
3. Study opening/closing frames as well as transitions, inspect actual video or additional frames when motion cannot be inferred from still images.
4. Write/update `templates/<style-name>/STYLE.md` describing exact color palette, typography hierarchy, component anatomy, scene frequency, transitions, subtitle behavior and safe areas. If original font is unknown, say so explicitly.
5. Build scene components under `src/scenes.tsx` or modular scene files. Make every relevant element data-driven, not hard-coded to the original Sa Pa story.
6. Retain existing working templates. Never overwrite source or user audio. Show a preview still/movie and perform `npm run check` before declaring completion.
7. Explain departures from source style and do not claim pixel-perfect reproduction without a side-by-side comparison.
