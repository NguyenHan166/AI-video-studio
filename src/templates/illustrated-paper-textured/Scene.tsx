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
import { ILLUSTRATED_THEME as T } from './theme';
import type { Scene, BarChartItem, ProgressItem, DecisionForkItem } from '../../core/types';

// ==========================================
// 1. DRAWING HAND COMPONENT
// ==========================================

export const DrawingHand: React.FC<{
  startFrame: number;
  duration?: number;
  startX: number;
  startY: number;
  endX?: number;
  endY?: number;
}> = ({
  startFrame,
  duration = 24,
  startX,
  startY,
  endX = startX + 160,
  endY = startY + 20,
}) => {
  const frame = useCurrentFrame();
  const relFrame = frame - startFrame;

  if (relFrame < 0 || relFrame > duration + 10) {
    return null;
  }

  // Phase 1: Enter from bottom-right (0 -> 6 frames)
  // Phase 2: Drawing stroke (6 -> duration - 6 frames)
  // Phase 3: Exit toward bottom-right (duration - 6 -> duration + 8 frames)
  const enterProgress = interpolate(relFrame, [0, 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const drawProgress = interpolate(
    relFrame,
    [6, Math.max(7, duration - 6)],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const exitProgress = interpolate(
    relFrame,
    [Math.max(8, duration - 6), duration + 8],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Micro jitter to simulate organic human hand drawing
  const jitterX = Math.sin(frame * 1.6) * 2;
  const jitterY = Math.cos(frame * 1.6) * 1.5;

  let posX = startX + (endX - startX) * drawProgress + jitterX;
  let posY = startY + (endY - startY) * drawProgress + jitterY;

  // Apply enter offset
  if (relFrame < 6) {
    posX += (1 - enterProgress) * 220;
    posY += (1 - enterProgress) * 260;
  }

  // Apply exit offset
  if (exitProgress > 0) {
    posX += exitProgress * 280;
    posY += exitProgress * 320;
  }

  const opacity = interpolate(
    relFrame,
    [0, 4, duration + 4, duration + 8],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: 300,
        height: 350,
        // Tip of marker is at offset (-25, -45)
        transform: `translate3d(${posX - 25}px, ${posY - 45}px, 0)`,
        pointerEvents: 'none',
        zIndex: 80,
        opacity,
      }}
    >
      <Img
        src={staticFile(T.drawingHand)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: 'drop-shadow(0 14px 20px rgba(0, 0, 0, 0.18))',
        }}
      />
    </div>
  );
};

// ==========================================
// 2. CANVAS & BASE LAYOUT
// ==========================================

export const IllustratedPaperCanvas: React.FC<{
  children: React.ReactNode;
  kicker?: string;
  badge?: string;
}> = ({ children, kicker, badge }) => {
  const frame = useCurrentFrame();
  const headerOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: T.paper,
        backgroundImage: `url(${staticFile(T.paperTexture)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Top watermark / channel badge like reference video */}
      <div
        style={{
          position: 'absolute',
          top: 48,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
          opacity: headerOpacity * 0.45,
          zIndex: 10,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke={T.ink} strokeWidth="2.5" />
          <path
            d="M9 12L11 14L15 10"
            stroke={T.ink}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          style={{
            fontFamily: T.fontBody,
            fontSize: 20,
            fontWeight: 800,
            color: T.ink,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
          }}
        >
          {badge || kicker || 'HỒ SƠ TƯ LIỆU'}
        </span>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          position: 'relative',
          padding: '110px 80px 220px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          boxSizing: 'border-box',
          zIndex: 2,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// 3. ILLUSTRATED POSTCARD / PHOTO
// ==========================================

export const IllustratedPostcard: React.FC<{
  src: string;
  caption?: string;
  rotation?: number;
  width?: number;
  height?: number;
  delay?: number;
  hasTape?: boolean;
}> = ({
  src,
  caption,
  rotation = 0,
  width = 420,
  height = 360,
  delay = 0,
  hasTape = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dropSpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 90, mass: 0.8 },
  });

  const cardScale = interpolate(dropSpring, [0, 1], [0.85, 1]);
  const cardOpacity = interpolate(dropSpring, [0, 1], [0, 1]);
  const translateY = interpolate(dropSpring, [0, 1], [30, 0]);

  return (
    <div
      style={{
        position: 'relative',
        width,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: `translate3d(0, ${translateY}px, 0) scale(${cardScale}) rotate(${rotation}deg)`,
        opacity: cardOpacity,
        zIndex: 5,
      }}
    >
      {/* Washi tape strip on top */}
      {hasTape && (
        <div
          style={{
            position: 'absolute',
            top: -14,
            width: 110,
            height: 26,
            backgroundColor: T.tapeBg,
            borderRadius: 2,
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
            transform: 'rotate(-1.5deg)',
            zIndex: 10,
            borderLeft: '1px dashed rgba(0,0,0,0.15)',
            borderRight: '1px dashed rgba(0,0,0,0.15)',
          }}
        />
      )}

      {/* Postcard white frame */}
      <div
        style={{
          width: '100%',
          backgroundColor: T.postcardBg,
          padding: '14px 14px 28px 14px',
          borderRadius: 14,
          boxShadow: T.postcardShadow,
          boxSizing: 'border-box',
          border: '1.5px solid rgba(30, 35, 42, 0.08)',
        }}
      >
        <div
          style={{
            width: '100%',
            height,
            borderRadius: 8,
            overflow: 'hidden',
            backgroundColor: '#F1F3F5',
            position: 'relative',
          }}
        >
          <Img
            src={staticFile(src)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {caption && (
          <div
            style={{
              marginTop: 14,
              textAlign: 'center',
              fontFamily: T.fontBody,
              fontSize: 22,
              fontWeight: 700,
              color: T.slate,
              letterSpacing: 0.5,
            }}
          >
            {caption}
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// SCENE 1: HOOK / BIG NUMBER DILEMMA
// ==========================================

export const IllustratedHookScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Big headline spring
  const headSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  const cardsDelay = 12;
  const dilemmaDelay = 24;

  const dilemmaSpring = spring({
    frame: frame - dilemmaDelay,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const bigTitle = scene.statistic || scene.titleAccent || scene.title;
  const dilemmaText = scene.subtitle || scene.quote || 'Bạn cần giải quyết điều gì nhất?';

  return (
    <IllustratedPaperCanvas kicker={scene.kicker}>
      {/* 1. Big bold title (drawn first) */}
      <div
        style={{
          textAlign: 'center',
          marginTop: 40,
          transform: `scale(${interpolate(headSpring, [0, 1], [0.85, 1])})`,
          opacity: headSpring,
        }}
      >
        <h1
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 88,
            fontWeight: 900,
            color: T.blue,
            margin: 0,
            letterSpacing: 1,
            lineHeight: 1.15,
            textTransform: 'uppercase',
          }}
        >
          {bigTitle}
        </h1>
      </div>

      {/* Hand drawing the big title */}
      <DrawingHand
        startFrame={2}
        duration={20}
        startX={320}
        startY={170}
        endX={760}
        endY={175}
      />

      {/* 2. Two comparative items / postcards side-by-side */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 40,
          marginTop: 65,
          flex: 1,
        }}
      >
        {scene.images && scene.images.length > 0 ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IllustratedPostcard
                src={scene.images[0]}
                width={420}
                height={380}
                rotation={-2}
                delay={cardsDelay}
                hasTape
              />
              {scene.comparisonItems?.[0] && (
                <div
                  style={{
                    marginTop: 22,
                    fontFamily: T.fontDisplay,
                    fontSize: 34,
                    fontWeight: 900,
                    color: T.ink,
                    letterSpacing: 0.5,
                  }}
                >
                  {scene.comparisonItems[0].label}
                </div>
              )}
            </div>

            {scene.images[1] && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <IllustratedPostcard
                  src={scene.images[1]}
                  width={420}
                  height={380}
                  rotation={2}
                  delay={cardsDelay + 8}
                  hasTape
                />
                {scene.comparisonItems?.[1] && (
                  <div
                    style={{
                      marginTop: 22,
                      fontFamily: T.fontDisplay,
                      fontSize: 34,
                      fontWeight: 900,
                      color: T.ink,
                      letterSpacing: 0.5,
                    }}
                  >
                    {scene.comparisonItems[1].label}
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          // Graphic cards fallback
          <div
            style={{
              display: 'flex',
              gap: 40,
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 420,
                height: 380,
                backgroundColor: T.white,
                borderRadius: 20,
                border: `3.5px solid ${T.borderDark}`,
                boxShadow: T.postcardShadow,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 30,
                boxSizing: 'border-box',
                transform: 'rotate(-1.5deg)',
              }}
            >
              <span style={{ fontSize: 72 }}>🏛️</span>
              <div
                style={{
                  marginTop: 18,
                  fontFamily: T.fontDisplay,
                  fontSize: 34,
                  fontWeight: 900,
                  color: T.ink,
                }}
              >
                {scene.items?.[0] || 'LỰA CHỌN A'}
              </div>
            </div>

            <div
              style={{
                width: 420,
                height: 380,
                backgroundColor: T.white,
                borderRadius: 20,
                border: `3.5px solid ${T.borderDark}`,
                boxShadow: T.postcardShadow,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 30,
                boxSizing: 'border-box',
                transform: 'rotate(1.5deg)',
              }}
            >
              <span style={{ fontSize: 72 }}>🚗</span>
              <div
                style={{
                  marginTop: 18,
                  fontFamily: T.fontDisplay,
                  fontSize: 34,
                  fontWeight: 900,
                  color: T.ink,
                }}
              >
                {scene.items?.[1] || 'LỰA CHỌN B'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Dilemma question in crimson ink */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: 40,
          transform: `scale(${interpolate(dilemmaSpring, [0, 1], [0.9, 1])})`,
          opacity: dilemmaSpring,
        }}
      >
        <p
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 38,
            fontWeight: 800,
            color: T.crimson,
            margin: 0,
            letterSpacing: 0.2,
          }}
        >
          {dilemmaText}
        </p>
      </div>
    </IllustratedPaperCanvas>
  );
};

// ==========================================
// SCENE 2: PROGRESS / GAUGE COMPARISON
// ==========================================

export const IllustratedProgressScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  const items: ProgressItem[] = scene.progressItems || [
    {
      label: scene.comparisonItems?.[0]?.label || 'PHƯƠNG ÁN 1',
      percent: 100,
      color: T.blue,
      note: scene.comparisonItems?.[0]?.text,
    },
    {
      label: scene.comparisonItems?.[1]?.label || 'PHƯƠNG ÁN 2',
      percent: 28,
      color: T.amber,
      note: scene.comparisonItems?.[1]?.text,
    },
  ];

  return (
    <IllustratedPaperCanvas kicker={scene.kicker}>
      {/* Title */}
      <div
        style={{
          marginTop: 50,
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.9, 1])})`,
          opacity: titleSpring,
        }}
      >
        <h2
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 66,
            fontWeight: 900,
            color: T.ink,
            margin: 0,
            lineHeight: 1.25,
          }}
        >
          {scene.title}
        </h2>
      </div>

      <DrawingHand
        startFrame={2}
        duration={18}
        startX={120}
        startY={165}
        endX={540}
        endY={170}
      />

      {/* Progress Bars Stack */}
      <div
        style={{
          marginTop: 80,
          display: 'flex',
          flexDirection: 'column',
          gap: 65,
          flex: 1,
        }}
      >
        {items.map((item, idx) => {
          const delay = 14 + idx * 16;
          const fillSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 16, stiffness: 70 },
          });

          const currentPercent = interpolate(
            fillSpring,
            [0, 1],
            [0, item.percent],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          const barColor = item.color || (idx === 0 ? T.blue : T.amber);

          return (
            <div key={idx} style={{ width: '100%' }}>
              {/* Label */}
              <div
                style={{
                  fontFamily: T.fontDisplay,
                  fontSize: 38,
                  fontWeight: 800,
                  color: barColor,
                  marginBottom: 16,
                  letterSpacing: 0.3,
                }}
              >
                {item.label}
              </div>

              {/* Progress Pill Bar */}
              <div
                style={{
                  width: '100%',
                  height: 64,
                  backgroundColor: T.white,
                  border: `3.5px solid ${T.borderDark}`,
                  borderRadius: 9999,
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: '0 6px 14px rgba(0, 0, 0, 0.06)',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${currentPercent}%`,
                    backgroundColor: barColor,
                    borderRadius: 9999,
                    transition: 'width 0.1s ease-out',
                  }}
                />
              </div>

              {/* Note / caveat underneath */}
              {item.note && (
                <div
                  style={{
                    marginTop: 14,
                    textAlign: 'center',
                    fontFamily: T.fontBody,
                    fontSize: 32,
                    fontWeight: 700,
                    color: T.crimson,
                  }}
                >
                  {item.note}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Takeaway / Footnote */}
      {(scene.subtitle || scene.footnote) && (
        <div
          style={{
            textAlign: 'center',
            marginBottom: 35,
          }}
        >
          <p
            style={{
              fontFamily: T.fontDisplay,
              fontSize: 36,
              fontWeight: 800,
              color: T.ink,
              margin: 0,
            }}
          >
            {scene.footnote || scene.subtitle}
          </p>
        </div>
      )}
    </IllustratedPaperCanvas>
  );
};

// ==========================================
// SCENE 3: COMPARE / LONGTERM PROJECTION
// ==========================================

export const IllustratedCompareScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  const cardsDelay = 10;
  const noteDelay = 26;

  const noteSpring = spring({
    frame: frame - noteDelay,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  return (
    <IllustratedPaperCanvas kicker={scene.kicker}>
      {/* Title */}
      <div
        style={{
          marginTop: 40,
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.9, 1])})`,
          opacity: titleSpring,
        }}
      >
        <h2
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 66,
            fontWeight: 900,
            color: T.ink,
            margin: 0,
          }}
        >
          {scene.title}
        </h2>
      </div>

      <DrawingHand
        startFrame={2}
        duration={18}
        startX={100}
        startY={155}
        endX={600}
        endY={160}
      />

      {/* Two columns */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 40,
          marginTop: 60,
          flex: 1,
        }}
      >
        {/* Column 1 */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {scene.images?.[0] ? (
            <IllustratedPostcard
              src={scene.images[0]}
              width={420}
              height={340}
              rotation={-1.5}
              delay={cardsDelay}
            />
          ) : (
            <div
              style={{
                width: 420,
                height: 340,
                backgroundColor: T.white,
                borderRadius: 16,
                border: `3px solid ${T.borderDark}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 64,
                boxShadow: T.postcardShadow,
              }}
            >
              📉
            </div>
          )}

          <div
            style={{
              marginTop: 26,
              fontFamily: T.fontBody,
              fontSize: 34,
              fontWeight: 800,
              color: T.crimson,
              textAlign: 'center',
              lineHeight: 1.35,
              maxWidth: 400,
            }}
          >
            {scene.comparisonItems?.[0]?.text || scene.items?.[0] || 'Giảm giá trị'}
          </div>
        </div>

        {/* Column 2 */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {scene.images?.[1] ? (
            <IllustratedPostcard
              src={scene.images[1]}
              width={420}
              height={340}
              rotation={1.5}
              delay={cardsDelay + 6}
            />
          ) : (
            <div
              style={{
                width: 420,
                height: 340,
                backgroundColor: T.white,
                borderRadius: 16,
                border: `3px solid ${T.borderDark}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 64,
                boxShadow: T.postcardShadow,
              }}
            >
              📈
            </div>
          )}

          <div
            style={{
              marginTop: 26,
              fontFamily: T.fontBody,
              fontSize: 34,
              fontWeight: 800,
              color: T.blue,
              textAlign: 'center',
              lineHeight: 1.35,
              maxWidth: 400,
            }}
          >
            {scene.comparisonItems?.[1]?.text || scene.items?.[1] || 'Gia tăng tài sản'}
          </div>
        </div>
      </div>

      {/* Footnote / reality check */}
      {(scene.footnote || scene.subtitle) && (
        <div
          style={{
            textAlign: 'center',
            marginBottom: 35,
            opacity: noteSpring,
          }}
        >
          <p
            style={{
              fontFamily: T.fontBody,
              fontSize: 28,
              fontWeight: 700,
              color: T.slate,
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {scene.footnote || scene.subtitle}
          </p>
        </div>
      )}
    </IllustratedPaperCanvas>
  );
};

// ==========================================
// SCENE 4: FEATURES / CALLOUT BREAKDOWN
// ==========================================

export const IllustratedFeaturesScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  const callouts = scene.callouts || scene.items || [
    { text: 'Công năng 1', color: T.blue },
    { text: 'Công năng 2', color: T.amber },
    { text: 'Công năng 3', color: T.crimson },
  ];

  return (
    <IllustratedPaperCanvas kicker={scene.kicker}>
      {/* Title */}
      <div
        style={{
          marginTop: 40,
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.9, 1])})`,
          opacity: titleSpring,
        }}
      >
        <h2
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 66,
            fontWeight: 900,
            color: T.ink,
            margin: 0,
          }}
        >
          {scene.title}
        </h2>
      </div>

      <DrawingHand
        startFrame={2}
        duration={18}
        startX={100}
        startY={155}
        endX={620}
        endY={160}
      />

      {/* Hero Postcard / Illustration */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }}
      >
        {scene.images?.[0] ? (
          <IllustratedPostcard
            src={scene.images[0]}
            width={720}
            height={500}
            rotation={-0.5}
            delay={10}
            hasTape
          />
        ) : (
          <div
            style={{
              width: 720,
              height: 500,
              backgroundColor: T.white,
              borderRadius: 20,
              border: `3.5px solid ${T.borderDark}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 100,
              boxShadow: T.postcardShadow,
            }}
          >
            🚗
          </div>
        )}
      </div>

      {/* Callout badges row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 24,
          marginTop: 45,
          flex: 1,
        }}
      >
        {callouts.map((item, idx) => {
          const text = typeof item === 'string' ? item : item.text;
          const color =
            typeof item === 'string'
              ? idx === 0
                ? T.blue
                : idx === 1
                ? T.amber
                : T.crimson
              : item.color || T.blue;

          const badgeSpring = spring({
            frame: frame - (20 + idx * 8),
            fps,
            config: { damping: 14, stiffness: 90 },
          });

          return (
            <div
              key={idx}
              style={{
                fontFamily: T.fontDisplay,
                fontSize: 34,
                fontWeight: 900,
                color,
                backgroundColor: T.white,
                padding: '12px 28px',
                borderRadius: 9999,
                border: `3px solid ${color}`,
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.06)',
                transform: `scale(${interpolate(badgeSpring, [0, 1], [0.8, 1])})`,
                opacity: badgeSpring,
              }}
            >
              {text}
            </div>
          );
        })}
      </div>
    </IllustratedPaperCanvas>
  );
};

// ==========================================
// SCENE 5: ARROW FLOW / PRIORITY DRIFT
// ==========================================

export const IllustratedArrowFlowScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  const arrowSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const arrowProgress = interpolate(arrowSpring, [0, 1], [0, 1]);

  return (
    <IllustratedPaperCanvas kicker={scene.kicker}>
      {/* Title */}
      <div
        style={{
          marginTop: 40,
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.9, 1])})`,
          opacity: titleSpring,
        }}
      >
        <h2
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 66,
            fontWeight: 900,
            color: T.ink,
            margin: 0,
          }}
        >
          {scene.title}
        </h2>
        {scene.subtitle && (
          <p
            style={{
              fontFamily: T.fontBody,
              fontSize: 34,
              fontWeight: 700,
              color: T.slate,
              marginTop: 18,
              marginBottom: 0,
            }}
          >
            {scene.subtitle}
          </p>
        )}
      </div>

      {/* Subject Center */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }}
      >
        {scene.images?.[0] ? (
          <IllustratedPostcard
            src={scene.images[0]}
            width={520}
            height={420}
            rotation={1.2}
            delay={8}
            hasTape
          />
        ) : (
          <div
            style={{
              width: 520,
              height: 420,
              backgroundColor: T.white,
              borderRadius: 20,
              border: `3.5px solid ${T.borderDark}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 90,
              boxShadow: T.postcardShadow,
            }}
          >
            🔑
          </div>
        )}
      </div>

      {/* Hand-drawn Animated Curved Arrow */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 40,
          position: 'relative',
        }}
      >
        <svg width="680" height="90" viewBox="0 0 680 90" fill="none">
          <path
            d="M 40 30 Q 340 85 620 40"
            stroke={T.crimson}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="640"
            strokeDashoffset={640 * (1 - arrowProgress)}
          />
          {arrowProgress > 0.85 && (
            <path
              d="M 600 25 L 625 40 L 595 55"
              stroke={T.crimson}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>

        {/* Hand follows arrow tip */}
        <DrawingHand
          startFrame={18}
          duration={20}
          startX={260}
          startY={1180}
          endX={760}
          endY={1190}
        />
      </div>

      {/* Warning Takeaway in Crimson */}
      <div
        style={{
          textAlign: 'center',
          marginTop: 20,
          flex: 1,
        }}
      >
        <p
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 38,
            fontWeight: 800,
            color: T.crimson,
            margin: 0,
            lineHeight: 1.35,
          }}
        >
          {scene.arrowText || scene.quote || scene.footnote || 'Mua xe có thể kéo xa mục tiêu mua nhà'}
        </p>
      </div>
    </IllustratedPaperCanvas>
  );
};

// ==========================================
// SCENE 6: BAR CHART / MONTHLY BURDEN
// ==========================================

export const IllustratedBarChartScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  const chartItems: BarChartItem[] = scene.chartItems || [
    {
      label: scene.comparisonItems?.[0]?.label || 'LỰA CHỌN A',
      heightPercent: 82,
      color: T.crimson,
      caption: scene.comparisonItems?.[0]?.text || 'Chi phí tăng',
    },
    {
      label: scene.comparisonItems?.[1]?.label || 'LỰA CHỌN B',
      heightPercent: 82,
      color: T.blue,
      caption: scene.comparisonItems?.[1]?.text || 'Tích lũy tài sản',
    },
  ];

  return (
    <IllustratedPaperCanvas kicker={scene.kicker}>
      {/* Title */}
      <div
        style={{
          marginTop: 40,
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.9, 1])})`,
          opacity: titleSpring,
        }}
      >
        <h2
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 66,
            fontWeight: 900,
            color: T.ink,
            margin: 0,
          }}
        >
          {scene.title}
        </h2>
      </div>

      <DrawingHand
        startFrame={2}
        duration={18}
        startX={100}
        startY={155}
        endX={540}
        endY={160}
      />

      {/* Bar Chart Area */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
          height: 640,
          marginTop: 60,
          padding: '0 40px',
        }}
      >
        {chartItems.map((bar, idx) => {
          const delay = 12 + idx * 14;
          const barSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 16, stiffness: 80 },
          });

          const currentHeight = interpolate(
            barSpring,
            [0, 1],
            [0, bar.heightPercent],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          const barColor = bar.color || (idx === 0 ? T.crimson : T.blue);

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 280,
                height: '100%',
                justifyContent: 'flex-end',
              }}
            >
              {/* Category label above bar */}
              <div
                style={{
                  fontFamily: T.fontDisplay,
                  fontSize: 36,
                  fontWeight: 900,
                  color: barColor,
                  marginBottom: 20,
                  textTransform: 'uppercase',
                }}
              >
                {bar.label}
              </div>

              {/* Vertical Bar with dark outline */}
              <div
                style={{
                  width: 220,
                  height: `${(currentHeight / 100) * 440}px`,
                  backgroundColor: barColor,
                  border: `4px solid ${T.borderDark}`,
                  borderRadius: '16px 16px 0 0',
                  boxShadow: '0 8px 18px rgba(0, 0, 0, 0.08)',
                }}
              />

              {/* Black baseline */}
              <div
                style={{
                  width: '100%',
                  height: 4,
                  backgroundColor: T.borderDark,
                }}
              />

              {/* Caption below baseline */}
              <div
                style={{
                  marginTop: 18,
                  fontFamily: T.fontBody,
                  fontSize: 32,
                  fontWeight: 800,
                  color: barColor,
                  textAlign: 'center',
                }}
              >
                {bar.caption}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom prompt in Crimson */}
      {(scene.footnote || scene.subtitle) && (
        <div
          style={{
            textAlign: 'center',
            marginTop: 60,
            flex: 1,
          }}
        >
          <p
            style={{
              fontFamily: T.fontDisplay,
              fontSize: 36,
              fontWeight: 800,
              color: T.crimson,
              margin: 0,
            }}
          >
            {scene.footnote || scene.subtitle}
          </p>
        </div>
      )}
    </IllustratedPaperCanvas>
  );
};

// ==========================================
// SCENE 7: DECISION FORK / V-SHAPE BALANCE
// ==========================================

export const IllustratedDecisionForkScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  const forkSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 15, stiffness: 85 },
  });

  const forkProgress = interpolate(forkSpring, [0, 1], [0, 1]);

  const forkItems: DecisionForkItem[] = scene.forkItems || [
    {
      title: scene.comparisonItems?.[0]?.label || 'PHƯƠNG ÁN 1',
      description: scene.comparisonItems?.[0]?.text || 'Mô tả điều kiện phù hợp phương án 1',
      color: T.blue,
    },
    {
      title: scene.comparisonItems?.[1]?.label || 'PHƯƠNG ÁN 2',
      description: scene.comparisonItems?.[1]?.text || 'Mô tả điều kiện phù hợp phương án 2',
      color: T.amber,
    },
  ];

  return (
    <IllustratedPaperCanvas kicker={scene.kicker}>
      {/* Title */}
      <div
        style={{
          marginTop: 40,
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.9, 1])})`,
          opacity: titleSpring,
        }}
      >
        <h2
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 66,
            fontWeight: 900,
            color: T.ink,
            margin: 0,
          }}
        >
          {scene.title}
        </h2>
      </div>

      <DrawingHand
        startFrame={2}
        duration={18}
        startX={100}
        startY={155}
        endX={640}
        endY={160}
      />

      {/* Hand-drawn V-Shape balance / fork SVG */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 80,
          position: 'relative',
        }}
      >
        <svg width="780" height="240" viewBox="0 0 780 240" fill="none">
          {/* Left Branch */}
          <path
            d="M 120 40 L 390 200"
            stroke={T.borderDark}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeDasharray="340"
            strokeDashoffset={340 * (1 - forkProgress)}
          />
          {/* Right Branch */}
          <path
            d="M 390 200 L 660 40"
            stroke={T.borderDark}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeDasharray="340"
            strokeDashoffset={340 * (1 - forkProgress)}
          />
        </svg>

        {/* Hand draws the V-shape */}
        <DrawingHand
          startFrame={12}
          duration={22}
          startX={230}
          startY={580}
          endX={680}
          endY={580}
        />
      </div>

      {/* Two Decision Branches */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 40,
          gap: 50,
          flex: 1,
        }}
      >
        {forkItems.map((item, idx) => {
          const itemSpring = spring({
            frame: frame - (24 + idx * 8),
            fps,
            config: { damping: 14, stiffness: 90 },
          });

          const branchColor = item.color || (idx === 0 ? T.blue : T.amber);

          return (
            <div
              key={idx}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                opacity: itemSpring,
                transform: `scale(${interpolate(itemSpring, [0, 1], [0.9, 1])})`,
              }}
            >
              <div
                style={{
                  fontFamily: T.fontDisplay,
                  fontSize: 44,
                  fontWeight: 900,
                  color: branchColor,
                  textTransform: 'uppercase',
                  marginBottom: 18,
                  letterSpacing: 0.5,
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontFamily: T.fontBody,
                  fontSize: 32,
                  fontWeight: 700,
                  color: T.ink,
                  lineHeight: 1.4,
                  maxWidth: 380,
                }}
              >
                {item.description}
              </div>
            </div>
          );
        })}
      </div>
    </IllustratedPaperCanvas>
  );
};

// ==========================================
// SCENE 8: VERDICT / CONCLUSION RULE
// ==========================================

export const IllustratedVerdictScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const contextSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  const verdictSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const lineSpring = spring({
    frame: frame - 24,
    fps,
    config: { damping: 15, stiffness: 85 },
  });

  const ruleSpring = spring({
    frame: frame - 32,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const contextText = scene.title || scene.subtitle || 'Nhà làm ngập nợ? Xe vét sạch tiền?';
  const verdictText = scene.verdictText || scene.statistic || scene.titleAccent || 'CHƯA MUA CẢ HAI';
  const ruleText = scene.ruleText || scene.quote || scene.footnote || 'Giữ sự thoải mái tài chính để cuộc sống tốt hơn thật sự.';

  return (
    <IllustratedPaperCanvas kicker={scene.kicker}>
      {/* 1. Context Question at top */}
      <div
        style={{
          marginTop: 70,
          textAlign: 'center',
          opacity: contextSpring,
        }}
      >
        <p
          style={{
            fontFamily: T.fontBody,
            fontSize: 38,
            fontWeight: 800,
            color: T.slate,
            margin: 0,
          }}
        >
          {contextText}
        </p>
      </div>

      {/* 2. Giant Verdict in Crimson Marker */}
      <div
        style={{
          marginTop: 180,
          textAlign: 'center',
          transform: `scale(${interpolate(verdictSpring, [0, 1], [0.85, 1])})`,
          opacity: verdictSpring,
        }}
      >
        <h1
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 92,
            fontWeight: 900,
            color: T.crimson,
            margin: 0,
            lineHeight: 1.25,
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          {verdictText}
        </h1>
      </div>

      {/* Hand draws the verdict */}
      <DrawingHand
        startFrame={10}
        duration={24}
        startX={240}
        startY={640}
        endX={820}
        endY={650}
      />

      {/* 3. Hand-drawn curved underline / divider */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 40,
        }}
      >
        <svg width="680" height="30" viewBox="0 0 680 30" fill="none">
          <path
            d="M 20 15 Q 340 30 660 12"
            stroke={T.amber}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="660"
            strokeDashoffset={660 * (1 - interpolate(lineSpring, [0, 1], [0, 1]))}
          />
        </svg>
      </div>

      {/* 4. Core Takeaway / Principle */}
      <div
        style={{
          marginTop: 90,
          textAlign: 'center',
          padding: '0 60px',
          opacity: ruleSpring,
          transform: `scale(${interpolate(ruleSpring, [0, 1], [0.92, 1])})`,
        }}
      >
        <p
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 44,
            fontWeight: 800,
            color: T.ink,
            margin: 0,
            lineHeight: 1.45,
          }}
        >
          {ruleText}
        </p>
      </div>
    </IllustratedPaperCanvas>
  );
};

// ==========================================
// SCENE 9: TIMELINE / MILESTONES (ILLUSTRATED)
// ==========================================

export const IllustratedTimelineScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  const timelineItems = scene.timelineItems || [
    { title: 'GIAI ĐOẠN 1', subtitle: 'Khởi đầu', time: '1511' },
    { title: 'GIAI ĐOẠN 2', subtitle: 'Phát triển', time: '1922' },
    { title: 'GIAI ĐOẠN 3', subtitle: 'Hiện tại', time: 'Hôm nay' },
  ];

  return (
    <IllustratedPaperCanvas kicker={scene.kicker}>
      <div
        style={{
          marginTop: 40,
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.9, 1])})`,
          opacity: titleSpring,
        }}
      >
        <h2
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 66,
            fontWeight: 900,
            color: T.ink,
            margin: 0,
          }}
        >
          {scene.title}
        </h2>
      </div>

      {/* Vertical Hand-drawn Timeline */}
      <div
        style={{
          marginTop: 70,
          display: 'flex',
          flexDirection: 'column',
          gap: 40,
          position: 'relative',
          paddingLeft: 30,
          flex: 1,
        }}
      >
        {/* Continuous timeline line */}
        <div
          style={{
            position: 'absolute',
            left: 56,
            top: 25,
            bottom: 35,
            width: 4,
            backgroundColor: T.borderDark,
            borderRadius: 2,
          }}
        />

        {timelineItems.map((item, idx) => {
          const itemSpring = spring({
            frame: frame - (10 + idx * 12),
            fps,
            config: { damping: 14, stiffness: 90 },
          });

          const nodeColor = idx === 0 ? T.blue : idx === 1 ? T.amber : T.crimson;

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 35,
                opacity: itemSpring,
                transform: `scale(${interpolate(itemSpring, [0, 1], [0.9, 1])})`,
                zIndex: 2,
              }}
            >
              {/* Milestone circle node */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  backgroundColor: T.white,
                  border: `4.5px solid ${nodeColor}`,
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    backgroundColor: nodeColor,
                  }}
                />
              </div>

              {/* Milestone content */}
              <div
                style={{
                  backgroundColor: T.white,
                  border: `2px solid ${T.borderDark}`,
                  borderRadius: 16,
                  padding: '20px 28px',
                  boxShadow: T.postcardShadow,
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: T.fontDisplay,
                      fontSize: 34,
                      fontWeight: 900,
                      color: T.ink,
                    }}
                  >
                    {item.title}
                  </div>
                  {item.subtitle && (
                    <div
                      style={{
                        fontFamily: T.fontBody,
                        fontSize: 26,
                        fontWeight: 600,
                        color: T.slate,
                        marginTop: 4,
                      }}
                    >
                      {item.subtitle}
                    </div>
                  )}
                </div>

                {item.time && (
                  <div
                    style={{
                      fontFamily: T.fontDisplay,
                      fontSize: 32,
                      fontWeight: 900,
                      color: nodeColor,
                    }}
                  >
                    {item.time}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </IllustratedPaperCanvas>
  );
};

// ==========================================
// SCENE 10: PHOTO STORY (ILLUSTRATED PAPER)
// ==========================================

export const IllustratedPhotoStoryScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  return (
    <IllustratedPaperCanvas kicker={scene.kicker}>
      <div
        style={{
          marginTop: 40,
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.9, 1])})`,
          opacity: titleSpring,
        }}
      >
        <h2
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 66,
            fontWeight: 900,
            color: T.ink,
            margin: 0,
          }}
        >
          {scene.title}
        </h2>
        {scene.subtitle && (
          <p
            style={{
              fontFamily: T.fontBody,
              fontSize: 32,
              fontWeight: 700,
              color: T.slate,
              marginTop: 12,
              marginBottom: 0,
            }}
          >
            {scene.subtitle}
          </p>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 45,
          flex: 1,
        }}
      >
        {scene.images?.[0] ? (
          <IllustratedPostcard
            src={scene.images[0]}
            width={780}
            height={560}
            rotation={-1}
            delay={8}
            hasTape
            caption={scene.sourceLabel}
          />
        ) : (
          <div
            style={{
              width: 780,
              height: 560,
              backgroundColor: T.white,
              borderRadius: 20,
              border: `3.5px solid ${T.borderDark}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 100,
              boxShadow: T.postcardShadow,
            }}
          >
            📸
          </div>
        )}
      </div>

      {scene.quote && (
        <div
          style={{
            textAlign: 'center',
            marginBottom: 35,
          }}
        >
          <p
            style={{
              fontFamily: T.fontDisplay,
              fontSize: 34,
              fontWeight: 800,
              color: T.blue,
              margin: 0,
            }}
          >
            {scene.quote}
          </p>
        </div>
      )}
    </IllustratedPaperCanvas>
  );
};

// ==========================================
// SCENE 11: PHOTO STACK (ILLUSTRATED PAPER)
// ==========================================

export const IllustratedPhotoStackScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  return (
    <IllustratedPaperCanvas kicker={scene.kicker}>
      <div
        style={{
          marginTop: 40,
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.9, 1])})`,
          opacity: titleSpring,
        }}
      >
        <h2
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 66,
            fontWeight: 900,
            color: T.ink,
            margin: 0,
          }}
        >
          {scene.title}
        </h2>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 30,
          marginTop: 45,
          flex: 1,
        }}
      >
        {scene.images?.[0] && (
          <IllustratedPostcard
            src={scene.images[0]}
            width={720}
            height={360}
            rotation={-1.5}
            delay={8}
            hasTape
          />
        )}
        {scene.images?.[1] && (
          <IllustratedPostcard
            src={scene.images[1]}
            width={720}
            height={360}
            rotation={1.5}
            delay={18}
            hasTape
          />
        )}
      </div>
    </IllustratedPaperCanvas>
  );
};

// ==========================================
// MASTER SCENE ROUTER FOR ILLUSTRATED TEMPLATE
// ==========================================

export const IllustratedScene: React.FC<{
  scene: Scene;
  index: number;
  total: number;
}> = ({ scene, index, total }) => {
  switch (scene.type) {
    case 'illustrated-hook':
    case 'cover':
      return <IllustratedHookScene scene={scene} />;

    case 'illustrated-progress':
      return <IllustratedProgressScene scene={scene} />;

    case 'illustrated-compare':
    case 'comparison':
      return <IllustratedCompareScene scene={scene} />;

    case 'illustrated-features':
      return <IllustratedFeaturesScene scene={scene} />;

    case 'illustrated-arrow-flow':
      return <IllustratedArrowFlowScene scene={scene} />;

    case 'illustrated-bar-chart':
    case 'statistic':
      return <IllustratedBarChartScene scene={scene} />;

    case 'illustrated-decision-fork':
      return <IllustratedDecisionForkScene scene={scene} />;

    case 'illustrated-verdict':
    case 'ending':
      return <IllustratedVerdictScene scene={scene} />;

    case 'timeline':
      return <IllustratedTimelineScene scene={scene} />;

    case 'photo-stack':
      return <IllustratedPhotoStackScene scene={scene} />;

    case 'photo-story':
    default:
      return <IllustratedPhotoStoryScene scene={scene} />;
  }
};
