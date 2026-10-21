/**
 * Editorial palette learned from the supplied current-affairs reference.
 * Colors are visual estimates from compressed video frames, not sampled source tokens.
 */
export const CYBER_THEME = {
  paper: '#F3F0E6',
  paperLight: '#FBF9F2',
  paperShade: '#EAE5D8',
  ink: '#252321',
  inkSoft: '#625E58',
  inkFaint: '#8B857B',
  rule: '#D8D1C4',
  brick: '#AC3031',
  brickDark: '#842426',
  brickPale: '#F3E5DF',
  safety: '#526B55',
  safetyPale: '#E7ECE4',
  amber: '#B77E28',
  white: '#FFFFFF',
  shadow: 'rgba(37, 35, 33, 0.12)',

  // The reference uses a bold, clean grotesk. The stack intentionally falls
  // back to fonts present on a typical Windows Remotion workstation.
  fontDisplay: "'Arial', 'Inter', system-ui, sans-serif",
  fontBody: "'Arial', 'Inter', system-ui, sans-serif",
  fontMono: "'Consolas', 'Courier New', monospace",

  safe: {
    left: 72,
    right: 72,
    top: 112,
    bottom: 330,
  },
} as const;
