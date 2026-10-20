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
import { THEME as T } from './theme';
import type { Scene } from './types';

// ==========================================
// BACKGROUND CANVAS & BASE LAYOUT
// ==========================================

const EditorialCanvas: React.FC<{
  children: React.ReactNode;
  kicker?: string;
  locationTag?: string;
}> = ({ children, kicker, locationTag }) => {
  const frame = useCurrentFrame();
  const headerOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: T.paper,
        backgroundImage: `
          radial-gradient(circle at 92% 8%, rgba(222, 81, 56, 0.08) 0%, transparent 55%),
          radial-gradient(circle at 8% 92%, rgba(26, 77, 66, 0.07) 0%, transparent 55%)
        `,
      }}
    >
      {/* Top 6px color accent stripe */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: T.topStripe,
          zIndex: 10,
        }}
      />

      {/* Subtle fine grid texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(26, 57, 48, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26, 57, 48, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }}
      />

      {/* Main Content Area with Safe Margin */}
      <div
        style={{
          position: 'relative',
          padding: '80px 90px 180px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          boxSizing: 'border-box',
          zIndex: 2,
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            opacity: headerOpacity,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: 36,
          }}
        >
          <span
            style={{
              fontFamily: T.fontBody,
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 2.2,
              color: T.ink,
              textTransform: 'uppercase',
            }}
          >
            {kicker || 'HỒ SƠ TƯ LIỆU'}
          </span>
          <span
            style={{
              fontFamily: T.fontBody,
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 1.8,
              color: T.brick,
              textTransform: 'uppercase',
            }}
          >
            {locationTag || 'TƯ LIỆU'}
          </span>
        </div>

        {/* Scene Body */}
        {children}
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// TYPOGRAPHY & DECORATIVE BADGES
// ==========================================

const StampBadge: React.FC<{ text?: string; delay?: number }> = ({
  text,
  delay = 4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (!text) return null;

  const springVal = spring({
    fps,
    frame: Math.max(0, frame - delay),
    config: { damping: 14, stiffness: 120 },
  });

  return (
    <div
      style={{
        marginTop: 34,
        marginBottom: 20,
        opacity: frame < delay ? 0 : interpolate(springVal, [0, 0.5, 1], [0, 1, 1]),
        transform: `scale(${interpolate(springVal, [0, 1], [1.15, 1])}) rotate(-3deg)`,
        transformOrigin: 'left center',
        display: 'inline-block',
      }}
    >
      <div
        style={{
          border: `2.5px solid ${T.brick}`,
          borderRadius: 8,
          padding: '6px 16px',
          color: T.brick,
          fontFamily: T.fontBody,
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: 2,
          textTransform: 'uppercase',
          display: 'inline-block',
        }}
      >
        {text}
      </div>
    </div>
  );
};

const TwoToneHeadline: React.FC<{
  title: string;
  accent?: string;
  delay?: number;
}> = ({ title, accent, delay = 8 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame: Math.max(0, frame - delay),
    config: { damping: 24, stiffness: 100 },
  });

  const translateY = (1 - progress) * 24;
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  // Determine which words get accent color
  const renderTitleContent = () => {
    if (accent && title.toLowerCase().includes(accent.toLowerCase())) {
      const idx = title.toLowerCase().indexOf(accent.toLowerCase());
      const before = title.slice(0, idx);
      const highlighted = title.slice(idx, idx + accent.length);
      const after = title.slice(idx + accent.length);
      return (
        <>
          {before && <span style={{ color: T.ink }}>{before}</span>}
          <span style={{ color: T.brick }}>{highlighted}</span>
          {after && <span style={{ color: T.ink }}>{after}</span>}
        </>
      );
    }

    // Default heuristic: highlight first 1-2 words if title has multiple words
    const words = title.split(' ');
    if (words.length >= 3) {
      const accentCount = Math.min(2, Math.floor(words.length / 2));
      const redPart = words.slice(0, accentCount).join(' ');
      const inkPart = words.slice(accentCount).join(' ');
      return (
        <>
          <span style={{ color: T.brick }}>{redPart} </span>
          <span style={{ color: T.ink }}>{inkPart}</span>
        </>
      );
    }

    return <span style={{ color: T.ink }}>{title}</span>;
  };

  const fontSize = title.length > 50 ? 68 : title.length > 30 ? 76 : 84;

  return (
    <div
      style={{
        fontFamily: T.fontDisplay,
        fontSize,
        fontWeight: 800,
        lineHeight: 1.14,
        letterSpacing: -1.6,
        overflowWrap: 'break-word',
        opacity: frame < delay ? 0 : opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {renderTitleContent()}
    </div>
  );
};

const LeadText: React.FC<{ text?: string; delay?: number }> = ({
  text,
  delay = 12,
}) => {
  const frame = useCurrentFrame();
  if (!text) return null;

  const opacity = interpolate(frame, [delay, delay + 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        fontFamily: T.fontBody,
        fontSize: 32,
        fontWeight: 600,
        lineHeight: 1.45,
        color: T.muted,
        marginTop: 18,
        maxWidth: 900,
        overflowWrap: 'break-word',
      }}
    >
      {text}
    </div>
  );
};

const PillTags: React.FC<{ tags?: string[]; delay?: number }> = ({
  tags,
  delay = 14,
}) => {
  const frame = useCurrentFrame();
  if (!tags?.length) return null;

  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        marginTop: 22,
      }}
    >
      {tags.map((tag, i) => (
        <div
          key={i}
          style={{
            backgroundColor: T.tagBg,
            border: `1.5px solid ${T.tagBorder}`,
            borderRadius: 24,
            padding: '6px 18px',
            fontFamily: T.fontBody,
            fontSize: 19,
            fontWeight: 700,
            letterSpacing: 1.2,
            color: T.ink,
            textTransform: 'uppercase',
            boxShadow: '0 2px 8px rgba(26,57,48,0.04)',
          }}
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

// ==========================================
// POSTCARD & MEDIA COMPONENTS
// ==========================================

const Postcard: React.FC<{
  path?: string;
  height?: number;
  rotation?: number;
  sourceLabel?: string;
  delay?: number;
}> = ({
  path,
  height = 560,
  rotation = 0,
  sourceLabel = 'Nguồn: Tư liệu lịch sử',
  delay = 14,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const arrival = spring({
    fps,
    frame: Math.max(0, frame - delay),
    config: { damping: 22, stiffness: 95 },
  });

  // Slow subtle Ken Burns zoom
  const pan = interpolate(frame, [0, 240], [1.0, 1.05], {
    extrapolateRight: 'clamp',
  });

  const translateY = (1 - arrival) * 35;
  const scale = interpolate(arrival, [0, 1], [0.93, 1]);

  return (
    <div
      style={{
        width: '100%',
        opacity: frame < delay ? 0 : arrival,
        transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotation}deg)`,
        transformOrigin: 'center center',
        backgroundColor: T.white,
        padding: '12px 12px 0 12px',
        borderRadius: 20,
        boxShadow: '0 20px 45px rgba(26, 57, 48, 0.12)',
        boxSizing: 'border-box',
      }}
    >
      {/* Inner Image Container */}
      <div
        style={{
          height,
          borderRadius: 12,
          overflow: 'hidden',
          backgroundColor: '#E7ECE8',
          position: 'relative',
        }}
      >
        {path ? (
          <Img
            src={staticFile(path)}
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              transform: `scale(${pan})`,
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(145deg, #CBD5D0 0%, #A2B6AF 45%, #628377 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              padding: 30,
              color: T.white,
            }}
          >
            <div style={{ fontSize: 44, marginBottom: 8, opacity: 0.9 }}>
              📷
            </div>
            <div
              style={{
                fontFamily: T.fontDisplay,
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              HÌNH ẢNH TƯ LIỆU
            </div>
            <div
              style={{
                fontFamily: T.fontBody,
                fontSize: 20,
                opacity: 0.8,
                marginTop: 6,
              }}
            >
              Đặt ảnh tại input/assets
            </div>
          </div>
        )}
      </div>

      {/* Postcard Footer inside the card */}
      <div
        style={{
          height: 52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px',
          boxSizing: 'border-box',
        }}
      >
        <span
          style={{
            fontFamily: T.fontBody,
            fontSize: 18,
            fontWeight: 600,
            color: T.muted,
          }}
        >
          {sourceLabel}
        </span>
        <span
          style={{
            fontFamily: T.fontBody,
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 1.8,
            color: T.brick,
            textTransform: 'uppercase',
          }}
        >
          POSTCARD
        </span>
      </div>
    </div>
  );
};

// ==========================================
// SCENE RENDERER WITH ALL 7 VARIANTS
// ==========================================

export const EditorialScene: React.FC<{
  scene: Scene;
  index: number;
  total: number;
}> = ({ scene, index }) => {
  const frame = useCurrentFrame();

  // Extract or synthesize data-driven values
  const kicker = scene.kicker || (index === 0 ? 'HỒ SƠ DU LỊCH' : `CHUYÊN ĐỀ · PHẦN ${index + 1}`);
  const locationTag = scene.locationTag || scene.subtitle || 'TƯ LIỆU';
  const stamp = scene.stamp || (index === 0 ? 'KÝ ỨC VÙNG CAO' : undefined);
  const tags = scene.tags || (scene.items?.length && scene.items.length <= 4 && scene.type !== 'timeline' && scene.type !== 'comparison' ? scene.items.map(x => x.slice(0, 15)) : undefined);
  const image1 = scene.images?.[0];
  const image2 = scene.images?.[1];

  return (
    <EditorialCanvas kicker={kicker} locationTag={locationTag}>
      {/* 1. Rotated Stamp Badge */}
      <StampBadge text={stamp} delay={4} />

      {/* 2. Main Two-Tone Headline */}
      <TwoToneHeadline
        title={scene.title}
        accent={scene.titleAccent}
        delay={8}
      />

      {/* 3. Sub-headline / Narrative lead */}
      <LeadText text={scene.subtitle} delay={12} />

      {/* 4. Pill Tags */}
      <PillTags tags={tags} delay={14} />

      {/* 5. Variant-Specific Visual Content */}
      <div style={{ marginTop: 36, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* SCENE TYPE: COVER */}
        {scene.type === 'cover' && (
          <div style={{ marginTop: 10, width: '96%', alignSelf: 'center' }}>
            <Postcard
              path={image1}
              height={580}
              rotation={-1.8}
              sourceLabel={scene.sourceLabel}
              delay={14}
            />
          </div>
        )}

        {/* SCENE TYPE: PHOTO-STORY */}
        {scene.type === 'photo-story' && (
          <div style={{ marginTop: 10, width: '98%', alignSelf: 'center' }}>
            <Postcard
              path={image1}
              height={560}
              rotation={0}
              sourceLabel={scene.sourceLabel}
              delay={14}
            />
            {scene.quote && (
              <div
                style={{
                  fontFamily: T.fontBody,
                  fontSize: 24,
                  fontWeight: 600,
                  color: T.ink,
                  marginTop: 18,
                  padding: '0 8px',
                  lineHeight: 1.4,
                  opacity: interpolate(frame, [22, 34], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                }}
              >
                {scene.quote}
              </div>
            )}
          </div>
        )}

        {/* SCENE TYPE: PHOTO-STACK */}
        {scene.type === 'photo-stack' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginTop: 10 }}>
            <div style={{ width: '96%', alignSelf: 'center' }}>
              <Postcard
                path={image1}
                height={330}
                rotation={-1.2}
                sourceLabel={scene.sourceLabel}
                delay={12}
              />
            </div>
            <div style={{ width: '96%', alignSelf: 'center' }}>
              <Postcard
                path={image2 || image1}
                height={330}
                rotation={1.2}
                sourceLabel={scene.sourceLabel}
                delay={22}
              />
            </div>
          </div>
        )}

        {/* SCENE TYPE: TIMELINE */}
        {scene.type === 'timeline' && (
          <div
            style={{
              marginTop: 20,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              paddingLeft: 30,
            }}
          >
            {/* Vertical continuous tracker line */}
            <div
              style={{
                position: 'absolute',
                top: 24,
                bottom: 30,
                left: 43,
                width: 2,
                backgroundColor: 'rgba(26, 57, 48, 0.18)',
              }}
            />

            {(
              scene.timelineItems || [
                {
                  title: 'Điểm khởi hành',
                  subtitle: 'Bắt đầu hành trình qua các vùng núi cao',
                  time: '0H',
                },
                {
                  title: 'Đường đèo hoang sơ',
                  subtitle: 'Đường đất hiểm trở qua các bản làng thưa dân',
                  time: '5H',
                },
                {
                  title: 'Đến nơi an toàn',
                  subtitle: 'Thị trấn đón những vị khách đầu tiên',
                  time: '10H',
                },
              ]
            ).map((item, idx) => {
              const rowProgress = interpolate(
                frame,
                [14 + idx * 10, 26 + idx * 10],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );

              return (
                <div
                  key={idx}
                  style={{
                    opacity: rowProgress,
                    transform: `translateY(${(1 - rowProgress) * 20}px)`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    padding: '24px 0',
                    borderBottom:
                      idx < 2 ? '1px solid rgba(26, 57, 48, 0.08)' : 'none',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 26 }}>
                    {/* Node Circle */}
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        backgroundColor: idx === 0 ? T.brick : T.ink,
                        border: `3px solid ${T.paper}`,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                        marginTop: 4,
                        zIndex: 2,
                      }}
                    />
                    {/* Titles */}
                    <div>
                      <div
                        style={{
                          fontFamily: T.fontBody,
                          fontSize: 34,
                          fontWeight: 700,
                          color: T.ink,
                        }}
                      >
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div
                          style={{
                            fontFamily: T.fontBody,
                            fontSize: 24,
                            color: T.muted,
                            marginTop: 6,
                            maxWidth: 620,
                          }}
                        >
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Time Marker */}
                  {item.time && (
                    <div
                      style={{
                        fontFamily: T.fontBody,
                        fontSize: 28,
                        fontWeight: 800,
                        color: idx === 0 ? T.brick : T.ink,
                        letterSpacing: 1,
                      }}
                    >
                      {item.time}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* SCENE TYPE: COMPARISON */}
        {scene.type === 'comparison' && (
          <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column' }}>
            {(
              scene.comparisonItems || [
                {
                  label: 'BAN NGÀY',
                  text: scene.items?.[0] || 'Chợ phiên nhộn nhịp nơi phố núi',
                },
                {
                  label: 'BAN ĐÊM',
                  text: scene.items?.[1] || 'Những điệu hát đối giao duyên sâu lắng',
                },
              ]
            ).map((item, idx) => {
              const compProgress = interpolate(
                frame,
                [14 + idx * 10, 26 + idx * 10],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );

              return (
                <div
                  key={idx}
                  style={{
                    opacity: compProgress,
                    transform: `translateY(${(1 - compProgress) * 20}px)`,
                    padding: '30px 0',
                    borderBottom: '1px solid rgba(26, 57, 48, 0.12)',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 36,
                  }}
                >
                  <div
                    style={{
                      fontFamily: T.fontBody,
                      fontSize: 24,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      color: T.brick,
                      minWidth: 140,
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: T.fontBody,
                      fontSize: 34,
                      fontWeight: 700,
                      color: T.ink,
                      lineHeight: 1.35,
                      flex: 1,
                    }}
                  >
                    {item.text}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* SCENE TYPE: STATISTIC */}
        {scene.type === 'statistic' && (
          <div
            style={{
              marginTop: 28,
              opacity: interpolate(frame, [14, 26], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: `translateY(${interpolate(frame, [14, 26], [25, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })}px)`,
              backgroundColor: T.white,
              border: `2px dashed ${T.dashedBorder}`,
              borderRadius: 22,
              padding: '42px 48px',
              boxShadow: '0 16px 40px rgba(26,57,48,0.08)',
            }}
          >
            <div
              style={{
                fontFamily: T.fontBody,
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: 2,
                color: T.ink,
                textTransform: 'uppercase',
              }}
            >
              {scene.statisticLabel || 'CON SỐ ĐÁNG CHÚ Ý'}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 16,
                marginTop: 18,
              }}
            >
              <span
                style={{
                  fontFamily: T.fontDisplay,
                  fontSize: 115,
                  fontWeight: 800,
                  letterSpacing: -3,
                  color: T.brick,
                  lineHeight: 1,
                }}
              >
                {scene.statistic || '1990'}
              </span>
              {scene.statisticUnit ? (
                <span
                  style={{
                    fontFamily: T.fontBody,
                    fontSize: 42,
                    fontWeight: 800,
                    color: T.ink,
                  }}
                >
                  {scene.statisticUnit}
                </span>
              ) : null}
            </div>

            <div
              style={{
                fontFamily: T.fontBody,
                fontSize: 26,
                fontWeight: 600,
                color: T.muted,
                marginTop: 18,
                lineHeight: 1.45,
              }}
            >
              {scene.statisticDesc ||
                scene.subtitle ||
                'Toàn khu vực chỉ có vài cơ sở lưu trú phục vụ cùng lúc.'}
            </div>
          </div>
        )}

        {/* SCENE TYPE: ENDING */}
        {scene.type === 'ending' && (
          <div
            style={{
              marginTop: 20,
              opacity: interpolate(frame, [16, 28], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {image1 && (
              <div style={{ width: '96%', alignSelf: 'center', marginBottom: 28 }}>
                <Postcard
                  path={image1}
                  height={420}
                  rotation={0.8}
                  sourceLabel={scene.sourceLabel}
                  delay={12}
                />
              </div>
            )}
            {/* CTA Button */}
            <div
              style={{
                backgroundColor: T.buttonBg,
                color: T.white,
                padding: '20px 40px',
                borderRadius: 20,
                fontFamily: T.fontBody,
                fontSize: 28,
                fontWeight: 700,
                display: 'inline-block',
                alignSelf: 'flex-start',
                boxShadow: '0 12px 30px rgba(28,77,67,0.25)',
              }}
            >
              {scene.ctaText || 'Lưu giữ câu chuyện di sản'}
            </div>

            {/* Ending Hashtags */}
            <div
              style={{
                fontFamily: T.fontBody,
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 1,
                color: T.subtle,
                marginTop: 28,
              }}
            >
              {scene.hashtags?.join(' ') ||
                '#CauNgoiChoLuong #HaiAnhNinhBinh #DiSanVietNam'}
            </div>
          </div>
        )}
      </div>
    </EditorialCanvas>
  );
};
