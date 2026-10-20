import { spawnSync } from 'node:child_process';

const frames = [
  [120, 'preview-01-cover.png'],
  [600, 'preview-02-timeline.png'],
  [1050, 'preview-03-photo-story.png'],
  [1450, 'preview-04-photo-stack.png'],
  [1800, 'preview-05-photo-story-chualuong.png'],
  [2040, 'preview-06-statistic.png'],
  [2350, 'preview-07-ending.png'],
];

for (const [frame, file] of frames) {
  console.log(`Rendering frame ${frame} -> output/${file}...`);
  const res = spawnSync(
    'npx.cmd',
    [
      'remotion',
      'still',
      'src/index.ts',
      'EditorialVideo',
      `output/${file}`,
      `--frame=${frame}`,
      '--overwrite'
    ],
    { stdio: 'inherit', shell: true }
  );
  if (res.status !== 0) {
    console.error(`Error rendering frame ${frame}`);
    process.exit(1);
  }
}

console.log('All stills rendered successfully!');
