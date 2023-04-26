<script lang="ts">
	import { setupClient, disconnectClient } from '../mqtthelper';
	import { connection, accel, gps, gyro, lidar, motor, network } from '../mqtthelper';
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
		<InfoSnippet title="lidar" contents={Object.entries($lidar)} />
		<InfoSnippet title="motor" contents={Object.entries($motor)} />
		<InfoSnippet title="gyro" contents={Object.entries($gyro)} />
		<InfoSnippet title="Accelerometer" contents={Object.entries($accel)} />
		<InfoSnippet title="Network" contents={Object.entries($network)} />
	</div>
	<div class="mid">
		<iframe
			title="map"
			src="https://maps.google.com/maps?hl=en&q={$gps.latitude},{$gps.longitude}&t=k&z=20&ie=UTF8&iwloc=B&output=embed"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		/>
	</div>
	<div class="dpadbox">
		<Dpad bind:isConnActive={$connection} />
	</div>
</div>

<style>
	.content {
		display: grid;
		padding: 1em;
		justify-items: center;
		align-items: center;
	}

	.infobox {
		display: flex;
		height: 100%;
		widows: 100%;
		justify-content: space-evenly;
		flex-direction: column;
	}

	.mid {
		width: 100%;
		height: 75vh;
	}

	.mid > iframe {
		width: 100%;
		height: 100%;
		border: none;
		box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
		margin: 0.5em;
	}

	@media only screen and (min-width: 600px) {
		.content {
			grid-template-columns: 1fr 1fr 1fr;
			gap: 8px 8px;
		}
	}

	.dpadbox {
		width: 100%;
		height: 100%;
	}
</style>
