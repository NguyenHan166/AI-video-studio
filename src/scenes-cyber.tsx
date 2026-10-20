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
import { CYBER_THEME as T } from './theme-cyber';
import type { Scene } from './types';

// ==========================================
// 1. CYBER HUD CANVAS & BACKGROUND
// ==========================================

export const CyberHUDCanvas: React.FC<{
  children: React.ReactNode;
  kicker?: string;
  threatLevel?: string;
  caseCode?: string;
}> = ({ children, kicker, threatLevel = 'NGUY HIỂM CAO', caseCode = '#CYBER-ALERT' }) => {
  const frame = useCurrentFrame();

  // Pulsing emergency red dot
  const pulseOpacity = interpolate(
    Math.sin(frame * 0.18),
    [-1, 1],
    [0.4, 1]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: T.bgDark,
        overflow: 'hidden',
      }}
    >
      {/* 1. Cyber Digital Grid Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(${T.gridLine} 1px, transparent 1px),
            linear-gradient(90deg, ${T.gridLine} 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }}
      />

      {/* 2. Ambient Cyber Threat Glow */}
      <div
        style={{
          position: 'absolute',
          top: -100,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 900,
          height: 400,
          background: `radial-gradient(circle, ${T.dangerGlow} 0%, transparent 70%)`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* 3. Top Emergency HUD Ticker */}
      <div
        style={{
          position: 'absolute',
          top: 45,
          left: 60,
          right: 60,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 24px',
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          border: `1.5px solid ${T.borderColor}`,
          borderRadius: 8,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          zIndex: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Pulsing Alert Beacon */}
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: T.danger,
              boxShadow: `0 0 12px ${T.danger}`,
              opacity: pulseOpacity,
            }}
          />
          <span
            style={{
              fontFamily: T.fontMono,
              fontSize: 20,
              fontWeight: 800,
              color: T.danger,
              letterSpacing: 2,
            }}
          >
            {kicker || 'CẢNH BÁO KHẨN · AN NINH MẠNG'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              fontFamily: T.fontMono,
              fontSize: 18,
              fontWeight: 700,
              color: T.cyan,
              letterSpacing: 1,
            }}
          >
            {caseCode}
          </span>
          <span
            style={{
              fontFamily: T.fontMono,
              fontSize: 16,
              fontWeight: 800,
              color: T.danger,
              backgroundColor: 'rgba(255, 46, 85, 0.15)',
              padding: '4px 10px',
              borderRadius: 4,
              border: `1px solid ${T.danger}`,
            }}
          >
            {threatLevel}
          </span>
        </div>
      </div>

      {/* 4. Tech Corner Bracket Accents */}
      <div
        style={{
          position: 'absolute',
          top: 30,
          left: 30,
          width: 24,
          height: 24,
          borderTop: `2px solid ${T.cyan}`,
          borderLeft: `2px solid ${T.cyan}`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 30,
          right: 30,
          width: 24,
          height: 24,
          borderTop: `2px solid ${T.cyan}`,
          borderRight: `2px solid ${T.cyan}`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 30,
          left: 30,
          width: 24,
          height: 24,
          borderBottom: `2px solid ${T.cyan}`,
          borderLeft: `2px solid ${T.cyan}`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 30,
          right: 30,
          width: 24,
          height: 24,
          borderBottom: `2px solid ${T.cyan}`,
          borderRight: `2px solid ${T.cyan}`,
          pointerEvents: 'none',
        }}
      />

      {/* 5. Main Safe Content Body */}
      <div
        style={{
          position: 'relative',
          padding: '120px 75px 260px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          boxSizing: 'border-box',
          zIndex: 5,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 1: CYBER HOOK / EMERGENCY ALERT
// ==========================================

export const CyberHookScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const cardSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const threatText = scene.statistic || scene.titleAccent || 'MẤT TRẮNG HÀNG TỶ ĐỒNG';
  const alertSubtitle = scene.subtitle || 'Thủ đoạn lừa đảo công nghệ cao mới nhất';

  return (
    <CyberHUDCanvas kicker={scene.kicker} threatLevel={scene.threatLevel}>
      {/* 1. Flashing Warning Ribbon */}
      <div
        style={{
          textAlign: 'center',
          marginTop: 40,
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.85, 1])})`,
          opacity: titleSpring,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            backgroundColor: 'rgba(255, 46, 85, 0.18)',
            border: `2px solid ${T.danger}`,
            padding: '10px 28px',
            borderRadius: 9999,
            boxShadow: `0 0 25px ${T.dangerGlow}`,
          }}
        >
          <span style={{ fontSize: 28 }}>⚠️</span>
          <span
            style={{
              fontFamily: T.fontMono,
              fontSize: 26,
              fontWeight: 900,
              color: T.danger,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            {scene.title}
          </span>
        </div>
      </div>

      {/* 2. Giant Glowing Threat Figure / Punchline */}
      <div
        style={{
          textAlign: 'center',
          marginTop: 50,
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.9, 1])})`,
          opacity: titleSpring,
        }}
      >
        <h1
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 78,
            fontWeight: 900,
            color: T.textLight,
            margin: 0,
            lineHeight: 1.15,
            textShadow: `0 0 35px ${T.dangerGlow}`,
            letterSpacing: -0.5,
          }}
        >
          {threatText}
        </h1>
      </div>

      {/* 3. Central Threat Visual / Device Mockup Card */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 40,
          marginBottom: 35,
          opacity: cardSpring,
          transform: `scale(${interpolate(cardSpring, [0, 1], [0.92, 1])})`,
        }}
      >
        {scene.images?.[0] ? (
          <div
            style={{
              width: 780,
              height: 520,
              borderRadius: 20,
              overflow: 'hidden',
              border: `2px solid ${T.danger}`,
              boxShadow: `0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px ${T.dangerGlow}`,
              position: 'relative',
            }}
          >
            <Img
              src={staticFile(scene.images[0])}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Warning Stamp Overlay */}
            <div
              style={{
                position: 'absolute',
                top: 24,
                right: 24,
                backgroundColor: T.danger,
                color: '#FFFFFF',
                fontFamily: T.fontMono,
                fontSize: 22,
                fontWeight: 900,
                padding: '8px 18px',
                borderRadius: 8,
                letterSpacing: 1.5,
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              }}
            >
              [CẢNH BÁO ĐỎ]
            </div>
          </div>
        ) : (
          <div
            style={{
              width: 780,
              height: 480,
              backgroundColor: T.bgCard,
              borderRadius: 20,
              border: `2px solid ${T.borderDanger}`,
              boxShadow: `0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px ${T.dangerGlow}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 40,
              boxSizing: 'border-box',
            }}
          >
            <div style={{ fontSize: 90, marginBottom: 20 }}>🚨</div>
            <div
              style={{
                fontFamily: T.fontMono,
                fontSize: 34,
                fontWeight: 900,
                color: T.danger,
                textAlign: 'center',
                letterSpacing: 1,
              }}
            >
              BẪY CÔNG NGHỆ CAO XÂM NHẬP
            </div>
            <div
              style={{
                fontFamily: T.fontBody,
                fontSize: 26,
                color: T.textMuted,
                marginTop: 14,
                textAlign: 'center',
                maxWidth: 600,
              }}
            >
              {scene.quote || 'Tội phạm sử dụng AI Deepfake & Link độc hại để chiếm đoạt tài sản'}
            </div>
          </div>
        )}
      </div>

      {/* 4. Subtitle / Prompt */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <p
          style={{
            fontFamily: T.fontBody,
            fontSize: 32,
            fontWeight: 700,
            color: T.amber,
            margin: 0,
            letterSpacing: 0.5,
          }}
        >
          {alertSubtitle}
        </p>
      </div>
    </CyberHUDCanvas>
  );
};

// ==========================================
// SCENE 2: FAKE CHAT / SMS SCAM MOCKUP
// ==========================================

export const CyberFakeChatScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  const chatSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const tagSpring = spring({
    frame: frame - 24,
    fps,
    config: { damping: 15, stiffness: 85 },
  });

  const fakeSender = scene.fakeSender || 'ACB_SMS_OTP';
  const fakeMessage =
    scene.fakeMessage ||
    'Tài khoản của bạn vừa đăng nhập tại vị trí lạ. Nếu không phải bạn, hãy nhấn vào đường link bên dưới để xác minh hủy giao dịch ngay lập tức:';
  const fakeLink = scene.fakeLink || 'http://acb-xac-thuc-online.xyz/login';

  return (
    <CyberHUDCanvas kicker={scene.kicker} threatLevel="TIN NHẮN GIẢ MẠO">
      {/* Title */}
      <div
        style={{
          marginTop: 35,
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.9, 1])})`,
          opacity: titleSpring,
        }}
      >
        <h2
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 62,
            fontWeight: 900,
            color: T.textLight,
            margin: 0,
            lineHeight: 1.25,
          }}
        >
          {scene.title}
        </h2>
      </div>

      {/* Simulated Smartphone Chat Bubble */}
      <div
        style={{
          marginTop: 40,
          marginBottom: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: chatSpring,
          transform: `scale(${interpolate(chatSpring, [0, 1], [0.92, 1])})`,
        }}
      >
        {/* Device Container */}
        <div
          style={{
            width: '100%',
            maxWidth: 820,
            backgroundColor: '#0F172A',
            border: `2px solid ${T.borderDanger}`,
            borderRadius: 24,
            boxShadow: `0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px ${T.dangerGlow}`,
            overflow: 'hidden',
          }}
        >
          {/* Fake SMS Header Bar */}
          <div
            style={{
              padding: '20px 28px',
              backgroundColor: '#1E293B',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  backgroundColor: T.danger,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: 22,
                }}
              >
                !
              </div>
              <div>
                <div
                  style={{
                    fontFamily: T.fontMono,
                    fontSize: 26,
                    fontWeight: 900,
                    color: T.textLight,
                  }}
                >
                  {fakeSender}
                </div>
                <div
                  style={{
                    fontFamily: T.fontMono,
                    fontSize: 18,
                    color: T.danger,
                    fontWeight: 700,
                  }}
                >
                  [BRANDNAME BỊ GIẢ MẠO]
                </div>
              </div>
            </div>
            <span
              style={{
                fontFamily: T.fontMono,
                fontSize: 18,
                color: T.textMuted,
              }}
            >
              Hôm nay 09:42
            </span>
          </div>

          {/* Fake Message Body */}
          <div style={{ padding: '36px 32px' }}>
            <p
              style={{
                fontFamily: T.fontBody,
                fontSize: 32,
                fontWeight: 600,
                color: '#F1F5F9',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {fakeMessage}
            </p>

            {/* Phishing URL Box */}
            <div
              style={{
                marginTop: 26,
                padding: '18px 24px',
                backgroundColor: 'rgba(255, 46, 85, 0.12)',
                border: `2px dashed ${T.danger}`,
                borderRadius: 12,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: T.fontMono,
                  fontSize: 20,
                  fontWeight: 800,
                  color: T.danger,
                  letterSpacing: 1,
                }}
              >
                ⚠️ ĐƯỜNG LINK CHỨA MÃ ĐỘC PHISHING:
              </span>
              <span
                style={{
                  fontFamily: T.fontMono,
                  fontSize: 28,
                  fontWeight: 900,
                  color: '#FF6B8B',
                  textDecoration: 'underline',
                  wordBreak: 'break-all',
                }}
              >
                {fakeLink}
              </span>
            </div>
          </div>
        </div>

        {/* Red Flag Callout Tag */}
        <div
          style={{
            marginTop: 35,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            backgroundColor: 'rgba(245, 158, 11, 0.15)',
            border: `2px solid ${T.amber}`,
            borderRadius: 16,
            padding: '16px 28px',
            opacity: tagSpring,
            transform: `scale(${interpolate(tagSpring, [0, 1], [0.9, 1])})`,
          }}
        >
          <span style={{ fontSize: 32 }}>🛑</span>
          <span
            style={{
              fontFamily: T.fontBody,
              fontSize: 28,
              fontWeight: 800,
              color: T.amber,
              lineHeight: 1.35,
            }}
          >
            {scene.footnote || 'Ngân hàng KHÔNG BAO GIỜ gửi đường link yêu cầu đăng nhập qua tin nhắn!'}
          </span>
        </div>
      </div>
    </CyberHUDCanvas>
  );
};

// ==========================================
// SCENE 3: ANATOMY / SCAM PIPELINE (CÁC BƯỚC)
// ==========================================

export const CyberAnatomyScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  const steps = scene.steps || [
    {
      stepNumber: 1,
      title: 'TIẾP CẬN & GIẢ MẠO',
      desc: 'Gọi điện mạo danh Cơ quan Công an, Viện kiểm sát hoặc CSKH Ngân hàng.',
      icon: '📞',
    },
    {
      stepNumber: 2,
      title: 'THAO TÚNG TÂM LÝ',
      desc: 'Đe dọa dính líu rửa tiền, lệnh bắt giam khẩn cấp, ép giữ bí mật tuyệt đối.',
      icon: '⚡',
    },
    {
      stepNumber: 3,
      title: 'DẪN DỤ CÀI APP ĐỘC HẠI',
      desc: 'Gửi link tải file .apk mạo danh Bộ Công an nhằm chiếm quyền điện thoại.',
      icon: '📲',
    },
    {
      stepNumber: 4,
      title: 'VÉT SẠCH TÀI KHOẢN',
      desc: 'Tự động đọc mã OTP và thực hiện chuyển toàn bộ tiền sang tài khoản rác.',
      icon: '💸',
    },
  ];

  return (
    <CyberHUDCanvas kicker={scene.kicker} threatLevel="BÓC TÁCH THỦ ĐOẠN">
      {/* Title */}
      <div
        style={{
          marginTop: 35,
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.9, 1])})`,
          opacity: titleSpring,
        }}
      >
        <h2
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 62,
            fontWeight: 900,
            color: T.textLight,
            margin: 0,
          }}
        >
          {scene.title}
        </h2>
      </div>

      {/* Cyber Pipeline Steps */}
      <div
        style={{
          marginTop: 40,
          marginBottom: 25,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          position: 'relative',
        }}
      >
        {/* Vertical Glowing Connector Line */}
        <div
          style={{
            position: 'absolute',
            left: 54,
            top: 40,
            bottom: 40,
            width: 3,
            backgroundColor: T.borderColor,
            boxShadow: `0 0 10px ${T.cyanGlow}`,
          }}
        />

        {steps.map((st, idx) => {
          const stepSpring = spring({
            frame: frame - (10 + idx * 8),
            fps,
            config: { damping: 14, stiffness: 90 },
          });

          const isLast = idx === steps.length - 1;
          const nodeColor = isLast ? T.danger : idx === 2 ? T.amber : T.cyan;

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 28,
                opacity: stepSpring,
                transform: `translateX(${interpolate(stepSpring, [0, 1], [-30, 0])}px)`,
                zIndex: 2,
              }}
            >
              {/* Step Number Circle */}
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: '50%',
                  backgroundColor: '#0F172A',
                  border: `3px solid ${nodeColor}`,
                  boxShadow: `0 0 15px ${nodeColor}88`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: T.fontMono,
                  fontSize: 24,
                  fontWeight: 900,
                  color: nodeColor,
                  flexShrink: 0,
                }}
              >
                0{st.stepNumber}
              </div>

              {/* Step Card */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: T.bgCard,
                  border: `1.5px solid ${nodeColor}55`,
                  borderRadius: 16,
                  padding: '20px 26px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: T.fontMono,
                      fontSize: 28,
                      fontWeight: 900,
                      color: nodeColor,
                      letterSpacing: 1,
                    }}
                  >
                    {st.title}
                  </span>
                  <span style={{ fontSize: 28 }}>{st.icon || '⚠️'}</span>
                </div>
                <div
                  style={{
                    fontFamily: T.fontBody,
                    fontSize: 26,
                    fontWeight: 600,
                    color: T.textMuted,
                    lineHeight: 1.4,
                  }}
                >
                  {st.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </CyberHUDCanvas>
  );
};

// ==========================================
// SCENE 4: RED FLAGS / 3 DẤU HIỆU LẬP TỨC
// ==========================================

export const CyberRedFlagsScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  const redFlags = scene.items || [
    'Yêu cầu chuyển tiền vào "Tài khoản bảo chứng" của Điều tra viên',
    'Gửi link lạ, file đuôi .APK cài đặt ngoài cửa hàng CH Play/App Store',
    'Thúc ép thời gian gấp, đe dọa khởi tố và cấm kể cho người thân',
  ];

  return (
    <CyberHUDCanvas kicker={scene.kicker} threatLevel="DẤU HIỆU ĐỎ">
      <div
        style={{
          marginTop: 35,
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.9, 1])})`,
          opacity: titleSpring,
        }}
      >
        <h2
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 62,
            fontWeight: 900,
            color: T.textLight,
            margin: 0,
          }}
        >
          {scene.title}
        </h2>
      </div>

      <div
        style={{
          marginTop: 40,
          marginBottom: 35,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {redFlags.map((flagText, idx) => {
          const itemSpring = spring({
            frame: frame - (10 + idx * 10),
            fps,
            config: { damping: 14, stiffness: 90 },
          });

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 24,
                backgroundColor: 'rgba(255, 46, 85, 0.08)',
                border: `2px solid ${T.danger}`,
                borderRadius: 20,
                padding: '28px 32px',
                boxShadow: `0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px ${T.dangerGlow}`,
                opacity: itemSpring,
                transform: `scale(${interpolate(itemSpring, [0, 1], [0.92, 1])})`,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  backgroundColor: T.danger,
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 32,
                  fontWeight: 900,
                  flexShrink: 0,
                }}
              >
                ✕
              </div>
              <div
                style={{
                  fontFamily: T.fontBody,
                  fontSize: 32,
                  fontWeight: 800,
                  color: '#FFF',
                  lineHeight: 1.45,
                }}
              >
                {flagText}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <p
          style={{
            fontFamily: T.fontMono,
            fontSize: 26,
            fontWeight: 800,
            color: T.danger,
            letterSpacing: 1,
            margin: 0,
          }}
        >
          CHỈ CẦN XUẤT HIỆN 1 DẤU HIỆU: CÚP MÁY NGAY LẬP TỨC!
        </p>
      </div>
    </CyberHUDCanvas>
  );
};

// ==========================================
// SCENE 5: COMPARE / REAL VS FAKE DOMAIN
// ==========================================

export const CyberCompareScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  const cardsSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const realDomain = scene.realDomain || 'dichvucong.gov.vn';
  const fakeDomain = scene.fakeDomain || 'dichvucong-gov-vn.xyz';

  return (
    <CyberHUDCanvas kicker={scene.kicker} threatLevel="PHÂN BIỆT THẬT - GIẢ">
      <div
        style={{
          marginTop: 35,
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.9, 1])})`,
          opacity: titleSpring,
        }}
      >
        <h2
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 62,
            fontWeight: 900,
            color: T.textLight,
            margin: 0,
          }}
        >
          {scene.title}
        </h2>
      </div>

      <div
        style={{
          marginTop: 45,
          marginBottom: 25,
          display: 'flex',
          flexDirection: 'column',
          gap: 36,
          opacity: cardsSpring,
        }}
      >
        {/* 1. Real Domain Card (Green) */}
        <div
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: `2.5px solid ${T.emerald}`,
            borderRadius: 20,
            padding: '30px 36px',
            boxShadow: `0 12px 35px rgba(0,0,0,0.4), 0 0 25px ${T.emeraldGlow}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <span style={{ fontSize: 32 }}>✅</span>
            <span
              style={{
                fontFamily: T.fontMono,
                fontSize: 26,
                fontWeight: 900,
                color: T.emerald,
                letterSpacing: 1.5,
              }}
            >
              CỔNG CHÍNH THỨC CỦA CHÍNH PHỦ
            </span>
          </div>
          <div
            style={{
              fontFamily: T.fontMono,
              fontSize: 36,
              fontWeight: 900,
              color: '#FFFFFF',
              backgroundColor: '#064E3B',
              padding: '14px 22px',
              borderRadius: 12,
              wordBreak: 'break-all',
            }}
          >
            https://{realDomain}
          </div>
          <div
            style={{
              fontFamily: T.fontBody,
              fontSize: 24,
              color: '#A7F3D0',
              marginTop: 14,
              fontWeight: 600,
            }}
          >
            Đuôi tên miền luôn là <b>.gov.vn</b> · Có chứng chỉ bảo mật SSL chính chủ
          </div>
        </div>

        {/* 2. Fake Domain Card (Red) */}
        <div
          style={{
            backgroundColor: 'rgba(255, 46, 85, 0.1)',
            border: `2.5px solid ${T.danger}`,
            borderRadius: 20,
            padding: '30px 36px',
            boxShadow: `0 12px 35px rgba(0,0,0,0.4), 0 0 25px ${T.dangerGlow}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <span style={{ fontSize: 32 }}>❌</span>
            <span
              style={{
                fontFamily: T.fontMono,
                fontSize: 26,
                fontWeight: 900,
                color: T.danger,
                letterSpacing: 1.5,
              }}
            >
              BẪY TÊN MIỀN LỪA ĐẢO MẠO DANH
            </span>
          </div>
          <div
            style={{
              fontFamily: T.fontMono,
              fontSize: 36,
              fontWeight: 900,
              color: '#FFFFFF',
              backgroundColor: '#7F1D1D',
              padding: '14px 22px',
              borderRadius: 12,
              wordBreak: 'break-all',
            }}
          >
            http://{fakeDomain}
          </div>
          <div
            style={{
              fontFamily: T.fontBody,
              fontSize: 24,
              color: '#FECDD3',
              marginTop: 14,
              fontWeight: 600,
            }}
          >
            Dùng dấu gạch nối lắt léo, đuôi tên miền quốc tế giá rẻ như <b>.xyz, .top, .vip</b>
          </div>
        </div>
      </div>
    </CyberHUDCanvas>
  );
};

// ==========================================
// SCENE 6: LOSS STATISTIC / CON SỐ THIỆT HẠI
// ==========================================

export const CyberLossStatScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  const numSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  const statNum = scene.statistic || '16.000 TỶ';
  const statLabel = scene.statisticLabel || 'VNĐ BỊ CHIẾM ĐOẠT MỖI NĂM';
  const statDesc = scene.statisticDesc || 'Hơn 85% người dùng từng nhận ít nhất một cuộc gọi hoặc tin nhắn lừa đảo';

  return (
    <CyberHUDCanvas kicker={scene.kicker} threatLevel="THỐNG KÊ QUY MÔ">
      <div
        style={{
          marginTop: 35,
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.9, 1])})`,
          opacity: titleSpring,
        }}
      >
        <h2
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 62,
            fontWeight: 900,
            color: T.textLight,
            margin: 0,
          }}
        >
          {scene.title}
        </h2>
      </div>

      <div
        style={{
          marginTop: 60,
          marginBottom: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: numSpring,
          transform: `scale(${interpolate(numSpring, [0, 1], [0.85, 1])})`,
        }}
      >
        {/* Giant Glowing Red Number */}
        <div
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 110,
            fontWeight: 900,
            color: T.danger,
            textShadow: `0 0 50px ${T.dangerGlow}`,
            lineHeight: 1,
            letterSpacing: 2,
          }}
        >
          {statNum}
        </div>

        <div
          style={{
            marginTop: 24,
            fontFamily: T.fontMono,
            fontSize: 34,
            fontWeight: 900,
            color: T.amber,
            letterSpacing: 2,
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          {statLabel}
        </div>

        {/* Source & Description Card */}
        <div
          style={{
            marginTop: 60,
            backgroundColor: T.bgCard,
            border: `1.5px solid ${T.borderColor}`,
            borderRadius: 18,
            padding: '28px 40px',
            textAlign: 'center',
            maxWidth: 760,
          }}
        >
          <p
            style={{
              fontFamily: T.fontBody,
              fontSize: 28,
              fontWeight: 600,
              color: T.textLight,
              lineHeight: 1.45,
              margin: 0,
            }}
          >
            {statDesc}
          </p>
          <div
            style={{
              marginTop: 16,
              fontFamily: T.fontMono,
              fontSize: 20,
              fontWeight: 800,
              color: T.cyan,
              letterSpacing: 1,
            }}
          >
            [NGUỒN: CỤC AN TOÀN THÔNG TIN · BỘ TT&TT]
          </div>
        </div>
      </div>
    </CyberHUDCanvas>
  );
};

// ==========================================
// SCENE 7: SHIELD DEFENSE / QUY TẮC 3 KHÔNG
// ==========================================

export const CyberShieldDefenseScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  const rules = scene.defenseRules || [
    {
      title: 'KHÔNG CHUYỂN TIỀN THEO LỜI DỌA NẠT',
      desc: 'Công an không làm việc qua điện thoại. Mọi giấy tờ đều phải có giấy mời trực tiếp.',
      icon: '🛡️',
    },
    {
      title: 'KHÔNG CÀI APP NGOÀI STORE CHÍNH THỨC',
      desc: 'Tuyệt đối không tải file .apk hoặc link lạ gửi qua Zalo, Telegram, Facebook.',
      icon: '🔒',
    },
    {
      title: 'KHÔNG CUNG CẤP OTP / MẬT KHẨU',
      desc: 'Ngân hàng và nhà mạng không bao giờ yêu cầu khách hàng đọc mã xác thực OTP.',
      icon: '🚫',
    },
  ];

  return (
    <CyberHUDCanvas kicker={scene.kicker} threatLevel="LÁ CHẮN BẢO VỆ">
      <div
        style={{
          marginTop: 35,
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.9, 1])})`,
          opacity: titleSpring,
        }}
      >
        <h2
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 62,
            fontWeight: 900,
            color: T.textLight,
            margin: 0,
          }}
        >
          {scene.title}
        </h2>
      </div>

      <div
        style={{
          marginTop: 40,
          marginBottom: 25,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {rules.map((rule, idx) => {
          const ruleSpring = spring({
            frame: frame - (10 + idx * 10),
            fps,
            config: { damping: 14, stiffness: 90 },
          });

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 24,
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                border: `2px solid ${T.emerald}`,
                borderRadius: 20,
                padding: '24px 30px',
                boxShadow: `0 10px 30px rgba(0,0,0,0.4), 0 0 20px ${T.emeraldGlow}`,
                opacity: ruleSpring,
                transform: `translateX(${interpolate(ruleSpring, [0, 1], [-25, 0])}px)`,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  backgroundColor: T.emerald,
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 30,
                  flexShrink: 0,
                }}
              >
                {rule.icon || '🛡️'}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: T.fontMono,
                    fontSize: 28,
                    fontWeight: 900,
                    color: T.emerald,
                    letterSpacing: 0.5,
                    marginBottom: 6,
                  }}
                >
                  {rule.title}
                </div>
                <div
                  style={{
                    fontFamily: T.fontBody,
                    fontSize: 26,
                    fontWeight: 600,
                    color: T.textLight,
                    lineHeight: 1.4,
                  }}
                >
                  {rule.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </CyberHUDCanvas>
  );
};

// ==========================================
// SCENE 8: HOTLINE / CALL TO ACTION (ENDING)
// ==========================================

export const CyberHotlineScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  const cardSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  return (
    <CyberHUDCanvas kicker={scene.kicker} threatLevel="TỐ GIÁC TỘI PHẠM">
      <div
        style={{
          marginTop: 40,
          textAlign: 'center',
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.9, 1])})`,
          opacity: titleSpring,
        }}
      >
        <h2
          style={{
            fontFamily: T.fontDisplay,
            fontSize: 66,
            fontWeight: 900,
            color: T.textLight,
            margin: 0,
          }}
        >
          {scene.title || 'BỊ LỪA ĐẢO? HÃY XỬ LÝ NGAY'}
        </h2>
      </div>

      <div
        style={{
          marginTop: 45,
          marginBottom: 25,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
          opacity: cardSpring,
        }}
      >
        {/* Hotlines */}
        <div
          style={{
            width: '100%',
            backgroundColor: T.bgCard,
            border: `2px solid ${T.borderColor}`,
            borderRadius: 24,
            padding: '36px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: T.fontBody, fontSize: 26, fontWeight: 700, color: T.textMuted }}>
                TỔNG ĐÀI TIẾP NHẬN PHẢN ÁNH CUỘC GỌI RÁC & LỪA ĐẢO
              </div>
              <div style={{ fontFamily: T.fontMono, fontSize: 44, fontWeight: 900, color: T.cyan, marginTop: 4 }}>
                156 (MIỄN CƯỚC)
              </div>
            </div>
            <span style={{ fontSize: 40 }}>📞</span>
          </div>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.1)' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: T.fontBody, fontSize: 26, fontWeight: 700, color: T.textMuted }}>
                TRANG BÁO CÁO TRỰC TUYẾN CHÍNH THỨC
              </div>
              <div style={{ fontFamily: T.fontMono, fontSize: 34, fontWeight: 900, color: T.emerald, marginTop: 4 }}>
                canhbao.khonggianmang.vn
              </div>
            </div>
            <span style={{ fontSize: 40 }}>🌐</span>
          </div>
        </div>

        {/* CTA Button */}
        <div
          style={{
            width: '100%',
            backgroundColor: T.danger,
            borderRadius: 20,
            padding: '24px 32px',
            textAlign: 'center',
            boxShadow: `0 0 35px ${T.dangerGlow}`,
          }}
        >
          <span
            style={{
              fontFamily: T.fontDisplay,
              fontSize: 34,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            {scene.ctaText || 'CHIA SẺ NGAY ĐỂ BẢO VỆ NGƯỜI THÂN!'}
          </span>
        </div>
      </div>
    </CyberHUDCanvas>
  );
};

// ==========================================
// MASTER SCENE ROUTER FOR CYBER TEMPLATE
// ==========================================

export const CyberScene: React.FC<{
  scene: Scene;
  index: number;
  total: number;
}> = ({ scene, index, total }) => {
  switch (scene.type) {
    case 'cyber-hook':
    case 'cover':
      return <CyberHookScene scene={scene} />;

    case 'cyber-fake-chat':
      return <CyberFakeChatScene scene={scene} />;

    case 'cyber-anatomy':
    case 'timeline':
      return <CyberAnatomyScene scene={scene} />;

    case 'cyber-red-flags':
      return <CyberRedFlagsScene scene={scene} />;

    case 'cyber-compare':
    case 'comparison':
      return <CyberCompareScene scene={scene} />;

    case 'cyber-loss-stat':
    case 'statistic':
      return <CyberLossStatScene scene={scene} />;

    case 'cyber-shield-defense':
    case 'photo-story':
    case 'photo-stack':
      return <CyberShieldDefenseScene scene={scene} />;

    case 'cyber-hotline':
    case 'ending':
    default:
      return <CyberHotlineScene scene={scene} />;
  }
};
