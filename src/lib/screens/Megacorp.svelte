<script>
  import Button from "$lib/components/Button.svelte";
  // import { initGame } from "../help/game.js"

  export let start;
</script>

<div class='container'>
  <pre role="img" aria-label="MEGACORP">
███╗   ███╗███████╗ ██████╗  █████╗  ██████╗ ██████╗ ██████╗ ██████╗ 
████╗ ████║██╔════╝██╔════╝ ██╔══██╗██╔════╝██╔═══██╗██╔══██╗██╔══██╗
██╔████╔██║█████╗  ██║  ███╗███████║██║     ██║   ██║██████╔╝██████╔╝
██║╚██╔╝██║██╔══╝  ██║   ██║██╔══██║██║     ██║   ██║██╔══██╗██╔═══╝ 
██║ ╚═╝ ██║███████╗╚██████╔╝██║  ██║╚██████╗╚██████╔╝██║  ██║██║     
╚═╝     ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     
                                                                     
  </pre>
  <nav class="menu">
    <Button clickHandler={start} text={'CLOCK IN'}/>
    <!-- <Button clickHandler={initGame} text={'LOAD'}/> -->
  </nav>
</div>


<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 108%;
    transform: scale(1.2);
    font-family:monospace;
  }

  pre {
    font-size: calc(3px + 1vmin);
  } 

  @media (max-width: 480px) {
    .container {
      transform: scale(1);
      margin-top: 10vh
    }
    pre {
      font-size: calc(1px + 1vmin);
      text-align: center;
    }
  }

  nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

</style>