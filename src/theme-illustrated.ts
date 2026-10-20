export const ILLUSTRATED_THEME = {
  paper: '#FAF8F5',
  paperTexture: 'assets/illustrated/paper-background.jpg',
  drawingHand: 'assets/illustrated/drawing-hand.png',
  
  // Marker & ink colors sampled directly from references/vetay-reference.mp4
  ink: '#1E232A',
  inkSecondary: '#334155',
  slate: '#64748B',
  subtle: '#94A3B8',
  white: '#FFFFFF',

  // Accent markers
  blue: '#3B82F6',        // Active karaoke, primary numbers, positive choice
  blueDeep: '#2563EB',
  blueSoft: '#EFF6FF',

  crimson: '#BA3D4D',     // Dilemma questions, expense bars, punchline verdict
  crimsonDeep: '#991B1B',
  crimsonSoft: '#FEF2F2',

  amber: '#D49A36',       // Secondary progress, ochre balance path
  amberDeep: '#B45309',
  amberSoft: '#FFFBEB',

  // Outlines & borders
  borderDark: '#1E232A',
  strokeWidth: 3.5,
  cardBorder: 'rgba(30, 35, 42, 0.12)',

  // Postcard / Polaroid styling
  postcardBg: '#FFFFFF',
  postcardShadow: '0 16px 36px rgba(0, 0, 0, 0.12), 0 3px 10px rgba(0, 0, 0, 0.05)',
  tapeBg: 'rgba(245, 240, 225, 0.85)',

  // Typography hierarchy
  fontDisplay: "'Nunito', 'Baloo 2', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  fontBody: "'Plus Jakarta Sans', 'Nunito', system-ui, -apple-system, sans-serif",
} as const;
