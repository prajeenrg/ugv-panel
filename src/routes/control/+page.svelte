<script lang="ts">
	import { client, data, setupClient, disconnectClient, Constants } from '../mqtthelper';
	import { onMount, onDestroy } from 'svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import Dpad from '$lib/components/Dpad.svelte';

	onMount(setupClient);

	onDestroy(disconnectClient);

	let topic = '';
	let msg = '';

	let handleClick = async () => {
		if (!topic || !msg) return;
		await client.publish(`${Constants.TOPIC_PREFIX}/${topic}`, msg);
		console.info('Message sent');
	};
</script>

<svelte:head>
	<title>Control Panel</title>
</svelte:head>

<NavBar activeId={2} />
<div class="content">
	<div class="infobox">
		<h4>Information</h4>
		<p>LiDAR Data</p>
		<ul>
			<li>Front: {$data.lidar.front} mm</li>
			<li>Back: {$data.lidar.back} mm</li>
			<li>Left: {$data.lidar.left} mm</li>
			<li>Right: {$data.lidar.right} mm</li>
		</ul>

		<p>GPS Data</p>
		<ul>
			<li>Latitude: {$data.gps.latitude} deg</li>
			<li>Longitude: {$data.gps.longitude} deg</li>
		</ul>

		<p>Motor Data</p>
		<ul>
			<li>Left Motor Speed: {$data.motor.leftSpeed} RPM</li>
			<li>Right Motor Speed: {$data.motor.rightSpeed} RPM</li>
		</ul>

		<p>Gyro Data</p>
		<ul>
			<li>X-Axis: {$data.gyro.xAxis} dps</li>
			<li>Y-Axis: {$data.gyro.yAxis} dps</li>
			<li>Z-Axis: {$data.gyro.zAxis} dps</li>
			<li>Acceleration: {$data.gyro.accel} g</li>
		</ul>
	</div>

	<div class="sendbox">
		<h4>Send your data here</h4>
		<input placeholder="Enter topic name" bind:value={topic} />
		<textarea placeholder="Enter message" rows="10" bind:value={msg} />
		<button on:click={handleClick}>Send</button>
	</div>

	<div class="dpadbox">
		<h4>Direction Controls</h4>
		<Dpad />
	</div>
</div>

<style>
	h4 {
		font-weight: bold;
		font-size: 18px;
		text-align: center;
	}

	.content {
		gap: 1em;
		padding: 1em;
		width: 90vw;
		justify-content: space-between;
	}

	@media only screen and (min-width: 760px) {
		.content {
			display: flex;
			flex-direction: row;
		}
	}

	.sendbox {
		display: flex;
		flex-direction: column;
	}
</style>
