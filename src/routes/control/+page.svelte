<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<svelte:head>
	<title>Control Page</title>
</svelte:head>

<NavBar activeId={3} />
<div class="content">
	<h1>Welcome to MIT UGV Control Panel</h1>
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
	}

	h1 {
		margin: 1rem;
	}
</style>
