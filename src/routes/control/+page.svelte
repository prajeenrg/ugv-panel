<script lang="ts">
	import { setupClient, disconnectClient } from '../mqtthelper';
	import { client, status, Constants, accel, gps, gyro, lidar, network, dht } from '../mqtthelper';
	import { onMount, onDestroy } from 'svelte';
	import Dpad from '$lib/components/Dpad.svelte';
	import InfoSnippet from '$lib/components/InfoSnippet.svelte';
	import { get } from 'svelte/store';

	let rand: string;
	let ping: number;
	let pingCheck: number;
	let connection = false;

	onMount(async () => {
		setupClient();
		ping = setInterval(() => {
			clearTimeout(pingCheck);
			rand = JSON.stringify(Math.random());
			client.publish(Constants.TOPIC_PING, rand);
			pingCheck = setTimeout(() => connection = (get(status) == rand), 500);
		}, 2000);
	});

	onDestroy(async () => {
		clearInterval(ping);
		disconnectClient();
	});
</script>

<svelte:head>
	<title>Control Panel</title>
</svelte:head>

<div class="content">
{#if connection}
	<div class="infobox">
		<InfoSnippet title="lidar (MM)" contents={Object.entries($lidar)} />
		<InfoSnippet title="Network" row={true} contents={Object.entries($network)} />
	</div>
	<div class="mid">
		<iframe
			title="map"
			src="https://maps.google.com/maps?hl=en&q={$gps.latitude},{$gps.longitude}&t=k&z=20&ie=UTF8&iwloc=B&output=embed"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		/>
		<InfoSnippet title="dht" contents={Object.entries($dht)} />
	</div>
	<div class="dpadbox">
		<InfoSnippet title="gyro  (dps)" contents={Object.entries($gyro)} />
		<InfoSnippet title="Accelerometer (g)" contents={Object.entries($accel)} />
		<Dpad />
	</div>
{:else}
	<h4>Please wait until the connection is established</h4>
{/if}
</div>

<style>
	.content {
		height: 100%;
		width: 100%;
		display: grid;
		padding: 1em;
		justify-items: center;
		align-items: center;
		align-items: start;
	}

	.infobox {
		display: flex;
		width: 100%;
		padding: 1em;
		justify-content: space-evenly;
		flex-direction: column;
	}

	.mid {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 1em;
		gap: 0.5em;
	}

	.mid > iframe {
		width: 100%;
		height: 35%;
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
		display: flex;
		flex-direction: column;
		padding: 1em;
	}
</style>
