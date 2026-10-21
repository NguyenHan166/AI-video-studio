# -*- coding: utf-8 -*-
"""Safety regression tests: run `python -m unittest discover -s tests -v`."""
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = ROOT / 'scripts'
sys.path.insert(0, str(SCRIPTS))
import _common as C


class SafetyTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.home = Path(self.temp.name)
        self.src = self.home / 'source.mp4'
        self.src.write_bytes(b'important original media bytes')

    def test_no_overwrite_source(self):
        with self.assertRaises(SystemExit):
            C.assert_new_outputs({'source': self.src}, {'output': self.src})
        self.assertEqual(self.src.read_bytes(), b'important original media bytes')

    def test_no_overwrite_existing(self):
        dest = self.home / 'result.mp4'
        dest.write_bytes(b'existing output')
        with self.assertRaises(SystemExit):
            C.assert_new_outputs({'source': self.src}, {'output': dest})
        self.assertEqual(dest.read_bytes(), b'existing output')

    def test_no_alias_relative_absolute(self):
        with self.assertRaises(SystemExit):
            C.assert_new_outputs({'source': self.src}, {'output': self.home / '.' / 'source.mp4'})

    def test_outputs_cannot_collide_with_each_other(self):
        with self.assertRaises(SystemExit):
            C.assert_new_outputs({'source': self.src}, {'video': self.home/'cut.mp4', 'wav': self.home/'cut.mp4'})

    def test_json_write_exclusive(self):
        dest = self.home / 'state.json'
        C.write_json(dest, {'x': 1})
        with self.assertRaises(FileExistsError):
            C.write_json(dest, {'x': 2})
        self.assertEqual(json.loads(dest.read_text()), {'x': 1})

    def test_publish_no_replace(self):
        staging = self.home / 'staging.txt'
        dest = self.home / 'final.txt'
        staging.write_text('new')
        dest.write_text('old')
        with self.assertRaises(SystemExit):
            C.publish_no_replace(staging, dest)
        self.assertEqual(dest.read_text(), 'old')

    def test_sha256_rejects_wrong_media(self):
        valid = C.source_identity(self.src)
        plan = {'plan_version': C.PLAN_VERSION, 'video': valid}
        C.validate_plan_source(plan, self.src)
        self.src.write_bytes(b'changed file with identical len!'[:len(self.src.read_bytes())])
        with self.assertRaises(SystemExit):
            C.validate_plan_source(plan, self.src)

    def test_sha256_rejects_legacy_plans(self):
        with self.assertRaises(SystemExit):
            C.validate_plan_source({'plan_version': 1, 'video': {}}, self.src)

    def test_remap_never_overwrites_input(self):
        tm = self.home/'map.json'
        tm.write_text(json.dumps({'skill': C.SKILL_NAME, 'segments': [], 'removed': []}))
        cmd = [sys.executable, str(SCRIPTS/'remap.py'), '--timemap', str(tm),
               '--json', str(tm), '--json-out', str(tm)]
        proc = subprocess.run(cmd, capture_output=True)
        self.assertNotEqual(proc.returncode, 0)
        self.assertIn(b'segments', tm.read_bytes())


@unittest.skipUnless(shutil.which('ffmpeg') and shutil.which('ffprobe'), 'FFmpeg not available')
class IntegrationTests(unittest.TestCase):
    def test_end_to_end_and_guards(self):
        try:
            import numpy
        except ImportError:
            self.skipTest('NumPy unavailable')
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            src = root/'source.mkv'
            out = root/'cut.mp4'
            signal = 'aevalsrc=if(between(t\\,0.8\\,1.5)+between(t\\,2.6\\,3.5)\\,0\\,0.2*sin(2*PI*440*t)):s=48000:d=5'
            cmd = [shutil.which('ffmpeg'), '-v', 'error', '-nostdin', '-n',
                   '-f', 'lavfi', '-i', 'testsrc2=size=128x96:rate=30:duration=5',
                   '-f', 'lavfi', '-i', signal,
                   '-c:v', 'libx264', '-preset', 'ultrafast', '-pix_fmt', 'yuv420p',
                   '-c:a', 'pcm_s16le', '-shortest', str(src)]
            subprocess.run(cmd, check=True, capture_output=True)
            main = [sys.executable, str(SCRIPTS/'cut_silence.py'), '--video', str(src),
                    '--out', str(out), '--preset', 'ultrafast']
            result = subprocess.run(main, capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stdout[-4000:] + result.stderr)
            self.assertTrue(out.exists())
            self.assertTrue((root/'cut.wav').exists())
            plan = json.loads((root/'cut.plan.json').read_text('utf-8'))
            self.assertEqual(plan['video']['sha256'], C.sha256_file(src))
            self.assertGreater(plan['expected']['cuts'], 0)
            original = C.sha256_file(out)
            again = subprocess.run(main, capture_output=True)
            self.assertNotEqual(again.returncode, 0)
            self.assertEqual(original, C.sha256_file(out))
            self.assertEqual(len(list(root.glob('.nns-stage-*'))), 0)
            # Collision with an old WAV refuses before writing any new media.
            oldwav = root/'new-cut.wav'
            oldwav.write_bytes(b'old WAV must survive')
            collision = subprocess.run([sys.executable, str(SCRIPTS/'cut_silence.py'),
                '--video', str(src), '--out', str(root/'new-cut.mp4')], capture_output=True)
            self.assertNotEqual(collision.returncode, 0)
            self.assertEqual(oldwav.read_bytes(), b'old WAV must survive')
            self.assertFalse((root/'new-cut.mp4').exists())
            # Dry run writes no video, plan or timemap files.
            dry = subprocess.run([sys.executable, str(SCRIPTS/'cut_silence.py'),
                '--video', str(src), '--out', str(root/'preview.mp4'), '--dry-run'],
                capture_output=True)
            self.assertEqual(dry.returncode, 0, dry.stderr.decode('utf-8', 'replace'))
            self.assertFalse((root/'preview.mp4').exists())
            self.assertFalse((root/'preview.plan.json').exists())
            # Explicit source guard even when plan and source have identical fps/nb_frames
            other = root/'other.mkv'
            other.write_bytes(b'changed source')
            bad = subprocess.run([sys.executable, str(SCRIPTS/'apply.py'),
                '--video', str(other), '--plan', str(root/'cut.plan.json'),
                '--out', str(root/'different.mp4')], capture_output=True)
            self.assertNotEqual(bad.returncode, 0)
            self.assertFalse((root/'different.mp4').exists())
            # Standalone strict verification requires explicit WAV; do not use stale WAV automatically.
            no_wav = subprocess.run([sys.executable, str(SCRIPTS/'verify.py'),
                '--video', str(src), '--out', str(out), '--plan', str(root/'cut.plan.json'),
                '--strict'], capture_output=True)
            self.assertNotEqual(no_wav.returncode, 0)


if __name__ == '__main__':
    unittest.main()
