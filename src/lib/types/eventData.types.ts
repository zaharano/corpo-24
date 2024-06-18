import type { VFX } from './game.types';

export interface EventData {
  eventList: Event[];
  eventIndex: {
    [index: string]: number;
  };
}
export type EventTimeline = (EventMeta | null)[];
export type EventPool = EventMeta[];
export type FlagSet = {[index: string]: boolean};

// An event is a decision tree of screens, with metadata. 
// The first screen of any Event is called start.
export interface Event {
  meta: EventMeta;
  screens: {
    start: Screen;
    [index: string]: Screen;
  },
  // Effects to run when this Event starts or ends
  effects?: {
    onStart?: Effects;
    onEnd?: Effects;
  }
}

export interface EventMeta {
  slug: string;
  title: string;
  repeatable: boolean; // Can this event reoccur in single playthru?
  random: boolean; // Can this event be triggered randomly?
  priority?: number; // importance 0-1. unused for now
  rarity?: number; // rarity 0-1. unused for now
  requires?: Requirements;
}

// A Screen is a single decision point in an event.
// It has a title, text, and one or more options.
export interface Screen {
  title: string;
  text: string;
  options: Option[];
}

// Events and Options can have requirements
export interface Requirements {
  // Does the game implement any requirements?
  gameReqs?: GameRequirements;
  // Flags that must be set true or false
  flags?: FlagSet;
}

// Megacorp-specific requirements
export interface GameRequirements {
  // Level requirements - either an integer 
  // or a decimal 0-1 which multiplied by the overall max level will get requirement
  maxLevel?: number;
  minLevel?: number;
}

export interface Option {
  text: string;
  next: string;
  // endEvent: boolean;
  // endGame: boolean;
  effects?: Effects;
  requires?: Requirements;
}

// Changes to flags and event scheduling or availability
export interface Effects {
  editFlags?: FlagSet;
  editEvents?: EventChanges;
  gameEffects?: GameEffects;
}

// Megacorp-specific effects
export interface GameEffects {
  job?: {
    performanceChange?: number;
    timePassed?: number;
    promotion?: boolean | string;
    demotion?: boolean | string;
    newDepartment?: string;
    newEnemy?: string;
  };
  editVFX?: VFX;
}

export interface EventChanges {
  schedule?: {
    add?: {
      event: string;
      time: number;
    }[];
    remove?: string[];
  };
  lock?: string[];
  unlock?: string[];
}