
<script>
</script>

<div class="app-container">

	<main>
		<slot />
	</main>

	<footer>
		<span class="info">
			Just the prologue for now while I write the rest!<br>
			<a href="https://github.com/zaharano/corpo-svelte" target="_blank" rel="noopener noreferrer">Check out the repo</a>
		</span>
	</footer>
</div>

<style>
	.app-container {
    background-color: #282c34;
    /* background: rgb(4,13,12);
    background: linear-gradient(180deg, rgba(4,13,12,1) 0%, rgba(2,51,40,1) 78%, rgba(0,36,29,1) 80%, rgba(3,92,80,1) 100%);     */
    min-height: 98vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .info {
		text-align: center;
    font-size: .5em;
    position: absolute;
    bottom: 0;
    margin-bottom: 2em;
  }

	.info a {
    color: white;
  }

	.info a:hover {
    color: #8fe6e2;
  }
</style>
