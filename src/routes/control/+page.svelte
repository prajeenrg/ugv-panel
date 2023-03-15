<script lang="ts">
	import { data, setupClient, disconnectClient } from '../mqtthelper';
	import { onMount, onDestroy } from 'svelte';
	import Dpad from '$lib/components/Dpad.svelte';
	import InfoSnippet from '$lib/components/InfoSnippet.svelte';

	onMount(setupClient);

	onDestroy(disconnectClient);
</script>

<svelte:head>
	<title>Control Panel</title>
</svelte:head>

<div class="content">
	<div class="infobox">
		<h4>Information</h4>
		<InfoSnippet title="lidar" contents={Object.entries($data.lidar)} />
		<InfoSnippet title="gps" contents={Object.entries($data.gps)} />
		<InfoSnippet title="motor" contents={Object.entries($data.motor)} />
		<InfoSnippet title="gyro" contents={Object.entries($data.gyro)} />
	</div>
	<div class="dpadbox">
		<h4>Direction Controls</h4>
		<Dpad isConnActive={$data.connected} />
	</div>
</div>

<style>
	h4 {
		font-weight: bold;
		font-size: 18px;
		text-align: center;
	}

	.content {
		display: flex;
		gap: 1em;
		padding: 1em;
		width: 90vw;
		justify-content: space-around;
	}

	@media only screen and (max-width: 760px) {
		.content {
			flex-direction: column;
		}
	}

	.dpadbox {
		display: grid;
		place-items: center;
	}
</style>
