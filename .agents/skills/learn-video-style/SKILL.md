---
name: learn-video-style
description: Analyze a user-supplied reference video and add or improve a reusable Remotion template while preserving existing templates and project inputs.
---

# Learn a video style

Use this skill when the user asks to analyze a reference video, extract its visual language, reproduce its style, or turn it into a reusable template. Follow workspace `AGENTS.md`. Treat the reference as a style source; its factual claims, people, footage, and images are not automatically content or licensed assets for a new video.

## Inputs and preservation

- Accept a reference video already inside this workspace, preferably under `references/<template-id>/`.
- If the video is outside the workspace, ask the user to place a copy under `references/<template-id>/` or obtain explicit approval before running tools against it. Never modify or delete the source reference.
- Choose a lowercase, hyphenated template ID. Check `src/templates/manifest.json`, `src/templates/`, and `templates/` first. Extend a matching template when appropriate; create a new one rather than overwriting an unrelated style.
- Keep extracted frames under `references/<template-id>/keyframes/`. Keep the written style guide under `templates/<template-id>/STYLE.md` and runtime code under `src/templates/<template-id>/`.

## Analysis workflow

1. Read `AGENTS.md`, `README-VI.md`, this skill, existing template guides, and the current scene/type/registry code.
2. Inspect the video with `ffprobe` for duration, dimensions, frame rate, and streams. Sample approximately one frame every 5–8 seconds, plus opening, middle, closing, and transition moments. Use `scripts/inspect-reference.ps1 -Video <workspace-path> -Template <template-id>` when useful; it stores samples in the matching reference folder.
3. Make a scene inventory based on narrative and visual beats, not one frame per subtitle cue. Record approximate boundaries, shot/layout type, text hierarchy, image treatment, motion, transitions, palette, typography, texture, safe areas, and recurring elements.
4. Distinguish stable design rules from one-off footage or wording. Do not copy the reference's factual claims, statistics, real account details, watermarks, or copyrighted images into a new project without a separate evidence and rights check.
5. Write or update `templates/<template-id>/STYLE.md` with the design system, scene catalog, layout proportions, animation behavior, portrait safe areas, caption behavior, examples, and limits. State which details are uncertain and what the implementation intentionally changes. Do not claim pixel-perfect reproduction without side-by-side verification.

## Implement a reusable template

Keep template-specific components and tokens inside `src/templates/<template-id>/`:

- `theme.ts` — colors, typography stacks, spacing, textures, caption presentation, and other design tokens.
- `Scene.tsx` — scene components and a template-local scene router.
- Additional local components/assets only when reused by this template.

Then wire the template into the shared system:

1. Add its ID, name, description, supported `sceneTypes`, and `bootstrapSceneTypes` to `src/templates/manifest.json`.
2. Add its renderer, background, and caption theme to `src/templates/registry.tsx`.
3. Add or refine its scene data fields in `src/core/types.ts`; keep shared project, caption, timeline, and audio types out of template components.
4. Make `scripts/verify-project.mjs` validate the new template's scene kinds and any required fields.
5. Keep shared SRT timing, audio playback, composition registration, and project orchestration under `src/core/` and `src/app/`. Do not grow a central chain of template-specific conditionals.
6. Use frame-based Remotion animation (`useCurrentFrame`, `interpolate`, `spring`). Do not use CSS `transition` or `animation` for effects that need to render consistently. Word-level caption highlighting requires real word timestamps; ordinary SRT remains sentence-timed.
7. Load only the user-selected project's local media from `public/` with `staticFile()`. Reference videos and extracted keyframes are analysis material, not automatic production assets.

## Review and delivery

- Do not render a final video unless the user asks for a render. A style-learning task may create and inspect still previews.
- Run `npm run check` after implementation. Run `npm run render:stills` and inspect a midpoint still for every scene in a representative local project. Check Vietnamese diacritics, safe areas, clipping, crop, motion at sampled frames, caption readability, and consistency with the style guide.
- If the reference style requires a scene kind that the data model cannot express, add the smallest suitable typed fields and document their use; do not store template state in unstructured ad hoc keys.
- Preserve existing template modules and original media. Report the reference path, resulting template ID, changed files, what was measured versus estimated, preview paths, validation performed, and any unresolved licensing or reproduction limits.
