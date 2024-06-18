import type { Event, EventMeta } from '$lib/types/eventData.types';

import { prologue } from '$lib/events/prologue';

/**
 * Event data sits on the server and does not change after server start.
 * A timestamp is used to invalidate old game sessions. (not implemented)
 *
 */
class EventData {
  eventList : Event[];
  eventIndex : { [index: string]: number; };
  eventMeta : EventMeta[];
  initTimeline : (EventMeta | null)[];
  timestamp : Date;

  constructor(data : Event[]) {
      this.eventList = data;
      this.eventIndex = data.reduce((obj, event, i) => {return{ ...obj, [event.meta.slug]: i }}, {});
      this.eventMeta = data.map((event) => event.meta);
      this.timestamp = new Date();
      this.initTimeline = [ prologue.meta ]
  }
}

export const eventLibrary = new EventData([prologue]);