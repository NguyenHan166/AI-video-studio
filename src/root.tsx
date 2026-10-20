import React from 'react';
import { Composition } from 'remotion';
import projectData from './generated/current-project.json';
import { EditorialVideo } from './video';
import type { VideoProject } from './types';

const project = projectData as VideoProject;
export const Root: React.FC = () => (
  <Composition
    id="EditorialVideo"
    component={EditorialVideo}
    width={project.width}
    height={project.height}
    fps={project.fps}
    durationInFrames={project.durationInFrames}
    defaultProps={{ project }}
  />
);
