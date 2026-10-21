#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const templateManifestPath = path.join(root, 'src', 'templates', 'manifest.json');
const templateManifest = JSON.parse(fs.readFileSync(templateManifestPath, 'utf8'));
const templateById = new Map(
  templateManifest.templates.map((template) => [template.id, template])
);

const flag = (name, fallback = null) => {
  const index = args.indexOf(`--${name}`);
  return index < 0 ? fallback : (args[index + 1] ?? fallback);
};

const printTemplateList = () => {
  console.log('Các template hiện có:');
  for (const template of templateManifest.templates) {
    console.log(`- ${template.id}: ${template.name} — ${template.description}`);
  }
};

if (args.includes('--help') || args.includes('-h')) {
  console.log(
    [
      'Tạo dữ liệu dự án từ SRT:',
      '  npm run prepare -- --topic "..." --srt input/voice.srt [--audio input/voice.mp3] [--assets input/assets] [--template vintage-editorial] [--slug ten-video] [--overwrite]',
      '',
      'Liệt kê template:',
      '  npm run templates',
    ].join('\n')
  );
  process.exit(0);
}

if (args.includes('--list-templates')) {
  printTemplateList();
  process.exit(0);
}

const isInsideWorkspace = (filePath) => {
  const relative = path.relative(root, filePath);
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
};

const resolveInputPath = (value, label) => {
  const resolved = path.resolve(root, value);
  if (!isInsideWorkspace(resolved)) {
    throw new Error(`${label} phải nằm trong workspace: ${value}`);
  }
  return resolved;
};

const topic = flag('topic', 'Video tư liệu');
const templateId = flag('template', 'vintage-editorial');
const template = templateById.get(templateId);
if (!template) {
  throw new Error(
    `Template không hợp lệ: ${templateId}. Dùng npm run templates để xem danh sách.`
  );
}

const slug = String(flag('slug', `project-${new Date().toISOString().slice(0, 10)}`))
  .toLowerCase()
  .replace(/[^a-z0-9_-]/g, '-')
  .replace(/^-+|-+$/g, '');
if (!slug) throw new Error('Slug không hợp lệ.');

const srtPath = resolveInputPath(flag('srt', 'input/demo.srt'), 'SRT');
const audioValue = flag('audio');
const audioSource = audioValue ? resolveInputPath(audioValue, 'Audio') : null;
const assetsValue = flag('assets', 'input/assets');
const assetsPath = assetsValue ? resolveInputPath(assetsValue, 'Thư mục ảnh') : null;

if (!fs.existsSync(srtPath) || !fs.statSync(srtPath).isFile()) {
  throw new Error(`Không tìm thấy file SRT: ${srtPath}`);
}
if (audioSource && (!fs.existsSync(audioSource) || !fs.statSync(audioSource).isFile())) {
  throw new Error(`Không tìm thấy file audio: ${audioSource}`);
}
if (assetsPath && !fs.existsSync(assetsPath)) {
  throw new Error(`Không tìm thấy thư mục ảnh: ${assetsPath}`);
}

const parseTime = (value) => {
  const match = value.trim().match(/^(\d{2,}):(\d{2}):(\d{2})[,.](\d{3})$/);
  if (!match || Number(match[2]) > 59 || Number(match[3]) > 59) {
    throw new Error(`Timestamp không hợp lệ: ${value}`);
  }
  return (
    (Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3])) * 1000 +
    Number(match[4])
  );
};

const rawSrt = fs
  .readFileSync(srtPath, 'utf8')
  .replace(/^\uFEFF/, '')
  .replace(/\r\n/g, '\n')
  .replace(/\r/g, '\n')
  .trim();

const captions = rawSrt.split(/\n\s*\n/).map((block) => {
  const lines = block
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  const timeIndex = lines.findIndex((line) => line.includes('-->'));
  if (timeIndex < 0) throw new Error(`Khối SRT không có -->: ${block}`);

  const timeMatch = lines[timeIndex].match(
    /^(.+?)\s*-->\s*(\d{2,}:\d{2}:\d{2}[,.]\d{3})/
  );
  if (!timeMatch) throw new Error(`Dòng thời gian sai: ${lines[timeIndex]}`);

  const startMs = parseTime(timeMatch[1]);
  const endMs = parseTime(timeMatch[2]);
  if (endMs <= startMs) throw new Error('Cue kết thúc trước khi bắt đầu.');

  const text = lines
    .slice(timeIndex + 1)
    .join(' ')
    .replace(/<[^>]*>/g, '')
    .trim();
  if (!text) throw new Error('Cue không có lời thoại.');

  return { startMs, endMs, text };
});

if (!captions.length) throw new Error('SRT không có cue.');
for (let index = 1; index < captions.length; index += 1) {
  if (captions[index].startMs < captions[index - 1].startMs) {
    throw new Error('Thứ tự SRT không tăng dần.');
  }
}

const fps = 30;
const durationInFrames = Math.ceil((captions.at(-1).endMs * fps) / 1000);
const mediaDir = path.join(root, 'public', 'media', slug);
const outputDir = path.join(root, 'output', slug);
const currentProjectPath = path.join(root, 'src', 'generated', 'current-project.json');
const storyboardPath = path.join(outputDir, 'storyboard.json');
const assetManifestPath = path.join(outputDir, 'asset-manifest.json');
const overwriteExisting = args.includes('--overwrite');
if (fs.existsSync(storyboardPath) && !overwriteExisting) {
  throw new Error(
    `Storyboard đã tồn tại: ${storyboardPath}. Chọn slug mới hoặc thêm --overwrite để tạo lại.`
  );
}
fs.mkdirSync(mediaDir, { recursive: true });
fs.mkdirSync(outputDir, { recursive: true });

const copiedSourceByMedia = new Map();
const copyFile = (source) => {
  const destination = path.join(mediaDir, path.basename(source));
  if (fs.existsSync(destination)) {
    const sameContents = fs.readFileSync(source).equals(fs.readFileSync(destination));
    if (!sameContents) {
      throw new Error(
        `Đích đã tồn tại với nội dung khác; chọn slug khác hoặc kiểm tra file: ${destination}`
      );
    }
  } else {
    fs.copyFileSync(source, destination);
  }
  const mediaPath = `media/${slug}/${path.basename(source)}`;
  copiedSourceByMedia.set(mediaPath, source);
  return mediaPath;
};

const audioPath = audioSource ? copyFile(audioSource) : null;
const copiedMedia = assetsPath
  ? fs
      .readdirSync(assetsPath, { withFileTypes: true })
      .filter((entry) => entry.isFile() && /\.(png|jpe?g|webp|mp4|webm)$/i.test(entry.name))
      .map((entry) => path.join(assetsPath, entry.name))
      .sort((left, right) => left.localeCompare(right))
      .map(copyFile)
  : [];
const images = copiedMedia.filter((media) => /\.(png|jpe?g|webp)$/i.test(media));
const videos = copiedMedia.filter((media) => /\.(mp4|webm)$/i.test(media));

// Bootstrap scenes are visual placeholders. The editor/agent should refine the
// narrative grouping and scene-specific copy before a video is rendered.
const beats = [];
let group = [];
for (const caption of captions) {
  if (group.length && caption.endMs - group[0].startMs > 7500) {
    beats.push(group);
    group = [];
  }
  group.push(caption);
}
if (group.length) beats.push(group);

const sceneTypes = template.bootstrapSceneTypes;
const scenes = beats.map((beat, index) => {
  const startMs = beat[0].startMs;
  const endMs = index < beats.length - 1 ? beats[index + 1][0].startMs : captions.at(-1).endMs;
  const startFrame = Math.round((startMs * fps) / 1000);
  const nextFrame =
    index === beats.length - 1 ? durationInFrames : Math.round((endMs * fps) / 1000);
  const typeIndex =
    beats.length === 1
      ? 0
      : Math.round((index / (beats.length - 1)) * (sceneTypes.length - 1));

  return {
    id: `scene-${String(index + 1).padStart(2, '0')}`,
    type: sceneTypes[typeIndex],
    title: index === 0 ? topic : beat.map((caption) => caption.text).join(' ').slice(0, 55),
    subtitle: topic,
    startFrame,
    durationFrames: Math.max(1, nextFrame - startFrame),
    images: images.length ? [images[index % images.length], images[(index + 1) % images.length]] : [],
    videos: videos.length ? [videos[index % videos.length]] : [],
    items: beat.map((caption) => caption.text).slice(0, 4),
  };
});

if (scenes[0].startFrame > 0) {
  scenes[0].durationFrames += scenes[0].startFrame;
  scenes[0].startFrame = 0;
}

const project = {
  version: 1,
  slug,
  topic,
  template: templateId,
  fps,
  width: 1080,
  height: 1920,
  durationInFrames,
  audioPath,
  audioSyncPolicy: 'srt-authoritative',
  captions,
  scenes,
};

const assetManifest = fs.existsSync(assetManifestPath)
  ? JSON.parse(fs.readFileSync(assetManifestPath, 'utf8'))
  : { version: 1, slug, assets: [] };
if (!Array.isArray(assetManifest.assets)) {
  throw new Error(`Asset manifest invalide, cần có mảng assets: ${assetManifestPath}`);
}
assetManifest.version ??= 1;
assetManifest.slug ??= slug;
const recordedFiles = new Set(assetManifest.assets.map((asset) => asset.file));
for (const mediaPath of copiedMedia) {
  if (recordedFiles.has(mediaPath)) continue;
  const sourcePath = copiedSourceByMedia.get(mediaPath);
  assetManifest.assets.push({
    file: mediaPath,
    input_path: sourcePath ? path.relative(root, sourcePath).replace(/\\/g, '/') : null,
    source_url: null,
    author: 'Người dùng cung cấp',
    license: 'Người dùng cung cấp; cần xác nhận quyền sử dụng',
    relevant_cues: [],
    review_status: 'needs-review',
  });
}
const serializedProject = `${JSON.stringify(project, null, 2)}\n`;
let activeProjectBackupPath = null;
if (fs.existsSync(currentProjectPath)) {
  const activeProjectText = fs.readFileSync(currentProjectPath, 'utf8');
  let activeProject;
  let needsBackup = true;
  try {
    activeProject = JSON.parse(activeProjectText);
    const activeSlug = String(activeProject.slug ?? 'active-project');
    const activeStoryboardPath = path.join(root, 'output', activeSlug, 'storyboard.json');
    if (fs.existsSync(activeStoryboardPath)) {
      const savedStoryboard = JSON.parse(fs.readFileSync(activeStoryboardPath, 'utf8'));
      needsBackup = JSON.stringify(activeProject) !== JSON.stringify(savedStoryboard);
    }
  } catch {
    activeProject = { slug: 'active-project' };
  }
  if (needsBackup) {
    const backupDir = path.join(root, 'output', 'archive', 'active-project-backups');
    fs.mkdirSync(backupDir, { recursive: true });
    const safeSlug = String(activeProject?.slug ?? 'active-project')
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-') || 'active-project';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    activeProjectBackupPath = path.join(
      backupDir,
      `${safeSlug}-before-${slug}-${timestamp}.json`
    );
    fs.copyFileSync(currentProjectPath, activeProjectBackupPath, fs.constants.COPYFILE_EXCL);
  }
}
fs.writeFileSync(currentProjectPath, serializedProject, 'utf8');
fs.writeFileSync(storyboardPath, serializedProject, 'utf8');
fs.writeFileSync(assetManifestPath, `${JSON.stringify(assetManifest, null, 2)}\n`, 'utf8');

console.log(`Template: ${template.name} (${templateId})`);
console.log(
  `Đã tạo storyboard: ${scenes.length} cảnh; ${captions.length} cue SRT; ${(durationInFrames / fps).toFixed(2)}s`
);
console.log(`Dữ liệu active: ${path.relative(root, currentProjectPath)}`);
console.log(`Storyboard: ${path.relative(root, storyboardPath)}`);
console.log(`Asset manifest: ${path.relative(root, assetManifestPath)}`);
if (activeProjectBackupPath) {
  console.log(`Đã lưu bản chụp project active trước đó: ${path.relative(root, activeProjectBackupPath)}`);
}
console.log('Storyboard khởi tạo cần được biên tập lại theo nhịp kể chuyện trước khi render.');
if (!audioPath) console.warn('CHƯA CÓ AUDIO: video sẽ không có lời đọc.');
