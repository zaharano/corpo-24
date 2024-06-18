<script lang="ts">
  import Button from "./Button.svelte";
  import { displayAlert, listening } from '$lib/stores/engineStores'

  let visible = false;

  $: onAlertChange($displayAlert)

  function onAlertChange(alert : string) {
    if (alert === '') return
    listening.set(false);
    visible = true;
  }

  function clickHandler() {
    visible = false
    listening.set(true)
  }
</script>

{#if $displayAlert}
  <div class="popup-container">
    <div class="popup" class:closed='{visible === false}'>
      {$displayAlert}
      <Button {clickHandler} text={'OK'} />
    </div>
  </div>
{/if}

<style>
  .popup-container {
    position: absolute;
    height: 100%;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 10%;
    pointer-events: none;
  }
  .popup:global(.closing) {
    pointer-events: none;
    opacity: 0;
  }
  .popup:global(.closed) {
    pointer-events: none;
    display: none;
  }
  .popup {
    background-color: #2d3437;
    border: 3px solid var(--text);
    box-shadow: 0px 0px 2px hsla(178, 66%, 64%, 0.1),
    0px 0px 8px hsla(178, 82%, 75%, 0.2);
    margin: auto;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    pointer-events: all;
  }
</style>