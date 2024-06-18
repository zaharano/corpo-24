// timer constructor
// instantiates a timer that can be started and stopped and keeps an aggregate
// TODO add optional param of a cached DOM ref and handle interval internally

class Timer {
  name: string;
  initTime: number;
  startTime: number | undefined;
  totalTime: number;
  isRunning: boolean;

  constructor(name: string) {
    this.name = name;
    this.initTime = Date.now();
    this.startTime = undefined;
    this.totalTime = 0;
    this.isRunning = false;
  }

  start() {
    if (this.isRunning) {
      return console.warn('Timer is already running');
    }
    this.isRunning = true;
    this.startTime = Date.now();
  }

  stop() {
    if (!this.isRunning) {
      return console.warn('Timer is already stopped');
    }
    this.totalTime = this.totalTime + this.elapsed();
    this.isRunning = false;
  }

  elapsed() {
    if (!this.isRunning || !this.startTime) {
      return 0;
    }
    return Date.now() - this.startTime;
  }

  reset() {
    this.totalTime = 0;
    this.isRunning = false;
    this.startTime = undefined;
  }

  time() {
    // not yet run case
    if (this.isRunning) {
      return this.totalTime + this.elapsed();
    }
    return this.totalTime;
  }
}

export default Timer;
