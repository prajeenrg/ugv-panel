<script lang="ts">
	import { client, data, setupClient, disconnectClient, Constants } from '../mqtthelper';
	import { onMount, onDestroy } from 'svelte';

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

<!-- {#if status !== 'connected' }
	<p>Waiting for the MQTT Client to establish connection...</p>
{:else} -->
<p>LiDAR Data</p>
<ul>
	<li>Front: {$data.lidar.front} mm</li>
	<li>Back: {$data.lidar.back} mm</li>
	<li>Left: {$data.lidar.left} mm</li>
	<li>Right: {$data.lidar.right} mm</li>
</ul>

<p>GPS Data</p>
<ul>
	<li>Coordinates: {$data.gps.coordinates}</li>
</ul>

<p>Motor Data</p>
<ul>
	<li>Left Motor Speed: {$data.motor.leftSpeed} RPM</li>
	<li>Right Motor Speed: {$data.motor.rightSpeed} RPM</li>
</ul>

<p>Gyro Data</p>
<ul>
	<li>X-Axis: {$data.gyro.xAxis}</li>
	<li>Y-Axis: {$data.gyro.yAxis}</li>
	<li>Z-Axis: {$data.gyro.zAxis}</li>
	<li>Acceleration: {$data.gyro.accel}</li>
</ul>

<p>Send your data here</p>
<div>
	<input placeholder="Enter topic name" bind:value={topic} />
	<textarea placeholder="Enter message" rows="10" bind:value={msg} />
	<button on:click={handleClick}>Send</button>
</div>

<!-- {/if} -->
<style>
	div {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		row-gap: 10px;
		max-width: 40vw;
	}
</style>
