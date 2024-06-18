import { test, expect } from 'vitest';

import { get } from 'svelte/store';

import {
  job,
  flags,
  lockedEvents,
  currentEventTitle,
  currentScreen,
  scheduledEvents,
} from '../stores/engineStores';

import { initGame } from './game';

function setState(name) {
  switch (name) {
    case 'early':
      job.set({
        level: 1,
        years: 4,
        department: 'Applied Logistics',
        title: 'Junior Manager',
        performance: 70,
        enemies: [],
      });
      flags.init();
      lockedEvents.set([]);
    case 'mid':
      job.set({
        level: 7,
        years: 23,
        department: 'Applied Applications',
        title: 'Senior Manager, Project Management',
        performance: 70,
        enemies: [],
      });
      flags.set({ test: true, test2: true });
      lockedEvents.set([]);
  }
}

test('Game initialize resets state and starts prologue', () => {
  initGame();

  expect(get(currentEventTitle)).toEqual('prologue');
  expect(get(currentScreen)).toEqual('start');
  expect(get(scheduledEvents)).toEqual([]);
});

// test a few effects blocks

// test a few fill vars with promotion in between
