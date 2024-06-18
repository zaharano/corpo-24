import { scheduledEvents } from '../stores/engineStores';

import { get } from 'svelte/store';

import { expect, test } from 'vitest';

let TEST_GIVEN = [
  { event: '1 Turn', turns: 1 },
  { event: '3 Turns', turns: 3 },
  { event: '5 Turns', turns: 5 },
];

test('Add non-conflicting event to schedule', () => {
  scheduledEvents.set(TEST_GIVEN);
  scheduledEvents.add('2 Turns', 2);
  expect(get(scheduledEvents)).toStrictEqual(
    TEST_GIVEN.concat([{ event: '2 Turns', turns: 2 }])
  );
});

test('Add conflicting event to schedule', () => {
  scheduledEvents.set(TEST_GIVEN);
  scheduledEvents.add('Conflicting 3 Turns', 3);
  expect(get(scheduledEvents)).toStrictEqual(
    TEST_GIVEN.concat([{ event: 'Conflicting 3 Turns', turns: 4 }])
  );
});

test('Add two conflicting events to schedule', () => {
  scheduledEvents.set(TEST_GIVEN);
  scheduledEvents.add('Conflicting 3 Turns', 3);
  scheduledEvents.add('Conflicting 3 Turns 2', 3);
  expect(get(scheduledEvents)).toStrictEqual(
    TEST_GIVEN.concat([
      { event: 'Conflicting 3 Turns', turns: 4 },
      { event: 'Conflicting 3 Turns 2', turns: 6 },
    ])
  );
});

test('Advance returns a 1 turn scheduled event', () => {
  scheduledEvents.set([]);
});

test('Advance 3 times to return a 3 turn scheduled event', () => {
  scheduledEvents.set([
    { event: 'Test Event', turns: 3 },
    { event: 'Test Event 2', turns: 5 },
  ]);
  scheduledEvents.advance();
  scheduledEvents.advance();
  let newEvent = scheduledEvents.advance();
  expect(newEvent).toBe('Test Event');
  expect(get(scheduledEvents)).toStrictEqual([
    { event: 'Test Event 2', turns: 2 },
  ]);
});
