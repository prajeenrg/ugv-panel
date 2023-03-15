<script lang="ts">
	import { client, data, setupClient, disconnectClient, Constants } from '../mqtthelper';
	import { onMount, onDestroy } from 'svelte';
	import Dpad from '$lib/components/Dpad.svelte';

	onMount(setupClient);

	onDestroy(disconnectClient);
</script>

<svelte:head>
	<title>Control Panel</title>
</svelte:head>

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
