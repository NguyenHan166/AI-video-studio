export type CaptionCue = {
  startMs: number;
  endMs: number;
  text: string;
};

export type SceneKind =
  | 'cover'
  | 'photo-story'
  | 'photo-stack'
  | 'timeline'
  | 'comparison'
  | 'statistic'
  | 'ending'
  // Dedicated illustrated-paper scene kinds:
  | 'illustrated-hook'
  | 'illustrated-progress'
  | 'illustrated-compare'
  | 'illustrated-features'
  | 'illustrated-arrow-flow'
  | 'illustrated-bar-chart'
  | 'illustrated-decision-fork'
  | 'illustrated-verdict'
  // Dedicated cybersecurity & scam alert scene kinds:
  | 'cyber-hook'
  | 'cyber-fake-chat'
  | 'cyber-anatomy'
  | 'cyber-red-flags'
  | 'cyber-compare'
  | 'cyber-loss-stat'
  | 'cyber-shield-defense'
  | 'cyber-hotline';

export type TimelineItem = {
  title: string;
  subtitle?: string;
  time?: string;
};

export type ComparisonItem = {
  label: string;
  text: string;
};

export type ProgressItem = {
  label: string;
  percent: number;
  color?: string;
  note?: string;
};

export type BarChartItem = {
  label: string;
  heightPercent: number;
  color?: string;
  caption?: string;
};

export type DecisionForkItem = {
  title: string;
  description: string;
  color?: string;
};

export type CalloutBadge = {
  text: string;
  color?: string;
};

export type CyberStep = {
  stepNumber: number;
  title: string;
  desc: string;
  icon?: string;
};

export type CyberRule = {
  title: string;
  desc: string;
  icon?: string;
};

export type Scene = {
  id: string;
  type: SceneKind;
  title: string;
  subtitle?: string;
  startFrame: number;
  durationFrames: number;
  images?: string[];
  items?: string[];
  statistic?: string;
  statisticLabel?: string;
  statisticDesc?: string;
  statisticUnit?: string;
  kicker?: string;
  locationTag?: string;
  stamp?: string;
  tags?: string[];
  titleAccent?: string;
  quote?: string;
  timelineItems?: TimelineItem[];
  comparisonItems?: ComparisonItem[];
  ctaText?: string;
  hashtags?: string[];
  sourceLabel?: string;

  // Illustrated-paper-textured specific fields:
  progressItems?: ProgressItem[];
  chartItems?: BarChartItem[];
  forkItems?: DecisionForkItem[];
  callouts?: (string | CalloutBadge)[];
  verdictText?: string;
  ruleText?: string;
  footnote?: string;
  arrowText?: string;
  handDrawn?: boolean;

  // Cyber-security-alert specific fields:
  threatLevel?: 'CRITICAL' | 'HIGH' | 'WARNING' | 'ALERT';
  caseCode?: string;
  fakeSender?: string;
  fakeMessage?: string;
  fakeLink?: string;
  realDomain?: string;
  fakeDomain?: string;
  steps?: CyberStep[];
  defenseRules?: CyberRule[];
  hotline?: string;
};

export type VideoProject = {
  version: 1;
  slug: string;
  topic: string;
  template: 'vintage-editorial' | 'illustrated-paper-textured' | 'cyber-security-alert';
  fps: 30;
  width: 1080;
  height: 1920;
  durationInFrames: number;
  audioPath: string | null;
  captions: CaptionCue[];
  scenes: Scene[];
};
