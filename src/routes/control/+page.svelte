<script lang="ts">
	import { setupClient, disconnectClient } from '../mqtthelper';
	import { client, status, Constants, accel, gps, gyro, lidar, network, dht, velocity, angle } from '../mqtthelper';
	import { onMount, onDestroy } from 'svelte';
	import Dpad from '$lib/components/Dpad.svelte';
	import InfoSnippet from '$lib/components/InfoSnippet.svelte';
	import { get } from 'svelte/store';
	import { page } from '$app/stores';
	import {browser} from "$app/environment";

	const searchParams = browser && $page.url.searchParams

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
			pingCheck = setTimeout(() => connection = (get(status) == rand), 1500);
		}, 10000);
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
{#if searchParams && searchParams.get('debug') == 'true' || connection}
	<div class="infobox">
		<InfoSnippet title="lidar" round={false} units={['(mm)','(mm)','(mm)','(mm)']} contents={Object.entries($lidar)} />
		<InfoSnippet title="dht" units={['(°C)','(%)']} contents={Object.entries($dht)} />
		<InfoSnippet title="Network" units={['(dBm)','','','']} row={true} contents={Object.entries($network)} />
	</div>
	<div class="mid">
		<iframe
			title="map"
			src="https://maps.google.com/maps?hl=en&q={$gps.latitude},{$gps.longitude}&t=k&z=20&ie=UTF8&iwloc=B&output=embed"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		/>
		<InfoSnippet title="gyroscope" units={['(DPS)','(DPS)','(DPS)']} contents={Object.entries($gyro)} />
		<InfoSnippet title="angle" units={['(deg)','(deg)','(deg)']} contents={Object.entries($angle)} />
	</div>
	<div class="dpadbox">
		<InfoSnippet title="Accelerometer" units={['(cm/s²)','(cm/s²)','(cm/s²)']} contents={Object.entries($accel)} />
		<InfoSnippet title="Velocity" units={['(cm/s)','(cm/s)','(cm/s)']} contents={Object.entries($velocity)} />
		<Dpad />
	</div>
{:else}
	<div class="loader">
		<svg version="1.1" id="L1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
			<circle fill="none" stroke="#F44336" stroke-width="6" stroke-miterlimit="15" stroke-dasharray="14.2472,14.2472" cx="50" cy="50" r="47" >
			  <animateTransform 
				 attributeName="transform" 
				 attributeType="XML" 
				 type="rotate"
				 dur="5s" 
				 from="0 50 50"
				 to="360 50 50" 
				 repeatCount="indefinite" />
		  </circle>
		  <circle fill="none" stroke="#F44336" stroke-width="1" stroke-miterlimit="10" stroke-dasharray="10,10" cx="50" cy="50" r="39">
			  <animateTransform 
				 attributeName="transform" 
				 attributeType="XML" 
				 type="rotate"
				 dur="5s" 
				 from="0 50 50"
				 to="-360 50 50" 
				 repeatCount="indefinite" />
		  </circle>
		  <g fill="#D32F2F">
		  <rect x="30" y="35" width="5" height="30">
			<animateTransform 
			   attributeName="transform" 
			   dur="1s" 
			   type="translate" 
			   values="0 5 ; 0 -5; 0 5" 
			   repeatCount="indefinite" 
			   begin="0.1"/>
		  </rect>
		  <rect x="40" y="35" width="5" height="30" >
			<animateTransform 
			   attributeName="transform" 
			   dur="1s" 
			   type="translate" 
			   values="0 5 ; 0 -5; 0 5" 
			   repeatCount="indefinite" 
			   begin="0.2"/>
		  </rect>
		  <rect x="50" y="35" width="5" height="30" >
			<animateTransform 
			   attributeName="transform" 
			   dur="1s" 
			   type="translate" 
			   values="0 5 ; 0 -5; 0 5" 
			   repeatCount="indefinite" 
			   begin="0.3"/>
		  </rect>
		  <rect x="60" y="35" width="5" height="30" >
			<animateTransform 
			   attributeName="transform" 
			   dur="1s" 
			   type="translate" 
			   values="0 5 ; 0 -5; 0 5"  
			   repeatCount="indefinite" 
			   begin="0.4"/>
		  </rect>
		  <rect x="70" y="35" width="5" height="30" >
			<animateTransform 
			   attributeName="transform" 
			   dur="1s" 
			   type="translate" 
			   values="0 5 ; 0 -5; 0 5" 
			   repeatCount="indefinite" 
			   begin="0.5"/>
		  </rect>
		  </g>
		</svg>
		<p style="font-weight: 700; font-size: 24px;">Connection Procedure Initiated</p>
		<p>Please wait until the connection is established</p>
	</div>
{/if}
</div>

<style>
	.content {
		height: 80vh;
		width: 100vw;
		display: grid;
		padding: 1em;
		justify-items: center;
		align-items: center;
		align-items: start;
	}

	.loader {
		display: flex;
		justify-content: space-evenly;
		height: 40vh;
		width: 100vw;
		flex-direction: column;
		place-items: center;
		align-items: center;
	}

	#L1 {
		height: 10em;
		width: 10em;
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
		height: 60%;
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
