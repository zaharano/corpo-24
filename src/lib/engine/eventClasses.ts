import getRandom from '$lib/help/utils';

// temporary import
import { eventSettings } from '../settings/settings';

import type { EventMeta, Requirements } from '$lib/types/eventData.types';

const MTL = eventSettings.maxTimelineLength;

export class EventTimeline {
  timeline: (EventMeta | null)[];
  INIT: (EventMeta | null)[];

  constructor(INIT: (EventMeta | null)[] = []) {
    this.timeline = Array(MTL).fill(null);
    this.INIT = INIT;
    if (INIT.length > MTL) {
      console.error(`Initial timeline length exceeds max length of ${MTL}`);
    }
    if (INIT.length > 0) {
      INIT.forEach((event, i) => {
        this.timeline[i] = event;
      })
    }
  }

  /**
   * Schedule an event to a spot on the timeline. If the spot is taken, event will be scheduled at the next available spot.
   *
   * @param event - the EventMeta object to schedule
   * @param turns - the number of turns in the future to schedule the event at
   * @returns void
   */
  add(event : EventMeta, turns: number) {
    let timeThatWorks = this.letsFindATimeThatWorks(turns);
    this.timeline = this.timeline.toSpliced(timeThatWorks, 1, event);
  }

  /**
   * Advance the timeline by one turn, returning the event that was scheduled (or null if none was scheduled)
   *
   * @returns an event key or null
   */
  advance() {
    let nextEvent = this.timeline[0];
    this.timeline = this.timeline.slice(1);
    return nextEvent;
  }

  letsFindATimeThatWorks(turn: number): number {
    if (this.timeline[turn] !== null) {
      return this.letsFindATimeThatWorks(turn + 1);
    } else {
      return turn;
    }
  }

  init() { this.timeline = this.INIT }
}

export class EventPool {
  pool : EventMeta[];
  INIT : EventMeta[];

  constructor(INIT : EventMeta[] = []) {
    this.pool = INIT;
    this.INIT = INIT;
  }

  add(event : EventMeta) {
    this.pool = this.pool.concat([event]);
  }

  remove(event : EventMeta) {
    this.pool = this.pool.filter((e) => e !== event);
  }

  getQualifiedRandomEvent(checkRequirements : (requires: Requirements) => boolean | null) {
    let qualifiedEvents = this.pool.filter((event) => {
      if (!event.random) return false;
      if (!event.requires) return true;
      return checkRequirements(event.requires);
    });
    if (qualifiedEvents.length === 0) {
      return null;
    }
    return getRandom(qualifiedEvents);
  }

  init() { this.pool = this.INIT }
}