<script>
  import Option from "./Option.svelte"

  import { fade } from 'svelte/transition'
  import { textLoaded } from '$lib/stores/engineStores'
  
  export let displayOptions;
</script>

<div class="options">
  {#if $textLoaded }
    {#each $displayOptions as option, idx}
      <div in:fade={{ duration: 5000, delay: idx * 700 + 500}}>
        <Option {idx} {option}/> 
      </div>
    {/each}
  {/if}
</div>


<style>
  .options {
    margin: .5em 0;
  }
</style>