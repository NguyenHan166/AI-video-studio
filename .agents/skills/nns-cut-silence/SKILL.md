---
name: nns-cut-silence
description: Standalone-only silence cutting for an existing local video with spoken narration. Use only when the user explicitly requests a new derivative; do not use for AI Video Studio project inputs, separate voice/SRT files, or rendered Remotion videos.
---

# nns-cut-silence v2 — safe, verified, non-overwriting

## Scope and boundaries

## AI Video Studio project boundary

Follow the workspace AGENTS.md. Here this is a standalone utility, not part of the normal create-video flow. Do not run it on files under input/projects/, project voice.mp3/voice.wav or SRT files, or rendered Remotion videos. Silence cuts shorten the audio and video timeline and can remove subtitle cues. Use it only for a separately requested derivative of a standalone source video stored inside the workspace, write to a new path under output/<slug>/, and preserve the source. Before using a derivative as project input, review its time map and obtain explicit approval for the timeline change.

Use this skill **only** when the user explicitly asks to shorten pauses in an existing **local video file containing audio**. Prefer source voiceover/talking-head clips before adding soundtrack, effects, captions or B-roll. Cutting at a pause removes video frames as well as audio samples: it is unsuitable for uninterrupted music, visual sequences or already synchronized external layers without protected ranges.

- Never execute downloaded shell scripts, install software, elevate privileges, fetch URLs, edit Codex configuration, or bypass the Codex sandbox to make this skill work. Request user permission for missing prerequisites instead.
- Treat **every original media file and pre-existing output as read-only**. Always choose a new output name. Do not delete, overwrite or rename user files as a workaround.
- This skill launches local `ffmpeg`/`ffprobe` through Python's subprocess API with argument arrays, with network protocols blocked for media readers. The user must trust their installed FFmpeg/Python/NumPy distributions.
- Only the wrapper `scripts/cut_silence.py` offers staged rendering: it verifies the temporary outputs BEFORE publishing the video, WAV, plan and timemap. Prefer it over invoking `plan.py`, `apply.py`, `verify.py` separately.
- Path handling matters on Windows: always quote paths with spaces or Vietnamese characters. Locate `scripts/` relative to **this** SKILL.md; do not assume the Codex working directory is the skill directory.
- **No claims of forensic-perfect sync on every file**. A static frame or low-energy audio can make checks inconclusive. Strict mode refuses important inconclusive checks; users may opt into a limited verification with `--allow-inconclusive`.

## Prerequisites

Python 3.10+ recommended, with NumPy, and `ffmpeg` + `ffprobe` in PATH. Do not self-install anything. First run:

```powershell
python "<skill-directory>\scripts\preflight.py" --video "D:\Videos\raw.mp4" --out "D:\Videos\cut.mp4"
```

On missing prerequisites, STOP, report exactly what is missing, and ask the user to install/approve separately. If the input is VFR, request a separate CFR-converted copy; do not automatically convert/replace originals.

## Preferred workflow (Codex)

1. Confirm the exact local input file and an **unused** local result filename. Keep result in a user-approved directory. Check `preflight.py` before expensive operations.
2. For a preview that writes **no media/JSON files**, run:

```powershell
python "<skill-directory>\scripts\cut_silence.py" --video "D:\Videos\raw.mp4" --out "D:\Videos\cut.mp4" --dry-run
```

3. Explain how many gaps and seconds would be cut. If the pauses include deliberate dramatic silence, speech breaths, music, animations, transitions, B-roll, overlays, or any region that must remain intact, set `--protect "start-end,..."` using **original** timeline timestamps. `--protect-cuts` additionally protects hard cuts heuristically.
4. After the user has authorized the video edit, use the **default strict** staged pipeline:

```powershell
python "<skill-directory>\scripts\cut_silence.py" --video "D:\Videos\raw.mp4" --out "D:\Videos\cut.mp4" --keep 0.10 --min-sil 0.35
```

5. Only report success after exit code 0 and files appear. The wrapper creates four outputs (unless explicitly configured otherwise): `cut.mp4`, `cut.wav`, `cut.plan.json`, `cut.plan.timemap.json`. The source is not overwritten. If the wrapper exits nonzero, do **not** claim success; report its failing check.
6. If a video is static / low-information and strict verification cannot identify matching visual frames, tell the user what could not be verified. `--allow-inconclusive` is a user-approved exception, not a silent automatic retry. `--no-wav` and `--no-video-check` require this explicit flag; output is labeled limited-verification.

## Useful controls

| Flag | Default | Meaning |
|---|---:|---|
| `--keep` | 0.10 sec | Gap retained between spoken phrases |
| `--min-sil` | 0.35 sec | Ignore shorter detected silences |
| `--guard` | 0.03 sec | Protect both ends of each candidate gap |
| `--protect "12.5-19,44-50"` | none | Never cut selected source timeline intervals |
| `--protect-cuts` | off | Heuristically protect hard scene boundaries |
| `--trim-edges` | off | Permit cutting pauses at file beginning/end |
| `--crf` | 16 | H.264 video quality |
| `--preset` | medium | Encoding speed/efficiency |
| `--dry-run` | off | Preview, no media/plan writes |
| `--no-mux-audio` | off | Video without muxed AAC (WAV remains) |
| `--no-wav` | off | No lossless WAV: verification is limited |
| `--allow-inconclusive` | off | Only if user consents to weakened verification |

Advanced / standalone steps (generally avoid unless debugging):

```powershell
python "<skill-directory>\scripts\plan.py" --video "D:\Videos\raw.mp4" --plan "D:\Videos\cut.plan.json"
python "<skill-directory>\scripts\apply.py" --video "D:\Videos\raw.mp4" --plan "D:\Videos\cut.plan.json" --out "D:\Videos\cut.mp4"
python "<skill-directory>\scripts\verify.py" --video "D:\Videos\raw.mp4" --plan "D:\Videos\cut.plan.json" --out "D:\Videos\cut.mp4" --wav "D:\Videos\cut.wav" --strict
```

**Important:** `verify.py` **never** guesses a WAV path. Supply `--wav` explicitly or `--no-wav` (non-strict mode only). Never verify against an older adjacent WAV file. A version-1 plan cannot be used with v2 scripts; regenerate the plan from the source.

## Subtitle / effect cue remapping

After editing, original-timeline markers no longer line up. Prefer regenerating a transcript from the final video; otherwise use:

```powershell
python "<skill-directory>\scripts\remap.py" --timemap "D:\Videos\cut.plan.timemap.json" --srt "D:\Videos\orig.srt" --srt-out "D:\Videos\cut.srt"
```

All remap outputs must be **new** files. More details in `references/time-map.md`.

## Safety/limitations and help

Read `README.md` (installation), `SECURITY.md` (threat model/limits), `references/nguong-im-lang.md` (adaptive threshold), `references/vung-bao-ve.md` (protected regions), and `references/cac-cai-bay.md` (FFmpeg traps). Run `python -m unittest discover -s tests -v` in the skill folder to exercise regression tests. The upstream source supplied no explicit license; confirm redistribution permissions independently.
