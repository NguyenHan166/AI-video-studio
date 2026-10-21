import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectPath = path.join(root, 'src', 'generated', 'current-project.json');
const manifestPath = path.join(root, 'src', 'templates', 'manifest.json');
const project = JSON.parse(fs.readFileSync(projectPath, 'utf8'));
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const templates = new Map(manifest.templates.map((template) => [template.id, template]));
let hasErrors = false;

const fail = (message) => {
  hasErrors = true;
  console.error(`LỖI: ${message}`);
};

const warn = (message) => console.warn(`CẢNH BÁO: ${message}`);

const isWithin = (parent, candidate) => {
  const relative = path.relative(parent, candidate);
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
};

if (project.fps !== 30 || project.width !== 1080 || project.height !== 1920) {
  fail('Thông số video phải là 1080x1920 ở 30fps.');
}
if (!templates.has(project.template)) {
  fail(`Template không hợp lệ: ${project.template}`);
}
if (project.audioSyncPolicy !== 'srt-authoritative') {
  fail('audioSyncPolicy phải được đặt rõ là srt-authoritative.');
}
if (!Array.isArray(project.captions) || project.captions.length === 0) {
  fail('Chưa có captions.');
}
if (!Array.isArray(project.scenes) || project.scenes.length === 0) {
  fail('Chưa có scenes.');
}
if (!Number.isInteger(project.durationInFrames) || project.durationInFrames < 1) {
  fail('durationInFrames không hợp lệ.');
}

let maxCaptionEndMs = 0;
for (let index = 0; index < (project.captions ?? []).length; index += 1) {
  const caption = project.captions[index];
  if (!(Number.isFinite(caption.startMs) && caption.startMs >= 0 && caption.endMs > caption.startMs)) {
    fail(`Caption ${index + 1} có timestamp không hợp lệ.`);
    continue;
  }
  if (index > 0 && caption.startMs < project.captions[index - 1].startMs) {
    fail(`Caption ${index + 1} không theo thứ tự thời gian.`);
  }
  if (index > 0 && caption.startMs < project.captions[index - 1].endMs) {
    warn(`Caption ${index + 1} chồng thời gian với cue trước.`);
  }
  if (!String(caption.text ?? '').trim()) fail(`Caption ${index + 1} không có nội dung.`);

  let previousWordEndMs = caption.startMs;
  for (const [wordIndex, word] of (caption.wordTimings ?? []).entries()) {
    if (!(word.startMs >= caption.startMs && word.endMs > word.startMs && word.endMs <= caption.endMs)) {
      fail(`Word timing ${wordIndex + 1} vượt ngoài caption ${index + 1}.`);
    }
    if (word.startMs < previousWordEndMs) {
      fail(`Word timing ${wordIndex + 1} không theo thứ tự trong caption ${index + 1}.`);
    }
    previousWordEndMs = word.endMs;
  }

  maxCaptionEndMs = Math.max(maxCaptionEndMs, caption.endMs);
}

const minimumDuration = Math.ceil((maxCaptionEndMs * project.fps) / 1000);
if (project.durationInFrames < minimumDuration) {
  fail(`Timeline kết thúc trước cue cuối (cần ít nhất ${minimumDuration} frames).`);
}

const template = templates.get(project.template);
const publicRoot = path.join(root, 'public');
let expectedSceneStart = 0;
for (const scene of project.scenes ?? []) {
  if (!template?.sceneTypes.includes(scene.type)) {
    fail(`Scene ${scene.id}: type ${scene.type} không thuộc template ${project.template}.`);
  }
  if (scene.startFrame !== expectedSceneStart) {
    fail(`Scene ${scene.id}: timeline hở/chồng tại frame ${expectedSceneStart}.`);
  }
  if (!Number.isInteger(scene.durationFrames) || scene.durationFrames < 1) {
    fail(`Scene ${scene.id}: duration không hợp lệ.`);
  }
  expectedSceneStart = scene.startFrame + scene.durationFrames;

  for (const asset of scene.images ?? []) {
    const assetPath = path.resolve(publicRoot, asset);
    if (!isWithin(publicRoot, assetPath)) {
      fail(`Asset nằm ngoài public/: ${asset}`);
    } else if (!fs.existsSync(assetPath)) {
      fail(`Thiếu ảnh: ${asset}`);
    }
  }
  for (const asset of scene.videos ?? []) {
    const assetPath = path.resolve(publicRoot, asset);
    if (!isWithin(publicRoot, assetPath)) {
      fail(`Video asset nằm ngoài public/: ${asset}`);
    } else if (!fs.existsSync(assetPath)) {
      fail(`Thiếu video: ${asset}`);
    }
  }
}

if (expectedSceneStart !== project.durationInFrames) {
  fail(`Scene kết thúc ở frame ${expectedSceneStart}, duration tổng là ${project.durationInFrames}.`);
}

if (project.audioPath) {
  const audioPath = path.resolve(publicRoot, project.audioPath);
  if (!isWithin(publicRoot, audioPath)) {
    fail(`Audio nằm ngoài public/: ${project.audioPath}`);
  } else if (!fs.existsSync(audioPath)) {
    fail(`Thiếu audio: ${project.audioPath}`);
  } else {
    try {
      const info = JSON.parse(
        execFileSync(
          'ffprobe',
          ['-v', 'error', '-show_entries', 'format=duration', '-of', 'json', audioPath],
          { encoding: 'utf8' }
        )
      );
      const audioMs = 1000 * Number(info.format?.duration);
      const differenceMs = Math.abs(audioMs - maxCaptionEndMs);
      if (Number.isFinite(audioMs) && differenceMs > 500) {
        warn(
          `Audio và SRT lệch ${(differenceMs / 1000).toFixed(2)}s. Chính sách ${project.audioSyncPolicy}: giữ duration theo SRT, không time-stretch; audio có thể có phần đuôi bị cắt hoặc khoảng lặng.`
        );
      }
    } catch (error) {
      warn(`Không kiểm tra được audio bằng ffprobe: ${error.message}`);
    }
  }
}

if (hasErrors) process.exitCode = 1;
else console.log('OK: template, captions, timeline và đường dẫn tài nguyên hợp lệ.');
