<script lang="ts">
	import helper from "../mqtthelper";
    import { onMount, onDestroy } from "svelte";

    onMount(helper.setupClient);
    
    onDestroy(() => {
        helper.client.end();
        console.info("Disconnected MQTT Client from Broker");
    });

    const client = helper.client;

    $: data = helper.data;
    $: isConnected = client.connected;

    let topic = "";
    let msg = "";

    let handleClick = () => helper.publish(topic, msg);
</script>

{#if isConnected}
    <p>Waiting for the MQTT Client to establish connection...</p>
{:else}
    <p>LiDAR Data</p>
    <ul>
        <li>Front: {data.lidar.front} mm</li>
        <li>Back: {data.lidar.back} mm</li>
        <li>Left: {data.lidar.left} mm</li>
        <li>Right: {data.lidar.right} mm</li>
    </ul>

    <p>GPS Data</p>
    <ul>
        <li>Coordinates: {data.gps.coordinates}</li>
    </ul>

    <p>Motor Data</p>
    <ul>
        <li>Left Motor Speed: {data.motor.leftSpeed} RPM</li>
        <li>Right Motor Speed: {data.motor.rightSpeed} RPM</li>
    </ul>

    <p>Gyro Data</p>
    <ul>
        <li>X-Axis: {data.gyro.xAxis}</li>
        <li>Y-Axis: {data.gyro.yAxis}</li>
        <li>Z-Axis: {data.gyro.zAxis}</li>
        <li>Acceleration: {data.gyro.accel}</li>
    </ul>

    <p>Send your data here</p>
    <input bind:value={topic}>
    <input bind:value={msg}>
    <button on:click={handleClick}>Send</button>
{/if}