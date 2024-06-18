<script lang='ts'>
  import { onMount } from 'svelte'
  import { textLoaded, displayText } from '$lib/stores/engineStores'
  import { vfx } from '$lib/stores/gameStores'

	$: $displayText, newText();
  
	let container : HTMLDivElement;

  // couldn't find other way set up the reactive func only active after mount
  let newText = () => { };

  function clear() {
    container.innerHTML = '';
  }

  function addCharacter(c : string, count : number) {
    const child = document.createElement('span');
    child.id = `c${count}`
    child.textContent = c;
    child.classList.add('hidden');
    child.classList.add('burning');
    container.appendChild(child);
  }

  function revealCharacter(count : number) {
    const selected = document.querySelector(`#c${count}`)
    if (!selected) return;
    selected.classList.remove('hidden')
    selected.classList.remove('burning')
  }

	onMount(() => {
    newText = () => {
      clear()
      let content = $displayText;
      let cArr = content.split("")
      let timer : ReturnType<typeof setInterval>;

      let added = 0;
      let revealed = 0;
      
      for (let i = 0; i < cArr.length; i++) {
        addCharacter(cArr[added], added)
        added++;
      }

      timer = setInterval(() => {
        if (revealed < cArr.length) {
          revealCharacter(revealed)
          revealed++;
        }
        else {
          setTimeout(() => {
            textLoaded.set(true)
          }, 500);
          clearInterval(timer);
        }
      }, $vfx.typeSpeed);
    }
    newText();
	});

</script>

<div class='typeOut-container' bind:this={container} />

<style>
  .typeOut-container {
    transition: color 1s, text-shadow 1s;
    will-change: auto;
    /* filter: drop-shadow(0 0 55px white) */
  }

  .typeOut-container :global(span) {
    will-change: auto;
    transition: color 1.2s, text-shadow 1.2s;
  }

  .typeOut-container :global(.burning) {
    color: hsl(177, 64%, 95%);
    /* tragically, chrome and safari choke on text shadow */
    /* text-shadow: 0px 0px 9.12281px hsl(0, 0%, 100%), 0px 0px 54.7368px hsl(0, 0%, 100%); */
    /* filter: drop-shadow(0 0 55px hsl(178, 49%, 52%)); */
  }

  :global(.hidden) {
    opacity: 0;
  }
</style>