<script>
  import { currentEventTitle } from '$lib/stores/engineStores'
  import { job, vfx } from '$lib/stores/gameStores'

  let hidden = true;

  // document.addEventListener("keydown", (e) => {
  //   if (e.key === '`') hidden = !hidden
  // })
</script>

<div class="debug-console" class:hidden='{hidden === true}'>
  Level: {$job.level}
  Years: {$job.years}
  Department: {$job.department}
  Job Performance: {$job.performance}
  Enemies: {$job.enemies}


  <br>
  <button on:click={() => job.promotion(true)}>Promote</button>
  <button on:click={() => job.demotion(true)}>Demote</button>
  <button on:click={() => job.performanceChange(-5)}>Down 5 Performance</button>
  <button on:click={() => job.timePassed(2)}>Add 2 years</button>
  <button on:click={() => job.newDepartment('auto')}>New Department</button>
  <button on:click={() => job.newEnemy('auto')}>New Enemy</button>
  <br>
  
  Current Event: {$currentEventTitle}
  <br>
  Effects: <br>
  {#each Object.entries($vfx) as [effect, value]}
    &nbsp{effect}: {value}  ---  
  {/each}
  <!-- {@debug $effects} -->
  <button on:click={() => vfx.toggle('flicker')}>Toggle flicker</button>
  <button on:click={() => vfx.toggle('ghost')}>Toggle ghost</button>
  <button on:click={() => vfx.toggle('corruption')}>Toggle corruption</button>
  <button on:click={() => vfx.newSpeed(500)}>Switch typespeed</button>
  <br>

  <!-- <div>
    Flags: <br>
    {#each Object.entries($flags) as [flag, value]}
      &nbsp{flag}: {value}  ---  
    {/each}
  </div> -->
  <div>
    Enemies: <br>
    {#each Object.entries($job.enemies) as [enemy, value]}
      &nbsp{enemy}: {value}  ---  
    {/each}
  </div>

  <!-- <button on:click={() => game.loadScreen($currentEvent, $currentScreen)}>Load text</button> -->
  <!-- <button on:click={() => game.eventAdvance($currentEvent, $currentScreen, 1)}>Select option 1</button> -->

</div>

<style>
  .hidden {
    display: none;
  }
</style>