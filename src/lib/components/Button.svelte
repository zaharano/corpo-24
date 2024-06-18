<script>
  export let clickHandler;
  export let text;
</script>

<button on:click={clickHandler}>{text}</button>

<style>
  button {
    display: block;
    box-shadow: var(--line-glow), var(--line-glow) inset;
    background-color: rgba(0,0,0,0);
    color: var(--text);
    border: 3px solid var(--text);
    padding: 3px 10px;
    font-size: inherit;
    font-family: inherit;
    margin-top: 1em;
    cursor: pointer;
  }

  button:hover {
    background-color: var(--text);
    box-shadow: var(--box-glow);
    color: var(--inversion);
  }
</style>