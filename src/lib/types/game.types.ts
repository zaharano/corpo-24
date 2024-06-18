export interface Job {
  title: string;
  department: string;
  performance: number;
  level: number;
  years: number;
  MAXLEVEL: number;
  MAXYEARS: number;
  enemies: string[];
}

export interface VFX {
  typeSpeed?: number;
  tracker?: boolean;
  enhancedTracker?: boolean;
  flicker?: boolean;
  corruption?: boolean;
  ghost?: boolean;
}