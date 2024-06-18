// Stores specific to Megacorp game

import { writable } from 'svelte/store';
import generateDepartment from '../help/department';
import generateEnemy from '../help/enemies';
import titles from '../help/titles';

import type { Job, VFX } from '../types/game.types';

// object: job tracks data about progress in current game
export const job = createJob({
  level: 0,
  years: 0,
  department: 'Mail Room',
  title: 'Mail Jockey',
  performance: 40,
  enemies: [],
});

// object: effects tracks certain visual effects in current game
export const vfx = createVFX({
  typeSpeed: 10,
  tracker: false,
  enhancedTracker: false,
  flicker: false,
  corruption: false,
  ghost: false,
});

// generates job object with custom controls
function createJob(INIT : Omit<Job, "MAXLEVEL" | "MAXYEARS">) {
  const { subscribe, set, update } = writable(INIT);

  const MAXLEVEL = titles.length;
  const MAXYEARS = 146;

  // title index is -1, pre-update level is appropriate for pulling new title
  // TODO: handle max level
  const promotion = (message : string | boolean = true) => {
    if (message !== false) {
      update((j) => {
        return {
          ...j,
          level: j.level + 1,
          performance: 50,
          title: titles[j.level],
        };
      });
    }
  };

  // TODO: handle min level
  const demotion = (message : string | boolean = true) => {
    if (message !== false) {
      update((j) => {
        return {
          ...j,
          level: j.level - 1,
          performance: 50,
          title: titles[j.level],
        };
      });
    }
  };

  // if newDepartment or newEnemy called 'auto' or w/o string they generate
  const newDepartment = (name : string = 'auto') => {
    if (typeof name !== 'string' || name === 'auto') {
      name = generateDepartment();
    }
    update((j) => {
      return {
        ...j,
        department: name,
      };
    });
  };

  const newEnemy = (name : string = 'auto') => {
    if (typeof name !== 'string' || name === 'auto') {
      name = generateEnemy();
    }
    update((j) => {
      return {
        ...j,
        enemies: [...j.enemies, name],
      };
    });
  };

  const performanceChange = (d : number) => {
    update((j) => {
      return {
        ...j,
        performance: j.performance + d,
      };
    });
  };

  const timePassed = (d : number) => {
    update((j) => {
      return {
        ...j,
        years: j.years + d,
      };
    });
  };

  return {
    subscribe,
    promotion,
    demotion,
    newDepartment,
    newEnemy,
    performanceChange,
    timePassed,
    MAXLEVEL,
    MAXYEARS,
    init: () => set(INIT),
  };
}

// generates effects object with custom controls
function createVFX(INIT : Required<VFX>) {
  const { subscribe, set, update } = writable(INIT);

  const toggle = (effect : keyof Omit<VFX, "typeSpeed">) => {
    update((effects) => {
      const newEffects = {
        ...effects,
      };
      newEffects[effect] = !effects[effect];
      return newEffects;
    });
  };

  const newSpeed = (num : number) => {
    update((effects) => {
      return {
        ...effects,
        typeSpeed: num,
      };
    });
  };

  return {
    subscribe,
    toggle,
    newSpeed,
    init: () => set(INIT),
  };
}