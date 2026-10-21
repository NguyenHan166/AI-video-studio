# -*- coding: utf-8 -*-
"""nns-cut-silence / cut_silence.py — chay ca 4 buoc mot phat.

    preflight -> plan -> apply -> verify

Bat ky buoc nao that bai thi DUNG NGAY, khong chay buoc sau.

Vi du:
    python scripts/cut_silence.py --video raw.mp4 --out cut.mp4
    python scripts/cut_silence.py --video raw.mp4 --out cut.mp4 --keep 0.14 --protect "12.5-19.0"
    python scripts/cut_silence.py --video raw.mp4 --out cut.mp4 --dry-run
"""
from __future__ import annotations

import argparse
import os
import subprocess
import shutil
import tempfile
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import _common as C  # noqa: E402

C.setup_io()


def step(name, args):
    cmd = [sys.executable, os.path.join(HERE, name)] + args
    print("")
    print(">>> " + " ".join(('"%s"' % c if " " in c else c) for c in cmd))
    rc = subprocess.call(cmd, stdin=subprocess.DEVNULL)
    if rc != 0:
        print("")
        print("  DUNG LAI o buoc %s (ma thoat %d). Khong chay buoc sau." % (name, rc))
        print("")
        sys.exit(rc)


def main():
    ap = argparse.ArgumentParser(add_help=True)
    ap.add_argument("--video", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--resources", default=None, help="khong can cho skill nay")
    ap.add_argument("--plan", default=None)
    ap.add_argument("--dry-run", dest="dry_run", action="store_true")
    # tham so cua plan.py
    ap.add_argument("--keep", default=None)
    ap.add_argument("--guard", default=None)
    ap.add_argument("--min-sil", dest="min_sil", default=None)
    ap.add_argument("--threshold-db", dest="threshold_db", default=None)
    ap.add_argument("--max-drop-peak-db", dest="max_drop_peak_db", default=None)
    ap.add_argument("--protect", default=None)
    ap.add_argument("--protect-cuts", dest="protect_cuts", action="store_true")
    ap.add_argument("--protect-cut-pad", dest="protect_cut_pad", default=None)
    ap.add_argument("--scene-threshold", dest="scene_threshold", default=None)
    ap.add_argument("--trim-edges", dest="trim_edges", action="store_true")
    ap.add_argument("--allow-vfr", dest="allow_vfr", action="store_true")
    # tham so cua apply.py
    ap.add_argument("--crf", default=None)
    ap.add_argument("--preset", default=None)
    ap.add_argument("--no-wav", dest="no_wav", action="store_true")
    ap.add_argument("--no-mux-audio", dest="no_mux_audio", action="store_true")
    ap.add_argument("--allow-no-audio", dest="allow_no_audio", action="store_true")
    # tham so cua verify.py
    ap.add_argument("--no-video-check", dest="no_video_check", action="store_true")
    ap.add_argument("--allow-inconclusive", action="store_true",
                    help="cho phep verify khong du WAV/frame de ket luan; ket qua chi duoc gan nhan gioi han")
    a = ap.parse_args()

    plan_path = os.path.abspath(a.plan or (os.path.splitext(a.out)[0] + ".plan.json"))
    tm_path = os.path.splitext(plan_path)[0] + ".timemap.json"
    out_path = os.path.abspath(a.out)
    if os.path.splitext(out_path)[1].lower() not in (".mp4", ".mov", ".mkv"):
        C.die("--out can ket thuc bang .mp4, .mov hoac .mkv.")
    wav_path = os.path.splitext(out_path)[0] + ".wav" if not a.no_wav else None

    # Never publish to the source path or overwrite an existing file (including stale WAV).
    if not a.dry_run:
        C.assert_new_outputs({"source video": a.video},
                             {"video": out_path, "WAV": wav_path,
                              "plan": plan_path, "timemap": tm_path})
    pre_args = ["--video", a.video, "--out", out_path]
    if a.allow_vfr:
        pre_args.append("--allow-vfr")
    step("preflight.py", pre_args)

    # Dry-run never creates a staging folder or writes media / JSON.
    if a.dry_run:
        plan_args = ["--video", a.video, "--plan", plan_path,
                     "--out", out_path, "--dry-run"]
        for flag, val in (("--keep", a.keep), ("--guard", a.guard), ("--min-sil", a.min_sil),
                          ("--threshold-db", a.threshold_db),
                          ("--max-drop-peak-db", a.max_drop_peak_db),
                          ("--protect", a.protect),
                          ("--protect-cut-pad", a.protect_cut_pad),
                          ("--scene-threshold", a.scene_threshold)):
            if val is not None:
                plan_args += [flag, str(val)]
        for flag, on in (("--protect-cuts", a.protect_cuts), ("--trim-edges", a.trim_edges),
                         ("--allow-vfr", a.allow_vfr)):
            if on:
                plan_args.append(flag)
        step("plan.py", plan_args)
        print("\n  DRY-RUN: khong tao file nao.\n")
        return

    if a.no_wav and a.no_mux_audio and not a.allow_no_audio:
        C.die("Khong duoc tat ca WAV va mux audio neu thieu --allow-no-audio.")
    if (a.no_wav or a.no_video_check or (a.no_mux_audio and a.no_wav)) and not a.allow_inconclusive:
        C.die("Che do bo qua kiem tra yeu cau --allow-inconclusive; khuyen dung WAV va kiem tra video.")

    out_dir = os.path.dirname(out_path)
    os.makedirs(out_dir, exist_ok=True)
    stage = tempfile.mkdtemp(prefix=".nns-stage-", dir=out_dir)
    try:
        stage_plan = os.path.join(stage, "cut.plan.json")
        stage_tm = os.path.join(stage, "cut.plan.timemap.json")
        stage_video = os.path.join(stage, "cut" + os.path.splitext(out_path)[1])
        stage_wav = os.path.join(stage, "cut.wav") if wav_path else None

        plan_args = ["--video", a.video, "--plan", stage_plan,
                     "--timemap", stage_tm, "--out", out_path]
        for flag, val in (("--keep", a.keep), ("--guard", a.guard), ("--min-sil", a.min_sil),
                          ("--threshold-db", a.threshold_db),
                          ("--max-drop-peak-db", a.max_drop_peak_db),
                          ("--protect", a.protect),
                          ("--protect-cut-pad", a.protect_cut_pad),
                          ("--scene-threshold", a.scene_threshold)):
            if val is not None:
                plan_args += [flag, str(val)]
        for flag, on in (("--protect-cuts", a.protect_cuts), ("--trim-edges", a.trim_edges),
                         ("--allow-vfr", a.allow_vfr)):
            if on:
                plan_args.append(flag)
        step("plan.py", plan_args)

        apply_args = ["--video", a.video, "--plan", stage_plan, "--out", stage_video]
        if stage_wav:
            apply_args += ["--wav", stage_wav]
        for flag, val in (("--crf", a.crf), ("--preset", a.preset)):
            if val is not None:
                apply_args += [flag, str(val)]
        for flag, on in (("--no-wav", a.no_wav), ("--no-mux-audio", a.no_mux_audio),
                         ("--allow-no-audio", a.allow_no_audio)):
            if on:
                apply_args.append(flag)
        step("apply.py", apply_args)

        verify_args = ["--video", a.video, "--plan", stage_plan, "--out", stage_video]
        if stage_wav:
            verify_args += ["--wav", stage_wav]
        else:
            verify_args.append("--no-wav")
        if not a.allow_inconclusive:
            verify_args.append("--strict")
        if a.no_video_check:
            verify_args.append("--no-video-check")
        if a.allow_no_audio and a.no_wav and a.no_mux_audio:
            verify_args.append("--allow-no-audio")
        step("verify.py", verify_args)

        # Verify again that the source did not change after all FFmpeg processing.
        C.validate_plan_source(C.read_json(stage_plan), a.video)
        C.assert_new_outputs({"source video": a.video},
                             {"video": out_path, "WAV": wav_path,
                              "plan": plan_path, "timemap": tm_path})
        artifacts = [(stage_plan, plan_path), (stage_tm, tm_path)]
        if stage_wav:
            artifacts.append((stage_wav, wav_path))
        artifacts.append((stage_video, out_path))   # video published LAST
        created = []
        try:
            for src, target in artifacts:
                C.publish_no_replace(src, target)
                created.append(target)
        except BaseException:
            # Best effort rollback: no user-existing path was ever replaced.
            for target in reversed(created):
                try:
                    os.unlink(target)
                except OSError:
                    pass
            raise
    finally:
        shutil.rmtree(stage, ignore_errors=True)

    print("\n  HOAN TAT: da verify truoc khi cong bo, khong ghi de.\n")
    for label, path in (("video", out_path), ("WAV", wav_path),
                        ("plan", plan_path), ("timemap", tm_path)):
        if path:
            print("    %-10s %s" % (label, path))
    if a.allow_inconclusive:
        print("  CANH BAO: --allow-inconclusive duoc bat; doc warning cua verify de biet gioi han.")
    print("")


if __name__ == "__main__":
    main()
