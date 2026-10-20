import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { THEME } from './theme';
import { ILLUSTRATED_THEME } from './theme-illustrated';
import { CYBER_THEME } from './theme-cyber';
import type { VideoProject } from './types';
import { EditorialScene } from './scenes';
import { IllustratedScene } from './scenes-illustrated';
import { CyberScene } from './scenes-cyber';

// ==========================================
// CAPTION BAR: VINTAGE EDITORIAL
// ==========================================

const CaptionBar: React.FC<{ project: VideoProject }> = ({ project }) => {
  const frame = useCurrentFrame();
  const tMs = (frame / project.fps) * 1000;
  const cue = project.captions.find((c) => tMs >= c.startMs && tMs < c.endMs);
  if (!cue) return null;

  const words = cue.text.split(/\s+/).filter(Boolean);
  const cueDuration = Math.max(1, cue.endMs - cue.startMs);
  const progress = Math.max(0, Math.min(1, (tMs - cue.startMs) / cueDuration));
  const activeWordIndex = Math.min(
    words.length - 1,
    Math.floor(progress * words.length)
  );

  const fontSize = words.length > 18 ? 34 : words.length > 12 ? 38 : 42;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '0 75px 115px',
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 930,
          textAlign: 'center',
          lineHeight: 1.4,
        }}
      >
        {words.map((word, idx) => {
          const isActive = idx === activeWordIndex;
          return (
            <span
              key={idx}
              style={{
                display: 'inline-block',
                margin: '0 5px',
                fontFamily: THEME.fontBody,
                fontSize,
                fontWeight: isActive ? 800 : 700,
                color: isActive ? THEME.brick : THEME.subtle,
                textShadow: '0 1px 3px rgba(255, 255, 255, 0.9)',
                transition: 'color 0.08s ease, transform 0.08s ease',
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// CAPTION BAR: ILLUSTRATED PAPER (VẼ TAY)
// ==========================================

const IllustratedCaptionBar: React.FC<{ project: VideoProject }> = ({ project }) => {
  const frame = useCurrentFrame();
  const tMs = (frame / project.fps) * 1000;
  const cue = project.captions.find((c) => tMs >= c.startMs && tMs < c.endMs);
  if (!cue) return null;

  const words = cue.text.split(/\s+/).filter(Boolean);
  const cueDuration = Math.max(1, cue.endMs - cue.startMs);
  const progress = Math.max(0, Math.min(1, (tMs - cue.startMs) / cueDuration));
  const activeWordIndex = Math.min(
    words.length - 1,
    Math.floor(progress * words.length)
  );

  const fontSize = words.length > 18 ? 34 : words.length > 12 ? 38 : 42;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '0 80px 140px',
        zIndex: 60,
      }}
    >
      <div
        style={{
          maxWidth: 920,
          textAlign: 'center',
          lineHeight: 1.45,
        }}
      >
        {words.map((word, idx) => {
          const isActive = idx === activeWordIndex;
          return (
            <span
              key={idx}
              style={{
                display: 'inline-block',
                margin: '0 5px',
                fontFamily: ILLUSTRATED_THEME.fontBody,
                fontSize,
                fontWeight: 800,
                color: isActive ? ILLUSTRATED_THEME.blue : ILLUSTRATED_THEME.inkSecondary,
                textShadow: '0 1px 2px rgba(255, 255, 255, 0.95)',
                transition: 'color 0.06s ease',
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// CAPTION BAR: CYBER SECURITY & SCAM ALERT
// High-tech emergency contrast subtitle
// ==========================================

const CyberCaptionBar: React.FC<{ project: VideoProject }> = ({ project }) => {
  const frame = useCurrentFrame();
  const tMs = (frame / project.fps) * 1000;
  const cue = project.captions.find((c) => tMs >= c.startMs && tMs < c.endMs);
  if (!cue) return null;

  const words = cue.text.split(/\s+/).filter(Boolean);
  const cueDuration = Math.max(1, cue.endMs - cue.startMs);
  const progress = Math.max(0, Math.min(1, (tMs - cue.startMs) / cueDuration));
  const activeWordIndex = Math.min(
    words.length - 1,
    Math.floor(progress * words.length)
  );

  const fontSize = words.length > 18 ? 34 : words.length > 12 ? 38 : 42;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '0 75px 140px',
        zIndex: 60,
      }}
    >
      <div
        style={{
          maxWidth: 920,
          textAlign: 'center',
          lineHeight: 1.45,
          backgroundColor: 'rgba(8, 11, 17, 0.75)',
          backdropFilter: 'blur(8px)',
          padding: '16px 28px',
          borderRadius: 16,
          border: '1.5px solid rgba(0, 242, 254, 0.25)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
        }}
      >
        {words.map((word, idx) => {
          const isActive = idx === activeWordIndex;
          return (
            <span
              key={idx}
              style={{
                display: 'inline-block',
                margin: '0 5px',
                fontFamily: CYBER_THEME.fontDisplay,
                fontSize,
                fontWeight: 800,
                // Active word pops in bright hazard yellow with neon glow
                color: isActive ? '#FDE047' : '#F8FAFC',
                textShadow: isActive
                  ? '0 0 14px rgba(253, 224, 71, 0.8)'
                  : '0 2px 4px rgba(0, 0, 0, 0.8)',
                transition: 'color 0.06s ease',
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// MASTER EDITORIAL VIDEO COMPOSITION
// ==========================================

export const EditorialVideo: React.FC<{ project: VideoProject }> = ({
  project,
}) => {
  const template = project.template;

  let bgColor: string = THEME.paper;
  if (template === 'illustrated-paper-textured') {
    bgColor = ILLUSTRATED_THEME.paper;
  } else if (template === 'cyber-security-alert') {
    bgColor = CYBER_THEME.bgDark;
  }

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor }}>
      {/* Global Google Fonts Link for exact typography rendering */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@600;700;800&family=Nunito:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Plus+Jakarta+Sans:wght@600;700;800;900&display=swap');
      `}</style>

      {/* Render Scenes Based on Selected Template */}
      {project.scenes.map((scene, i) => (
        <Sequence
          key={scene.id}
          from={scene.startFrame}
          durationInFrames={scene.durationFrames}
        >
          {template === 'cyber-security-alert' ? (
            <CyberScene
              scene={scene}
              index={i}
              total={project.scenes.length}
            />
          ) : template === 'illustrated-paper-textured' ? (
            <IllustratedScene
              scene={scene}
              index={i}
              total={project.scenes.length}
            />
          ) : (
            <EditorialScene
              scene={scene}
              index={i}
              total={project.scenes.length}
            />
          )}
        </Sequence>
      ))}

      {/* Audio Playback */}
      {project.audioPath ? <Audio src={staticFile(project.audioPath)} /> : null}

      {/* Subtitles Overlay */}
      {template === 'cyber-security-alert' ? (
        <CyberCaptionBar project={project} />
      ) : template === 'illustrated-paper-textured' ? (
        <IllustratedCaptionBar project={project} />
      ) : (
        <CaptionBar project={project} />
      )}
    </AbsoluteFill>
  );
};
