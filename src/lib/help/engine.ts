import type { Event, EventMeta, Screen, Requirements, FlagSet, Option, Effects } from '$lib/types/eventData.types';
import { EventTimeline, EventPool } from '$lib/engine/eventClasses';
import { Game } from '$lib/help/game';



import {
  currentEventTitle,
  currentScreenTitle,
  displayText,
  displayOptions,
  displayAlert,
  textLoaded,
  listening,
  inGame,
  choiceHandler
} from '../stores/engineStores.js'; 

export class Engine {
  currentEvent: Event;
  currentScreen: Screen;
  schedule: EventTimeline;
  allEvents: EventPool;
  flags: Flags;
  game: Game;

  constructor(INIT : { events: EventMeta[], timeline: (EventMeta | null)[], initEvent: Event }, game: Game) {
    // somehow ensure init timeline0 is an event
    // @ts-ignore
    this.currentEvent = INIT.initEvent;
    this.currentScreen = this.currentEvent.screens.start;
    this.schedule = new EventTimeline(INIT.timeline);
    this.allEvents = new EventPool(INIT.events);
    this.flags = new Flags({});
    this.game = game;
  }

  async eventLoad(event: EventMeta) : Promise<Event>{
    const response = await fetch("/events?e=" + event.slug);
    const data = await response.json();
    return data;
  }

  // start the game
  start() {
    this.game.init();
    this.flags.init();
    this.schedule.init();
    this.allEvents.init();
    this.eventInit(this.currentEvent);
    choiceHandler.set(this.choiceHandler.bind(this));
    inGame.toggle();
  }

  // end the game
  end(message: string = 'Game Over') {
    displayAlert.set(message);
    inGame.toggle();
    // clock out
  }

  displayScreen(screen: Screen) {
    const { text, options } = screen;
    displayText.set(this.game.fillVars(text));
    const filteredOptions = options.filter((option) => {
      if (option?.requires) {
        return this.checkRequirements(option.requires);
      } else return true;
    });
    if (filteredOptions.length === 0) {
      this.end('You ran out of options! The game is still in development and more content will be added soon. Thanks for playing!');
    }
    displayOptions.set(filteredOptions);
  }

  eventInit(event: Event) {
    this.currentEvent = event;
    if (this.currentEvent.effects?.onStart) {
      this.resolveEffects(this.currentEvent?.effects?.onStart);
    }
    this.currentScreen = this.currentEvent.screens.start;
    currentEventTitle.set(this.currentEvent.meta.title);
    currentScreenTitle.set(this.currentScreen.title);
    this.displayScreen(this.currentScreen);
  }

  eventAdvance(next: string) {
    if (!next) {
      console.error('No valid "next" for selected option');
    }
    this.currentScreen = this.currentEvent.screens[next];
    this.displayScreen(this.currentScreen);
  }

  eventEnd() {
    if (this.currentEvent.effects?.onEnd) {
      this.resolveEffects(this.currentEvent?.effects?.onEnd);
    }
    let nextEvent = this.schedule.advance();
    if (nextEvent === null) {
      nextEvent = this.allEvents.getQualifiedRandomEvent(this.checkRequirements);
    } 
    if (nextEvent !== null) {
      this.eventLoad(nextEvent).then((event) => {
        this.eventInit(event);
      });
    } else {
      this.end('Ran out of stuff to do! The game is still in development and more content will be added soon. Thanks for playing!');
    }
  }

  // old note:
      // this is the choice handler given to the interface
      // the state handling should probably be moved to the eventHandlers
      // results in one of: eventInit(end), eventInit(new), eventAdvance(next)
  // redocument this!
  choiceHandler(option : Option) {
    let effects = option.effects;
    let next = option.next;
    listening.set(false);
    textLoaded.set(false);
    if (next === 'gameEnd') {
      this.end();
    } else {
      if (effects) {
        this.resolveEffects(effects);
      } 
      if (next === 'eventEnd') {
        this.eventEnd();
      } else {
        this.eventAdvance(next);
      }
    }
  }

  checkRequirements(requires : Requirements) {
    if (requires?.flags) {
      return this.flags.checkFlags(requires.flags);
    }
    if (requires?.gameReqs) {
      return this.game.checkGameRequirements(requires.gameReqs);
    }
    return true;
  }

  resolveEffects(effects : Effects) {
    if (effects.gameEffects) {
      this.game.resolveGameEffects(effects.gameEffects);
    }
    if (effects.editFlags) {
      for (const [flag, value] of Object.entries(effects.editFlags)) {
        this.flags.add(flag, value);
      }
    }
    if (effects.editEvents) {
      if (effects.editEvents.schedule) {
        if (effects.editEvents.schedule.add) {
          for (const { event, time } of effects.editEvents.schedule.add) {
            const eventMeta = this.allEvents.pool.find((e) => e.slug === event);
            if (!eventMeta) {
              console.error(`Event ${event} not found in event pool`);
            } else {
              this.schedule.add(eventMeta, time);
            }
          }
        }
        // if (effects.editEvents.schedule.remove) {
        //   for (const event of effects.editEvents.schedule.remove) {
        //     this.schedule.remove(event);
        //   }
        // }
      }
    }
  }
} 

class Flags {
  playerFlags: FlagSet;
  INIT: FlagSet;

  constructor(INIT : FlagSet = {}) {
    this.playerFlags = INIT;
    this.INIT = INIT;
  }

  add(flag: string, value: boolean) {
    this.playerFlags = {
      ...this.playerFlags,
      [flag]: value,
    }
  }

  // TODO: double check this
  checkFlags(flagsToCheck: FlagSet) {
    return Object.entries(flagsToCheck).every(([flag, value]) => {
      if (Object.hasOwn(this.playerFlags, flag)) {
        return this.playerFlags[flag] === value;
      }
      if (value === false) {
        return true;
      }
      return false;
    });
  }

  init() {
    this.playerFlags = this.INIT;
  }
}