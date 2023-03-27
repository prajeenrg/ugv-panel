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
		<InfoSnippet title="gps" contents={Object.entries($gps)} />
		<InfoSnippet title="motor" contents={Object.entries($motor)} />
		<InfoSnippet title="gyro" contents={Object.entries($gyro)} />
		<InfoSnippet title="Accelerometer" contents={Object.entries($accel)} />
	</div>
	<div class="mid">
		<iframe
			title="map"
			src="https://maps.google.com/maps?hl=en&q={$gps.latitude},{$gps.longitude}&t=k&z=20&ie=UTF8&iwloc=B&output=embed"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		/>
		<InfoSnippet title="Network" contents={Object.entries($network)} />
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

	.mid {
		width: 100%;
		height: 100%;
	}

	.mid > iframe {
		width: 100%;
		height: 75%;
		border: none;
		margin: 0.5em;
		border-radius: 8px;
	}

	@media only screen and (min-width: 600px) {
		.content {
			grid-template-columns: 1fr 1fr 1fr;
			gap: 8px 8px;
		}
	}

	.dpadbox {
		display: grid;
		place-items: center;
	}
</style>
