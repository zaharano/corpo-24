import {
  job,
  flags,
  lockedEvents,
  scheduledEvents,
  currentEventTitle,
  currentScreen,
  displayText,
  displayOptions,
  displayAlert,
  textLoaded,
  listening,
  inGame,
} from '../stores/engineStores.js';

import {
  serveScreen,
  isEventRepeatable,
  getRandomQualifiedEventKey,
  checkRequirements,
} from './eventOps.js';

import { get } from 'svelte/store';

// reset various state variables
function initGame() {
  job.init();
  flags.init();
  scheduledEvents.init();
  lockedEvents.set([]);
  eventInit('prologue');
  inGame.toggle();
}

function endGame() {
  inGame.toggle();
  // clock out
}

// TODO: Function to check metrics
function checkMetrics() {
  // if jobPerformance > x, promotion
  // if jobperf < x, demotion
  // if yearsPassed > x, load die at your keyboard slide
  // if currentTitle = x, load forced out from the top slide
  // if idletimer last minute > x, perperf down
  //
}

function checkRequirements(requires, playerLevel, playerFlags) {
  if (typeof requires.level === 'number') {
    if (requires.level > playerLevel) return false;
  }
  if (Object.hasOwn(requires, 'flags')) {
    if (!checkFlags(playerFlags, requires.flags)) return false;
  }
  return true;
}

// this is the choice handler given to the interface
// the state handling should probably be moved to the eventHandlers
// results in one of: eventInit(end), eventInit(new), eventAdvance(next)
function choiceHandler(effects, next) {
  let playerLevel = get(job).level;
  let playerFlags = get(flags);
  let playerCompleted = get(lockedEvents);
  listening.set(false);
  textLoaded.set(false);
  if (next === 'gameEnd') {
    endGame();
  } else {
    resolveEffects(effects);
    if (next === 'eventEnd') {
      let nextEvent = getRandomQualifiedEventKey(
        playerLevel,
        playerFlags,
        playerCompleted
      );
      eventInit(nextEvent);
    } else {
      eventAdvance(next);
    }
  }
}

// initializes an event given its name
// if the event isn't repeatable, it will be locked
// and pulls in display
function eventInit(eventKey) {
  currentEventTitle.set(eventKey);
  currentScreen.set('start');
  // if the selected event is not repeatable, add to locked events
  if (!isEventRepeatable(eventKey)) {
    lockedEvents.update((list) => list.concat([eventKey]));
  }
  displayScreen(serveScreen(eventKey, 'start'));
}

// continues the current event, given the next screen key
function eventAdvance(nextKey) {
  if (!nextKey) {
    console.error('No valid "next" for selected option');
  }
  currentScreen.set(nextKey);
  displayScreen(serveScreen(get(currentEventTitle), nextKey));
}

function displayScreen(screen) {
  const { text, options } = screen;
  displayText.set(fillVars(text));
  const filteredOptions = options.filter((option) => {
    if (Object.hasOwn(option, 'requires')) {
      return checkRequirements(option.requires, get(job).level, get(flags));
    } else return true;
  });
  displayOptions.set(filteredOptions);
}

// TODO remove the hard code of the these vars and allow an object argument
// that lists out the vars and their replacement strategy
// export
function fillVars(text) {
  const currentJob = get(job);
  if (typeof text === 'string') {
    return text.replace(/%ENEMY|%DEPT|%TITLE/g, (v) => {
      switch (v) {
        case '%ENEMY':
          if (currentJob.enemies.length) return currentJob.enemies[0];
          else return 'Gary Oak';
        case '%DEPT':
          return currentJob.department;
        case '%TITLE':
          return currentJob.title;
      }
    });
  } else {
    console.warn('attempting to replace vars in a non-string.');
    return text;
  }
}

// refactor for object handling
// can be from beginning/end of event or option selection
function resolveEffects(effects) {
  // For reference, all possible keys in effects block
  // effects: {
  //   job: {
  //     performanceChange: int,
  //     timePassed: int,
  //     promotion: bool,
  //     demotion: bool,
  //     newDept: 'auto' or other string
  //     newEnemy: 'auto' or other string
  //   },
  //   flags: {newFlag: bool},
  //   events: { force: [string], lock: [string] },
  //   vfx: {effect: bool}
  //   alert: string,
  // }
  // All job keys are methods of job store
  let alertText = '';
  if (effects) {
    // all possible job object keys are methods of the job store
    if (effects.job) {
      applyJobEffects(effects.job);
    }
    if (effects.flags) {
      for (const [flag, value] of Object.entries(effects.flags)) {
        flags.add(flag, value);
      }
    }
    if (effects.events) {
      // TODO: handle forcing or locking events
    }
    // if a forced alert is set, it will take over priority from above alert
    // is that the wrong order?
    // if (effects.alert && effects.alert.length) {
    //   alertText = fillVars(effects.alert);
    // }
    if (alertText !== '') {
      displayAlert.set(fillVars(alertText));
    }
    if (effects.eventComplete === true) return 1;
  }

  // I didn't actually want this scoped thing, revisit this!
  function applyJobEffects(jobEffects) {
    for (let [func, value] of Object.entries(jobEffects)) {
      // pro/dems can carry alerts with vars applicable post-effect
      job[func](value);
      if (func === 'promotion' || func === 'demotion') {
        if (typeof value === 'string') {
          alertText = value;
        }
      }
    }
  }
}

function loadPrevious() {
  // placeholder
}

export { choiceHandler, loadPrevious, initGame };
