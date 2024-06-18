import type { PageServerLoad, Actions } from './megacorp/$types';
import { eventLibrary } from '$lib/engine/eventClasses.server';

export const load = (() => {
  return {
    events: eventLibrary.eventMeta,
    timeline: eventLibrary.initTimeline,
    // fix this
    initEvent: eventLibrary.eventList.filter((event) => event.meta.slug === 'prologue')[0]
  }
}) satisfies PageServerLoad;

export const actions = {}
  // newEvent: async ({ request, cookies }) => {
  //   const data = await request.formData();
  //   const key = data.get('key');

  //   return 