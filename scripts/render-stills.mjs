import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectPath = path.join(root, 'src', 'generated', 'current-project.json');
if (!fs.existsSync(projectPath)) {
  throw new Error(`Không tìm thấy project: ${projectPath}`);
}

const project = JSON.parse(fs.readFileSync(projectPath, 'utf8'));
const slug = String(project.slug || 'video').replace(/[^a-zA-Z0-9_-]/g, '-');
const previewDir = path.join(root, 'output', slug, 'previews');
const passthroughArgs = process.argv.slice(2);
fs.mkdirSync(previewDir, { recursive: true });

const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
for (const scene of project.scenes ?? []) {
  const midpoint = scene.startFrame + Math.floor(scene.durationFrames / 2);
  const frame = Math.max(0, Math.min(project.durationInFrames - 1, midpoint));
  const outputPath = path.join(previewDir, `${scene.id}.png`);
  const args = [
    'remotion',
    'still',
    'src/index.ts',
    'EditorialVideo',
    outputPath,
    `--frame=${frame}`,
    '--overwrite',
    ...passthroughArgs,
  ];

  console.log(`Scene ${scene.id}: frame ${frame} -> ${path.relative(root, outputPath)}`);
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.error) throw result.error;
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log(`Đã tạo ${project.scenes?.length ?? 0} preview trong ${path.relative(root, previewDir)}.`);
