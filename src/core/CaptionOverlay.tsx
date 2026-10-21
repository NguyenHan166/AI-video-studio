import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import type { VideoProject } from './types';

export type CaptionTheme = {
  fontFamily: string;
  color: string;
  activeColor: string;
  fontWeight: number;
  horizontalPadding: number;
  bottomPadding: number;
  maxWidth: number;
  lineHeight: number;
  zIndex: number;
  textShadow?: string;
  activeTextShadow?: string;
  backgroundColor?: string;
  backdropFilter?: string;
  containerPadding?: string;
  borderRadius?: number;
  border?: string;
  boxShadow?: string;
};

export const CaptionOverlay: React.FC<{
  project: VideoProject;
  theme: CaptionTheme;
}> = ({ project, theme }) => {
  const frame = useCurrentFrame();
  const timeMs = (frame / project.fps) * 1000;
  const cue = project.captions.find(
    (caption) => timeMs >= caption.startMs && timeMs < caption.endMs
  );

  if (!cue) return null;

  const wordTimings = cue.wordTimings;
  const wordCount = wordTimings?.length ?? cue.text.split(/\s+/).filter(Boolean).length;
  const fontSize = wordCount > 18 ? 34 : wordCount > 12 ? 38 : 42;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: `0 ${theme.horizontalPadding}px ${theme.bottomPadding}px`,
        zIndex: theme.zIndex,
      }}
    >
      <div
        style={{
          maxWidth: theme.maxWidth,
          textAlign: 'center',
          lineHeight: theme.lineHeight,
          fontFamily: theme.fontFamily,
          fontSize,
          fontWeight: theme.fontWeight,
          color: theme.color,
          textShadow: theme.textShadow,
          backgroundColor: theme.backgroundColor,
          backdropFilter: theme.backdropFilter,
          padding: theme.containerPadding,
          borderRadius: theme.borderRadius,
          border: theme.border,
          boxShadow: theme.boxShadow,
        }}
      >
        {wordTimings?.length ? (
          wordTimings.map((word, index) => {
            const isActive = timeMs >= word.startMs && timeMs < word.endMs;
            return (
              <span
                key={`${word.startMs}-${index}`}
                style={{
                  display: 'inline-block',
                  margin: '0 5px',
                  color: isActive ? theme.activeColor : theme.color,
                  textShadow: isActive
                    ? theme.activeTextShadow ?? theme.textShadow
                    : theme.textShadow,
                }}
              >
                {word.text}
              </span>
            );
          })
        ) : (
          cue.text
        )}
      </div>
    </AbsoluteFill>
  );
};
