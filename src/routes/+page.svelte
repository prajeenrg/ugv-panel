<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import rover1 from '$lib/assets/rover1.jpg?webp&h=200&metadata';
	import rover2 from '$lib/assets/rover2.jpg?webp&h=200&metadata';
	import rover3 from '$lib/assets/rover3.jpg?webp&h=200&metadata';
	import rover4 from '$lib/assets/rover4.jpg?webp&h=200&metadata';

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
			<img src={img.src} width={Math.ceil(img.width)} height={img.height} alt="rover picture {i + 1}" />
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
		text-align: center;
	}

	h1 {
		margin: 1rem;
	}
</style>
