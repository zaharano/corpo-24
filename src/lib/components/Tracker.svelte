<script lang='ts'>
  import { onMount } from 'svelte';
  import { job} from '$lib/stores/gameStores';

  import Timer from '$lib/help/timer';

  let workTimer = new Timer('work');
  let inactiveTimer = new Timer('inactive');
  let workTimeDisplay : String;
  let idleTimeDisplay : String;
  let idleTracker : ReturnType<typeof setTimeout> ;
  let absentTracker : ReturnType<typeof setTimeout>;
  let delinquentTracker : ReturnType<typeof setTimeout>;
  let idle = false;
  let absent = false;
  let delinquent = false;

  let timeDisplayInterval;
  let idleDisplayInterval;

  function clockIn() {
    timeDisplayInterval = setInterval(() => {
      const timeInSeconds = Math.round(inactiveTimer.time() / 1000);
      idleTimeDisplay = String(timeInSeconds)
    }, 100)
    idleDisplayInterval = setInterval(() => {
      const timeInSeconds = Math.round(workTimer.time() / 1000);
      workTimeDisplay = String(timeInSeconds);
    }, 100)

    workTimer.start();
    resetIdle();
  }

  // TODO: I should debounce this, it fires a lot
  function resetIdle() {
    if (inactiveTimer.isRunning) {
      inactiveTimer.stop();
    }
    clearTimeout(idleTracker);
    clearTimeout(absentTracker);
    clearTimeout(delinquentTracker);
    idleTracker = setTimeout(setIdle, 5000);
    absentTracker = setTimeout(() => absent = true, 30000);
    delinquentTracker = setTimeout(() => delinquent = true, 60000);
    idle = false;
    absent = false;
    delinquent = false;
  }

  function setIdle() {
    inactiveTimer.start();
    idle = true;
  }

  onMount(() => {
    clockIn();
	});

</script>

<svelte:window 
  on:keydown={resetIdle} 
  on:mousemove={resetIdle} 
  on:click={resetIdle}
/>

<div class="stats error">
  <div class="times">
    <div><strong>Time in: </strong>{workTimeDisplay}</div>
    <div><strong>Time idle: </strong>{idleTimeDisplay}</div>
  </div>
  <div class={`status ${delinquent ? 'delinquent-text' : absent ? 'error-text' : idle ? 'warning-text' : 'good-text'}`}>
    <div><strong>Status: </strong></div>
    <div>{delinquent ? 'Delinquent' : absent ? 'Absent' : idle ? 'Idle' : 'Working'}</div>
  </div>
  <div class="ratio">
    <strong>Job Performance: </strong>{
      $job.performance > 80 ? 'Excellent' :
      $job.performance > 60 ? 'Good' :
      $job.performance > 40 ? 'Average' :
      $job.performance > 20 ? 'Poor' :
      'Terrible'
    }
  </div>  
</div>


<style>
  .stats {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    line-height: 1.1;
    font-size: .7em;
  }
  .error-text {
    color: hsl(23, 100%, 50%);
    text-shadow: 0px 0px 9.12281px hsla(23, 100%, 50%, .8),
      0px 0px 54.7368px hsla(23, 100%, 50%, 1);
  }
  .warning-text {
    color: hsla(60, 100%, 50%, 1);
    text-shadow: 0px 0px 9.12281px hsla(60, 100%, 50%, .8),
      0px 0px 54.7368px hsla(60, 100%, 50%, 1);
  }
  .good-text {
    color: hsla(120, 100%, 50%, 1);
    text-shadow: 0px 0px 9.12281px hsla(120, 100%, 50%, .8),
      0px 0px 54.7368px hsla(120, 100%, 50%, 1);
  }
  .delinquent-text {
    color: hsla(0, 100%, 50%, 1);
    text-shadow: 0px 0px 9.12281px hsla(0, 100%, 50%, .8),
      0px 0px 54.7368px hsla(0, 100%, 50%, 1);
    animation: fade 1000ms infinite;
  }
  .times {
    display: flex;
    flex-direction: column;
    width: 35%;
  }
  .status {
    text-align: center;
  }
  .ratio {
    text-align: right;
    width: 35%;
  }
</style>