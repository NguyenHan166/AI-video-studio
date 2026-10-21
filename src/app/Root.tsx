import React from 'react';
import { Composition } from 'remotion';
import projectData from '../generated/current-project.json';
import { VideoComposition } from '../core/VideoComposition';
import type { VideoProject } from '../core/types';

const project = projectData as VideoProject;
export const Root: React.FC = () => (
  <Composition
    id="EditorialVideo"
    component={VideoComposition}
    width={project.width}
    height={project.height}
    fps={project.fps}
    durationInFrames={project.durationInFrames}
    defaultProps={{ project }}
  />
);
