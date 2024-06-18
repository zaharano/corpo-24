// basic loop:
// check if event is flagged {
//   load event loop
//   resolve event screens (apply changes along way) until conclusion reached
// } else {
//   check focus for effect {
//     effect performance
//   }
//   check promotion flag or performance for promotion {
//     promote
//   }
//   flag a new event from deck
// }

function Game() {
  let state = {
    currentLevel: 0,
    years: 0,
    department: undefined,
    title: undefined,
    jobPerformance: undefined,
    currentEvent: undefined,
    flags: {},
    eventDeck: [],
  };

  this.setLevel = function (num) {
    state = {
      ...state,
      currentLevel: num,
    };
  };
  this.getLevel = function () {
    return this.state.currentLevel;
  };
  this.updateLevel = function (num) {
    this.state.currentLevel += num;
  };

  this.setYears = function () {};
  this.getYears = function () {};
  this.updateYears = function () {};

  this.newDepartment = function () {};
  this.getDepartment = function () {};

  this.promotion = function () {};
  this.demotion = function () {};
  this.getTitle = function () {};

  this.setPerf = function () {};
  this.getPerf = function () {};
  this.updatePerf = function () {};

  this.setCurrentEvent = function () {};
  this.getCurrentEvent = function () {};
  this.newCurrentEvent = function () {};

  this.setFlags = function () {};
  this.checkFlags = function () {};

  this.addEvents = function () {};
  this.removeEvents = function () {};
  this.randomEvent = function () {};
}
