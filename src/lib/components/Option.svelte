<script>
  import { choiceHandler } from '$lib/stores/engineStores';
  import { fly, fade } from 'svelte/transition'

  // Getting the handler here via a store is probably not great
  export let idx;
  export let option;
  let { text } = option;
</script>

<button on:click={() => {$choiceHandler(option)}} class='option'>
  <span class="option-num">{idx}.</span><span class="option-text">{text}</span>
</button>

<style>
  .option {
    padding: .4em;
    background-color: inherit;
    border: none;
    color: inherit;
    text-shadow: inherit;
    width: 100%;
    text-align: inherit;
    display: flex;
    flex-direction: row;
    font-family: var(--primary-font);
    font-size: inherit;
  }

  .option:hover {
    background-color: var(--text);
    box-shadow: var(--box-glow);
    color: var(--inversion);
  }

  .option-num {
    margin-right: 1em;
    font-weight: 700;
    font-size: 100%;
  }
</style>