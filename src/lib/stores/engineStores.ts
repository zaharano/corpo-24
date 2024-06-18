import { writable } from 'svelte/store';
import type { Option } from '../types/eventData.types';

// string: current event title
export const currentEventTitle = writable('');
export const currentEvent = writable(null)
// string: current screen title
export const currentScreenTitle = writable('');
export const currentScreen = writable('');

export const choiceHandler = writable((opt:Option) => {});

// USED BY COMPONENTS TO DISPLAY GAME
// string: current text
export const displayText = writable('');
// array (objects): current list of options (as in answers to screen)
export const displayOptions = createOptions([]);
function createOptions(INIT : Option[]) {
  const { subscribe, set } = writable(INIT);

  return {
    subscribe,
    set,
    init: () => set(INIT),
  };
}
// string: current alert text
export const displayAlert = writable('');

// USED BY COMPONENTS TO CONTROL DISPLAY AND INPUT
// bool: whether currently listening for input
export const listening = writable(false);
// bool: whether text has finished loading
export const textLoaded = writable(false);
// bool: whether the game is currently running
export const inGame = createToggle(false);

// object: flags track decisions that have occurred in current game
// export const flags = createFlags({});

// // generates flags object with custom controls
// function createFlags(INIT : Flags) {
//   const { subscribe, set, update } = writable(INIT);

//   const add = (flag:string, value:boolean) => {
//     update((flags) => {
//       return {
//         ...flags,
//         [flag]: value,
//       };
//     });
//   };

//   return {
//     subscribe,
//     add,
//     init: () => set(INIT),
//   };
// }

// generates generic toggle with limited control
function createToggle(initialValue : boolean) {
  const { subscribe, set, update } = writable(initialValue);

  const toggle = () => {
    update((current) => {
      return !current;
    });
  };

  const init = () => {
    set(initialValue);
  };

  return {
    subscribe,
    toggle,
    init,
  };
}