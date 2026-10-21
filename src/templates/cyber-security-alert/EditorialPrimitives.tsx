import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import type { Scene } from '../../core/types';
import { CYBER_THEME as T } from './theme';

export const SceneFrame: React.FC<{
  children: React.ReactNode;
  index: number;
  total: number;
  kicker?: string;
  threatLevel?: string;
}> = ({ children, index, total, kicker, threatLevel }) => {
  const progress = total <= 1 ? 1 : (index + 1) / total;
  const page = String(index + 1).padStart(2, '0');
  const pages = String(total).padStart(2, '0');

  return (
    <AbsoluteFill style={{ backgroundColor: T.paper, color: T.ink, overflow: 'hidden' }}>
      {/* Quiet paper grain and the faint circular line motif seen in the reference. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.35,
          backgroundImage:
            'radial-gradient(rgba(87, 75, 57, 0.09) 0.55px, transparent 0.75px)',
          backgroundSize: '8px 8px',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 175,
          right: -265,
          width: 530,
          height: 530,
          border: `1px solid ${T.rule}`,
          borderRadius: '50%',
          opacity: 0.58,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 215,
          right: -225,
          width: 450,
          height: 450,
          border: `1px solid ${T.rule}`,
          borderRadius: '50%',
          opacity: 0.38,
          pointerEvents: 'none',
        }}
      />

      <header
        style={{
          position: 'absolute',
          top: 45,
          left: 62,
          right: 62,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${T.ink}`,
          zIndex: 5,
          fontFamily: T.fontBody,
          fontSize: 17,
          fontWeight: 800,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 10, height: 10, backgroundColor: T.brick, display: 'inline-block' }} />
          <span>AN TOÀN SỐ</span>
        </div>
        <div style={{ color: T.inkSoft, fontSize: 15, fontWeight: 700, letterSpacing: 1.1 }}>
          NHẬN BIẾT · KIỂM CHỨNG · BẢO VỆ
        </div>
      </header>

      <div
        style={{
          position: 'absolute',
          top: 113,
          left: 62,
          right: 62,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 5,
          fontFamily: T.fontBody,
          fontSize: 15,
          fontWeight: 800,
          letterSpacing: 1.2,
          color: T.inkSoft,
          textTransform: 'uppercase',
        }}
      >
        <span>AN NINH SỐ · CẨM NANG CẢNH GIÁC</span>
        <span style={{ color: threatLevel ? T.brick : T.inkSoft }}>
          {threatLevel || `${page} / ${pages}`}
        </span>
      </div>

      {/* Slim numbered spine replaces the reference's long story index. */}
      <div
        style={{
          position: 'absolute',
          top: 174,
          left: 48,
          width: 42,
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
          fontFamily: T.fontMono,
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 800, color: T.brick }}>{page}</span>
        <div style={{ height: 250, width: 2, backgroundColor: T.rule, position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: `${progress * 100}%`,
              backgroundColor: T.brick,
            }}
          />
        </div>
        <span style={{ fontSize: 13, color: T.inkFaint }}>{pages}</span>
      </div>

      <main
        style={{
          position: 'absolute',
          inset: '160px 72px 350px 122px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          zIndex: 2,
        }}
      >
        {children}
      </main>

      <footer
        style={{
          position: 'absolute',
          left: 62,
          right: 62,
          bottom: 52,
          height: 42,
          borderTop: `1px solid ${T.rule}`,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          zIndex: 4,
          color: T.inkFaint,
          fontFamily: T.fontBody,
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: 1.1,
          textTransform: 'uppercase',
        }}
      >
        <span>THÔNG TIN · KỸ NĂNG · CỘNG ĐỒNG</span>
        <span style={{ color: T.brick }}>AN TOÀN TRÊN MẠNG</span>
      </footer>
    </AbsoluteFill>
  );
};

export const Reveal: React.FC<{ children: React.ReactNode; delay?: number; distance?: number }> = ({
  children,
  delay = 0,
  distance = 14,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const value = spring({
    frame: frame - delay,
    fps,
    config: { damping: 24, stiffness: 82, mass: 0.9 },
  });
  const opacity = interpolate(value, [0, 1], [0, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(value, [0, 1], [distance, 0], { extrapolateRight: 'clamp' });

  return <div style={{ opacity, transform: `translateY(${y}px)` }}>{children}</div>;
};

export const Headline: React.FC<{
  title: string;
  kicker?: string;
  badge?: string;
  subtitle?: string;
  compact?: boolean;
}> = ({ title, kicker, badge, subtitle, compact = false }) => {
  const fontSize = compact ? 54 : title.length > 42 ? 54 : title.length > 27 ? 62 : 70;
  const wordCount = title.trim().split(/\s+/).filter(Boolean).length;
  const accentFrom = Math.max(0, wordCount - (wordCount >= 5 ? 2 : 1));
  let wordIndex = 0;
  const titleParts = title.split(/(\s+)/).map((part, index) => {
    if (!part.trim()) return part;
    const color = wordIndex >= accentFrom ? T.brick : T.ink;
    wordIndex += 1;
    return <span key={index} style={{ color }}>{part}</span>;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: compact ? 16 : 20 }}>
      {(kicker || badge) && (
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          {kicker ? <Kicker>{kicker}</Kicker> : <span />}
          {badge ? <Badge>{badge}</Badge> : null}
        </div>
      )}
      <h1
        style={{
          margin: 0,
          maxWidth: 880,
          fontFamily: T.fontDisplay,
          fontSize,
          fontWeight: 900,
          lineHeight: 1.06,
          letterSpacing: -1.9,
          color: T.ink,
          overflowWrap: 'anywhere',
        }}
      >
        {titleParts}
      </h1>
      <div style={{ height: 5, width: 112, backgroundColor: T.brick }} />
      {subtitle ? (
        <p
          style={{
            margin: 0,
            maxWidth: 850,
            color: T.inkSoft,
            fontFamily: T.fontBody,
            fontSize: 29,
            lineHeight: 1.42,
            fontWeight: 500,
          }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
};

export const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      color: T.brick,
      fontFamily: T.fontBody,
      fontSize: 17,
      fontWeight: 900,
      letterSpacing: 1.7,
      textTransform: 'uppercase',
    }}
  >
    {children}
  </span>
);

export const Badge: React.FC<{ children: React.ReactNode; tone?: 'alert' | 'safe' | 'neutral' }> = ({
  children,
  tone = 'alert',
}) => {
  const color = tone === 'safe' ? T.safety : tone === 'neutral' ? T.inkSoft : T.brick;
  const background = tone === 'safe' ? T.safetyPale : tone === 'neutral' ? T.paperShade : T.brickPale;
  return (
    <span
      style={{
        padding: '7px 11px',
        backgroundColor: background,
        color,
        fontFamily: T.fontBody,
        fontSize: 15,
        fontWeight: 900,
        lineHeight: 1.2,
        letterSpacing: 0.7,
        textTransform: 'uppercase',
        maxWidth: 300,
        textAlign: 'center',
      }}
    >
      {children}
    </span>
  );
};

export const PaperCard: React.FC<{
  children: React.ReactNode;
  tone?: 'plain' | 'alert' | 'safe';
  style?: React.CSSProperties;
}> = ({ children, tone = 'plain', style }) => (
  <div
    style={{
      backgroundColor: T.paperLight,
      border: `1px solid ${T.rule}`,
      borderLeft: `5px solid ${tone === 'alert' ? T.brick : tone === 'safe' ? T.safety : T.rule}`,
      boxShadow: `0 8px 22px ${T.shadow}`,
      padding: '24px 28px',
      ...style,
    }}
  >
    {children}
  </div>
);

export const Postcard: React.FC<{ scene: Scene; height?: number }> = ({ scene, height = 430 }) => {
  const image = scene.images?.[0];
  if (!image) return null;

  return (
    <Reveal delay={10} distance={10}>
      <div
        style={{
          backgroundColor: T.white,
          border: `1px solid ${T.rule}`,
          padding: '12px 12px 0',
          boxShadow: `0 12px 28px ${T.shadow}`,
          transform: 'rotate(-0.25deg)',
        }}
      >
        <div
          style={{
            height,
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: T.paperShade,
          }}
        >
          <Img
            src={staticFile(image)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div
            style={{
              position: 'absolute',
              top: 14,
              left: 14,
              padding: '7px 10px',
              backgroundColor: 'rgba(37, 35, 33, 0.84)',
              color: T.white,
              fontFamily: T.fontBody,
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            {scene.imageLabel || 'HÌNH MINH HỌA'}
          </div>
          {scene.locationTag ? (
            <div
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                padding: '7px 10px',
                backgroundColor: T.paperLight,
                color: T.ink,
                fontFamily: T.fontBody,
                fontSize: 15,
                fontWeight: 800,
              }}
            >
              {scene.locationTag}
            </div>
          ) : null}
        </div>
        {scene.sourceLabel ? (
          <div
            style={{
              minHeight: 42,
              display: 'flex',
              alignItems: 'center',
              color: T.inkSoft,
              fontFamily: T.fontBody,
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {scene.sourceLabel}
          </div>
        ) : <div style={{ height: 12 }} />}
      </div>
    </Reveal>
  );
};

export const Note: React.FC<{ children: React.ReactNode; tone?: 'alert' | 'safe' | 'neutral' }> = ({
  children,
  tone = 'alert',
}) => {
  const color = tone === 'safe' ? T.safety : tone === 'neutral' ? T.inkSoft : T.brick;
  return (
    <div
      style={{
        borderLeft: `4px solid ${color}`,
        padding: '10px 0 10px 16px',
        color: T.inkSoft,
        fontFamily: T.fontBody,
        fontSize: 22,
        lineHeight: 1.38,
      }}
    >
      {children}
    </div>
  );
};

export const NumberBadge: React.FC<{ children: React.ReactNode; tone?: 'alert' | 'safe' }> = ({
  children,
  tone = 'alert',
}) => (
  <div
    style={{
      flexShrink: 0,
      width: 54,
      height: 54,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: tone === 'safe' ? T.safetyPale : T.brickPale,
      color: tone === 'safe' ? T.safety : T.brick,
      fontFamily: T.fontMono,
      fontSize: 23,
      fontWeight: 900,
    }}
  >
    {children}
  </div>
);
