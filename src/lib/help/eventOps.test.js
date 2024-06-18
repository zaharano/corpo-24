import { expect, test } from 'vitest';

import { getRandomQualifiedEventKey, serveScreen } from './eventOps';

const PROLOGUE_START = {
  title: 'Welcome to Megacorp!',
  text: "It's your first day in the mail room at Megacorp! Thanks to your shady Uncle Harrison, Under-Director of South American Regional Logistics, you've been given your shot at the corporate world. The mail room isn't the best shot, seeing as it's the year 2085 and nobody sends mail any more, but it's the one you've been given so damnit you're gonna give it your all! Your manager Merle has been at Megacorp for 30 years, and is eager to show you the ropes.",
  options: [
    {
      text: 'Get to work!',
      next: 'toWork',
      effects: {
        job: {
          performanceChange: 10,
          timePassed: 1,
        },
      },
    },
    {
      text: 'Actually, this is just a temporary job to pay the bills while I pursue my true passion, game development.',
      next: 'gameDev',
      effects: {
        job: {
          performanceChange: -25,
          timePassed: 2,
        },
        flags: {
          gameDeveloper: true,
        },
      },
    },
  ],
};

test('5 Qualified Event Keys, level 1, no flags', () => {
  for (let i = 0; i < 5; i++) {
    console.log(getRandomQualifiedEventKey(1, {}, []));
  }
});

test('5 Qualified Event Keys, level 1, "test" flag', () => {
  for (let i = 0; i < 5; i++) {
    console.log(getRandomQualifiedEventKey(1, { test: true }, []));
  }
});

test('Screenserver Prologue', () => {
  expect(serveScreen('prologue', 'start')).toEqual(PROLOGUE_START);
});
