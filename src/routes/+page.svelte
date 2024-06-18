<script lang="ts">
  // Components
  import Runner from '$lib/screens/Runner.svelte';
  import Megacorp from '$lib/screens//Megacorp.svelte';
  import ScreenHousing from '$lib/screens/ScreenHousing.svelte';
  import Display from '$lib/screens/Display.svelte';
  import Debug from '$lib/components/Debug.svelte';
  import ScreenEffects from '$lib/screens/ScreenEffects.svelte';

  // This game!
  import { megacorp } from '$lib/help/game';
  import { Engine } from '$lib/help/engine';

  // Util
  import { onMount } from 'svelte';
	import type { PageData } from './$types';

  // Stores
  import { inGame } from '$lib/stores/engineStores'

  export let data: PageData;

  let loadingInterval;
  let loaded = false;

  // silly bladerunner loading screen isn't necessary I just like it
  onMount(() => {
    loadingInterval = setTimeout(() => {
      loaded = true;
    }, 5000)
  })

  // potentially load from localStorage here!
  const engine = new Engine({ 
    events: data.events, 
    timeline: data.timeline, 
    initEvent: data.initEvent }, megacorp);
</script>

<svelte:head>
	<title>Megacorp</title>
	<meta name="Megacorp" content="A cyberpunk text adventure in corporate drudgery" />
</svelte:head>

<Debug />
<main>
  <div class='screen-container'>
    <ScreenHousing />
    <ScreenEffects>
      {#if !$inGame}
        {#if !loaded}
          <Runner />
        {:else}
          <Megacorp slot='content' start={() => engine.start()}/>
        {/if}
      {:else}
        <Display slot='content' />
      {/if}
    </ScreenEffects>
  </div>
</main>

<style>
  main {
    text-align: center;
  }
  
  .screen-container {
    width: 95vmin;
    position: absolute;
  }

  @media (max-width: 480px) {
    .app-container {
      min-height: 98vh;
      justify-content: inherit;
      font-size: calc(16px + 2vmin);
    }
    .screen-container {
      width: 100%;
      height: 100%;
      position: static;
    }
  }

</style>
