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
		<InfoSnippet title="lidar" contents={Object.entries($data.lidar)} />
		<InfoSnippet title="gps" contents={Object.entries($data.gps)} />
		<InfoSnippet title="motor" contents={Object.entries($data.motor)} />
		<InfoSnippet title="gyroscope" contents={Object.entries($data.gyro)} />
		<InfoSnippet title="accelerometer" contents={Object.entries($data.accel)} />
	</div>
	<div class="map">
		<iframe
			title="map"
			src="https://maps.google.com/maps?hl=en&q={$data.gps.latitude},{$data.gps
				.longitude}&t=k&z=20&ie=UTF8&iwloc=B&output=embed"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		/>
	</div>
	<div class="dpadbox">
		<Dpad isConnActive={$data.connected} />
	</div>
</div>

<style>
	.content {
		display: grid;
		padding: 1em;
		justify-items: center;
		align-items: center;
	}

	iframe,
	.map {
		width: 100%;
		height: 100%;
		border: none;
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
