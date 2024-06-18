import getRandom from './utils';
import EVENTS from '../events/events';


// // debug only
// function isEventValid(event) {
//   // check all nexts exist as screens
//   // all effects are valid
//   // all screens are reachable
//   // all screens have at least one opt that will be available in any given circumstance
// }

function loadEvents() {
  const events = import.meta.glob('../events/*.json')
  for (const path in events) {
    events[path]().then((mod) => {
      console.log(path, mod)
    })
  }
}