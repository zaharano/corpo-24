import { json } from '@sveltejs/kit';
import { eventLibrary } from '$lib/engine/eventClasses.server'

export function GET({ url }) {
  const e = url.searchParams.get('e')
  if (!e) return json(eventLibrary.eventMeta)
  const eventData = eventLibrary.eventList.find((event) => event.meta.slug === e)
  if (!eventData) return json({error: 'Event not found'}, {status: 404})

  return json(eventData)
}