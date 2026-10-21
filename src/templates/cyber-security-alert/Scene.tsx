import React from 'react';
import type { Scene } from '../../core/types';
import {
  Badge,
  Headline,
  Note,
  NumberBadge,
  PaperCard,
  Postcard,
  Reveal,
  SceneFrame,
} from './EditorialPrimitives';
import { CYBER_THEME as T } from './theme';

type CyberSceneProps = { scene: Scene; index: number; total: number };

const DisplayText: React.FC<{ children: React.ReactNode; size?: number; color?: string }> = ({
  children,
  size = 27,
  color = T.ink,
}) => (
  <div
    style={{
      color,
      fontFamily: T.fontBody,
      fontSize: size,
      fontWeight: 700,
      lineHeight: 1.32,
      overflowWrap: 'anywhere',
    }}
  >
    {children}
  </div>
);

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      color: T.inkFaint,
      fontFamily: T.fontBody,
      fontSize: 15,
      fontWeight: 900,
      letterSpacing: 1.2,
      lineHeight: 1.3,
      textTransform: 'uppercase',
    }}
  >
    {children}
  </div>
);

export const CyberHookScene: React.FC<CyberSceneProps> = ({ scene, index, total }) => (
  <SceneFrame index={index} total={total} kicker={scene.kicker} threatLevel={scene.threatLevel}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Reveal>
        <Headline
          title={scene.title}
          kicker={scene.kicker || 'CẢNH BÁO AN NINH MẠNG'}
          subtitle={scene.subtitle}
        />
      </Reveal>
      {scene.quote ? (
        <Reveal delay={8}>
          <PaperCard tone="alert" style={{ padding: '24px 30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 18 }}>
              <Label>TÌNH HUỐNG MÔ PHỎNG</Label>
              <Badge tone="neutral">VÍ DỤ</Badge>
            </div>
            <DisplayText size={30}>{scene.quote}</DisplayText>
          </PaperCard>
        </Reveal>
      ) : null}
      {scene.titleAccent || scene.statistic ? (
        <Reveal delay={12}>
          <Note>{scene.titleAccent || scene.statistic}</Note>
        </Reveal>
      ) : null}
      <Postcard scene={scene} height={390} />
    </div>
  </SceneFrame>
);

export const CyberFakeChatScene: React.FC<CyberSceneProps> = ({ scene, index, total }) => {
  const sender = scene.fakeSender || 'NGUỒN GỬI MÔ PHỎNG';
  const message = scene.fakeMessage || 'Nội dung tin nhắn mô phỏng được lấy từ dữ liệu scene.';
  const link = scene.fakeLink || 'https://example.invalid/link-mo-phong';

  return (
    <SceneFrame index={index} total={total} kicker={scene.kicker} threatLevel={scene.threatLevel}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <Reveal>
          <Headline title={scene.title} kicker={scene.kicker || 'NHẬN DIỆN THỦ ĐOẠN'} badge="MÔ PHỎNG" />
        </Reveal>
        <Reveal delay={8}>
          <div
            style={{
              borderRadius: 25,
              border: `1px solid ${T.rule}`,
              backgroundColor: T.paperLight,
              boxShadow: `0 14px 32px ${T.shadow}`,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '20px 26px',
                borderBottom: `1px solid ${T.rule}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div>
                <Label>TIN NHẮN MẪU</Label>
                <DisplayText size={22}>{sender}</DisplayText>
              </div>
              <Badge>KHÔNG PHẢI TIN THẬT</Badge>
            </div>
            <div style={{ padding: '26px 26px 22px', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div
                style={{
                  alignSelf: 'flex-start',
                  maxWidth: '100%',
                  padding: '20px 22px',
                  backgroundColor: T.paperShade,
                  border: `1px solid ${T.rule}`,
                }}
              >
                <DisplayText size={26}>{message}</DisplayText>
              </div>
              <div
                style={{
                  padding: '15px 18px',
                  backgroundColor: T.brickPale,
                  borderLeft: `4px solid ${T.brick}`,
                  color: T.brickDark,
                  fontFamily: T.fontMono,
                  fontSize: 24,
                  fontWeight: 700,
                  overflowWrap: 'anywhere',
                }}
              >
                {link}
              </div>
              <Label>ĐƯỜNG DẪN TRONG VÍ DỤ · KHÔNG TRUY CẬP</Label>
            </div>
          </div>
        </Reveal>
        {scene.footnote ? <Reveal delay={15}><Note>{scene.footnote}</Note></Reveal> : null}
        <Postcard scene={scene} height={310} />
      </div>
    </SceneFrame>
  );
};

export const CyberAnatomyScene: React.FC<CyberSceneProps> = ({ scene, index, total }) => {
  const steps = scene.steps ?? [];
  return (
    <SceneFrame index={index} total={total} kicker={scene.kicker} threatLevel={scene.threatLevel}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
        <Reveal>
          <Headline title={scene.title} kicker={scene.kicker || 'DIỄN TIẾN CẦN BIẾT'} subtitle={scene.subtitle} />
        </Reveal>
        {steps.length ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {steps.map((step, idx) => (
              <Reveal key={`${step.stepNumber}-${idx}`} delay={5 + idx * 5}>
                <PaperCard tone="alert" style={{ display: 'flex', alignItems: 'flex-start', gap: 20, padding: '18px 22px' }}>
                  <NumberBadge>{String(step.stepNumber).padStart(2, '0')}</NumberBadge>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    <DisplayText size={25}>{step.title}</DisplayText>
                    <DisplayText size={22} color={T.inkSoft}>{step.desc}</DisplayText>
                  </div>
                </PaperCard>
              </Reveal>
            ))}
          </div>
        ) : null}
        <Postcard scene={scene} height={330} />
      </div>
    </SceneFrame>
  );
};

export const CyberRedFlagsScene: React.FC<CyberSceneProps> = ({ scene, index, total }) => {
  const flags = scene.items ?? [];
  return (
    <SceneFrame index={index} total={total} kicker={scene.kicker} threatLevel={scene.threatLevel}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <Reveal>
          <Headline title={scene.title} kicker={scene.kicker || 'DẤU HIỆU CẦN KIỂM TRA'} />
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 17 }}>
          {flags.map((flag, idx) => (
            <Reveal key={`${idx}-${flag}`} delay={6 + idx * 5}>
              <PaperCard tone="alert" style={{ display: 'flex', alignItems: 'flex-start', gap: 20, padding: '22px 24px' }}>
                <NumberBadge>{String(idx + 1).padStart(2, '0')}</NumberBadge>
                <DisplayText size={25}>{flag}</DisplayText>
              </PaperCard>
            </Reveal>
          ))}
        </div>
        {scene.footnote ? <Reveal delay={18}><Note tone="neutral">{scene.footnote}</Note></Reveal> : null}
        <Postcard scene={scene} height={320} />
      </div>
    </SceneFrame>
  );
};

export const CyberCompareScene: React.FC<CyberSceneProps> = ({ scene, index, total }) => {
  const realDomain = scene.realDomain || 'ten-mien-tham-chieu.example';
  const fakeDomain = scene.fakeDomain || 'ten-mien-dang-ngo.example';
  const realLabel = scene.realDomainLabel || 'MẪU ĐỐI CHIẾU · CẦN XÁC MINH';
  const fakeLabel = scene.fakeDomainLabel || 'VÍ DỤ MIỀN ĐÁNG NGỜ';
  const entries = [
    {
      label: realLabel,
      domain: realDomain,
      note: scene.realDomainNote || 'Tên miền ví dụ; màu sắc hoặc hình thức không tự xác minh được độ tin cậy.',
      tone: 'plain' as const,
    },
    {
      label: fakeLabel,
      domain: fakeDomain,
      note: scene.fakeDomainNote || 'Miền ví dụ dành cho minh họa; hãy tự kiểm tra qua kênh chính thức.',
      tone: 'alert' as const,
    },
  ];

  return (
    <SceneFrame index={index} total={total} kicker={scene.kicker} threatLevel={scene.threatLevel}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <Reveal>
          <Headline title={scene.title} kicker={scene.kicker || 'ĐỐI CHIẾU TRƯỚC KHI NHẤP'} />
        </Reveal>
        {entries.map((entry, idx) => (
          <Reveal key={`${entry.label}-${idx}`} delay={7 + idx * 8}>
            <PaperCard tone={entry.tone} style={{ padding: '22px 26px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 15 }}>
                <Label>{entry.label}</Label>
                <Badge tone={idx === 0 ? 'neutral' : 'alert'}>{idx === 0 ? 'ĐỐI CHIẾU' : 'CẢNH GIÁC'}</Badge>
              </div>
              <div
                style={{
                  color: T.ink,
                  fontFamily: T.fontMono,
                  fontSize: 30,
                  fontWeight: 800,
                  lineHeight: 1.25,
                  overflowWrap: 'anywhere',
                }}
              >
                {entry.domain}
              </div>
              <div style={{ marginTop: 14 }}><Note tone="neutral">{entry.note}</Note></div>
            </PaperCard>
          </Reveal>
        ))}
        <Postcard scene={scene} height={300} />
      </div>
    </SceneFrame>
  );
};

export const CyberLossStatScene: React.FC<CyberSceneProps> = ({ scene, index, total }) => (
  <SceneFrame index={index} total={total} kicker={scene.kicker} threatLevel={scene.threatLevel}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
      <Reveal>
        <Headline title={scene.title} kicker={scene.kicker || 'SỐ LIỆU CÓ NGUỒN'} />
      </Reveal>
      {scene.statistic ? (
        <Reveal delay={8}>
          <PaperCard tone="alert" style={{ padding: '30px 34px' }}>
            {scene.statisticLabel ? <Label>{scene.statisticLabel}</Label> : null}
            <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: 12, marginTop: 10 }}>
              <div
                style={{
                  color: T.brick,
                  fontFamily: T.fontDisplay,
                  fontSize: scene.statistic.length > 12 ? 76 : 112,
                  fontWeight: 900,
                  lineHeight: 0.98,
                  letterSpacing: -3,
                  overflowWrap: 'anywhere',
                }}
              >
                {scene.statistic}
              </div>
              {scene.statisticUnit ? <DisplayText size={31}>{scene.statisticUnit}</DisplayText> : null}
            </div>
            {scene.statisticDesc ? <p style={{ margin: '24px 0 0', color: T.ink, fontSize: 27, lineHeight: 1.4 }}>{scene.statisticDesc}</p> : null}
            {scene.sourceLabel ? <div style={{ marginTop: 20 }}><Label>{scene.sourceLabel}</Label></div> : null}
          </PaperCard>
        </Reveal>
      ) : (
        <Reveal delay={8}><Note tone="neutral">Chỉ hiển thị số liệu khi dự án cung cấp dữ liệu và nguồn phù hợp.</Note></Reveal>
      )}
      <Postcard scene={scene} height={390} />
    </div>
  </SceneFrame>
);

export const CyberShieldDefenseScene: React.FC<CyberSceneProps> = ({ scene, index, total }) => {
  const rules = scene.defenseRules ?? [];
  return (
    <SceneFrame index={index} total={total} kicker={scene.kicker} threatLevel={scene.threatLevel}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 27 }}>
        <Reveal>
          <Headline title={scene.title} kicker={scene.kicker || 'CÁCH TỰ BẢO VỆ'} badge="VIỆC CÓ THỂ LÀM" subtitle={scene.subtitle} />
        </Reveal>
        {rules.length ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {rules.map((rule, idx) => (
              <Reveal key={`${rule.title}-${idx}`} delay={6 + idx * 5}>
                <PaperCard tone="safe" style={{ display: 'flex', alignItems: 'flex-start', gap: 19, padding: '18px 21px' }}>
                  <NumberBadge tone="safe">{String(idx + 1).padStart(2, '0')}</NumberBadge>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <DisplayText size={24} color={T.safety}>{rule.title}</DisplayText>
                    <DisplayText size={21} color={T.inkSoft}>{rule.desc}</DisplayText>
                  </div>
                </PaperCard>
              </Reveal>
            ))}
          </div>
        ) : null}
        <Postcard scene={scene} height={300} />
      </div>
    </SceneFrame>
  );
};

export const CyberHotlineScene: React.FC<CyberSceneProps> = ({ scene, index, total }) => {
  const hasContact = Boolean(scene.hotline || scene.officialWebsite);
  return (
    <SceneFrame index={index} total={total} kicker={scene.kicker} threatLevel={scene.threatLevel}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 31 }}>
        <Reveal>
          <Headline
            title={scene.title}
            kicker={scene.kicker || 'LƯU LẠI · CHIA SẺ · BẢO VỆ'}
            badge={hasContact ? 'ĐẦU MỐI HỖ TRỢ' : 'AN TOÀN CHO MỌI NGƯỜI'}
            subtitle={scene.subtitle}
          />
        </Reveal>
        {hasContact ? (
          <Reveal delay={9}>
            <PaperCard tone="safe" style={{ padding: '25px 29px', display: 'flex', flexDirection: 'column', gap: 22 }}>
              {scene.hotline ? (
                <div>
                  <Label>ĐẦU MỐI LIÊN HỆ</Label>
                  <div style={{ marginTop: 8 }}><DisplayText size={42} color={T.safety}>{scene.hotline}</DisplayText></div>
                </div>
              ) : null}
              {scene.hotline && scene.officialWebsite ? <div style={{ height: 1, backgroundColor: T.rule }} /> : null}
              {scene.officialWebsite ? (
                <div>
                  <Label>WEBSITE</Label>
                  <div
                    style={{
                      marginTop: 8,
                      color: T.safety,
                      fontFamily: T.fontMono,
                      fontSize: 29,
                      fontWeight: 800,
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {scene.officialWebsite}
                  </div>
                </div>
              ) : null}
            </PaperCard>
          </Reveal>
        ) : null}
        {scene.ctaText ? (
          <Reveal delay={14}>
            <PaperCard tone="alert" style={{ padding: '24px 28px' }}>
              <DisplayText size={29} color={T.brickDark}>{scene.ctaText}</DisplayText>
            </PaperCard>
          </Reveal>
        ) : null}
        <Postcard scene={scene} height={370} />
      </div>
    </SceneFrame>
  );
};

export const CyberScene: React.FC<CyberSceneProps> = ({ scene, index, total }) => {
  switch (scene.type) {
    case 'cyber-hook':
    case 'cover':
      return <CyberHookScene scene={scene} index={index} total={total} />;
    case 'cyber-fake-chat':
      return <CyberFakeChatScene scene={scene} index={index} total={total} />;
    case 'cyber-anatomy':
    case 'timeline':
      return <CyberAnatomyScene scene={scene} index={index} total={total} />;
    case 'cyber-red-flags':
      return <CyberRedFlagsScene scene={scene} index={index} total={total} />;
    case 'cyber-compare':
    case 'comparison':
      return <CyberCompareScene scene={scene} index={index} total={total} />;
    case 'cyber-loss-stat':
    case 'statistic':
      return <CyberLossStatScene scene={scene} index={index} total={total} />;
    case 'cyber-shield-defense':
    case 'photo-story':
    case 'photo-stack':
      return <CyberShieldDefenseScene scene={scene} index={index} total={total} />;
    case 'cyber-hotline':
    case 'ending':
    default:
      return <CyberHotlineScene scene={scene} index={index} total={total} />;
  }
};
