import type React from 'react';
import { CaptionOverlay, type CaptionTheme } from '../core/CaptionOverlay';
import type { Scene, TemplateId } from '../core/types';
import { CyberScene } from './cyber-security-alert/Scene';
import { CYBER_THEME } from './cyber-security-alert/theme';
import { IllustratedScene } from './illustrated-paper-textured/Scene';
import { ILLUSTRATED_THEME } from './illustrated-paper-textured/theme';
import { EditorialScene } from './vintage-editorial/Scene';
import { THEME } from './vintage-editorial/theme';

export type SceneRendererProps = {
  scene: Scene;
  index: number;
  total: number;
};

export type TemplateDefinition = {
  name: string;
  backgroundColor: string;
  Scene: React.ComponentType<SceneRendererProps>;
  Caption: typeof CaptionOverlay;
  captionTheme: CaptionTheme;
};

export const TEMPLATE_REGISTRY: Record<TemplateId, TemplateDefinition> = {
  'vintage-editorial': {
    name: 'Vintage Editorial',
    backgroundColor: THEME.paper,
    Scene: EditorialScene,
    Caption: CaptionOverlay,
    captionTheme: {
      fontFamily: THEME.fontBody,
      color: THEME.ink,
      activeColor: THEME.brick,
      fontWeight: 700,
      horizontalPadding: 75,
      bottomPadding: 115,
      maxWidth: 930,
      lineHeight: 1.4,
      zIndex: 50,
      textShadow: '0 1px 3px rgba(255, 255, 255, 0.9)',
    },
  },
  'illustrated-paper-textured': {
    name: 'Illustrated Paper Textured',
    backgroundColor: ILLUSTRATED_THEME.paper,
    Scene: IllustratedScene,
    Caption: CaptionOverlay,
    captionTheme: {
      fontFamily: ILLUSTRATED_THEME.fontBody,
      color: ILLUSTRATED_THEME.inkSecondary,
      activeColor: ILLUSTRATED_THEME.blue,
      fontWeight: 800,
      horizontalPadding: 80,
      bottomPadding: 140,
      maxWidth: 920,
      lineHeight: 1.45,
      zIndex: 60,
      textShadow: '0 1px 2px rgba(255, 255, 255, 0.95)',
    },
  },
  'cyber-security-alert': {
    name: 'Cyber Security Alert',
    backgroundColor: CYBER_THEME.paper,
    Scene: CyberScene,
    Caption: CaptionOverlay,
    captionTheme: {
      fontFamily: CYBER_THEME.fontBody,
      color: CYBER_THEME.ink,
      activeColor: CYBER_THEME.paperLight,
      fontWeight: 700,
      activeWordBackground: CYBER_THEME.brick,
      activeWordIndicatorColor: CYBER_THEME.amber,
      activeWordIndicatorHeight: 3,
      wordHorizontalPadding: 3,
      wordVerticalPadding: 2,
      wordBorderRadius: 7,
      activeWordBoxShadow: '0 2px 8px rgba(132, 36, 38, 0.2)',
      horizontalPadding: 92,
      bottomPadding: 330,
      maxWidth: 890,
      lineHeight: 1.32,
      zIndex: 60,
      textShadow: '0 1px 0 rgba(243, 240, 230, 0.95), 0 0 8px rgba(243, 240, 230, 0.9)',
      activeTextShadow: '0 1px 0 rgba(243, 240, 230, 0.95)',
    },
  },
};
