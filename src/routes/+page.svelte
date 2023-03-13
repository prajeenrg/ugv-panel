<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import rover1 from '$lib/assets/rover1.jpg';
	import rover2 from '$lib/assets/rover2.jpg';
	import rover3 from '$lib/assets/rover3.jpg';
	import rover4 from '$lib/assets/rover4.jpg';

	let imgs = [rover1, rover2, rover3, rover4];
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<header>
	<NavBar activeId={1} />
</header>
<div class="content">
	<h1>Welcome to MIT UGV Control Panel</h1>
	<div class="images">
		{#each imgs as img, i}
			<img src={img} alt="rover picture {i + 1}" />
		{/each}
	</div>
	<p>
		This page currently is a placeholder to access the control panel of the UGV project that we are
		currently working on.
	</p>
</div>

<style>
	.content {
		padding: 5em;
		display: grid;
		place-items: center;
		font-family: 'IBM Plex Sans';
		text-align: center;
	}

	h1 {
		margin: 1rem;
	}

	.images > img {
		height: 25vh;
		margin: 0.5em;
	}
</style>
