import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useVideoConfig,
} from 'remotion';
import type { VideoProject } from './types';
import { TEMPLATE_REGISTRY } from '../templates/registry';

export const VideoComposition: React.FC<{ project: VideoProject }> = ({
  project,
}) => {
  const template = TEMPLATE_REGISTRY[project.template];
  const { fps } = useVideoConfig();

  if (!template) {
    throw new Error(`Unknown video template: ${project.template}`);
  }

  const { Scene, Caption } = template;

  return (
    <AbsoluteFill style={{ backgroundColor: template.backgroundColor }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@600;700;800&family=Nunito:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Plus+Jakarta+Sans:wght@600;700;800;900&display=swap');
      `}</style>

      {project.scenes.map((scene, index) => (
        <Sequence
          key={scene.id}
          from={scene.startFrame}
          durationInFrames={scene.durationFrames}
          premountFor={fps}
        >
          <Scene scene={scene} index={index} total={project.scenes.length} />
        </Sequence>
      ))}

      {project.audioPath ? <Audio src={staticFile(project.audioPath)} /> : null}

      <Caption project={project} theme={template.captionTheme} />
    </AbsoluteFill>
  );
};
