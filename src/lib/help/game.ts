import type { GameRequirements, GameEffects } from '$lib/types/eventData.types.js';
import { job, vfx } from '../stores/gameStores.js'

import { get } from 'svelte/store';

export class Game {
  //@ts-ignore - will need to type
  constructor(stores) {
    //@ts-ignore - will need to type
    stores.forEach((store) => {
      store.init();
    });
  }

  tick() {
    // if jobPerformance > x, promotion
    // if jobperf < x, demotion
    // if yearsPassed > x, load die at your keyboard slide
    // if currentTitle = x, load forced out from the top slide
    // if idletimer last minute > x, perperf down
    //
  }

  // TODO: implement decimal version of level requirements
  checkGameRequirements(gameReqs : GameRequirements) {
    let playerLevel = get(job).level;
    if (gameReqs.maxLevel && playerLevel > gameReqs.maxLevel) {
      return false;
    }
    if (gameReqs.minLevel && playerLevel < gameReqs.minLevel) {
      return false;
    }
    return true;
  }

  resolveGameEffects(effects : GameEffects) {
    if (effects?.job) {
      for (let [func, value] of Object.entries(effects.job)) {
        // pro/dems can carry alerts with vars applicable post-effect
        switch (func) {
          case 'performanceChange':
            job.performanceChange(value);
            break;
          case 'timePassed':
            job.timePassed(value);
            break;
          case 'promotion':
            job.promotion(value);
            break;
          case 'demotion':
            job.demotion(value);
            break;
          case 'newDept':
            job.newDepartment(value);
            break;
          case 'newEnemy':
            job.newEnemy(value);
            break;
        }
      }
    }
  }
  
  // TODO remove the hard code of the these vars and allow an object argument
  // that lists out the vars and their replacement strategy
  // clean up this implementation
  fillVars(text : string) {
    const currentJob = get(job);
    if (typeof text === 'string') {
      // @ts-ignore I don't know why the callback could return undefined
      return text.replace(/%ENEMY|%DEPT|%TITLE/g, (v) => {
        switch (v) {
          case '%ENEMY':
            if (currentJob.enemies.length) {
              if (currentJob.enemies[0])
                return currentJob.enemies[0];
              else return 'Gary Oak';
            }
            else return 'Gary Oak';
          case '%DEPT':
            if (currentJob.department)
              return currentJob.department;
            else return 'R&D';
          case '%TITLE':
            if (currentJob.title)
              return currentJob.title;
            else return 'Intern';
        }
      });
    } else {
      console.warn('attempting to replace vars in a non-string.');
      return text;
    }
  }

  init() {
    job.init();
    vfx.init();
  }
}

export const megacorp = new Game([job, vfx]);

