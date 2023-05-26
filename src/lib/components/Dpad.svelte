<script lang="ts">
	import { JoyStick, StickStatus } from './joy';
	import { client, Constants, motor } from '../../routes/mqtthelper';
	import { onMount } from 'svelte';

	let motorControl = {
		left: 0,
		right: 0,
		rev: false
	}

	onMount(() => {
		let options = {
			internalFillColor: "#440055",
			internalLineWidth: 4,
			externalStrokeColor: "#990077",
			externalLineWidth: 8,
			height: 300,
			width: 300
		}

		let processStickData = (data: typeof StickStatus) => {
			switch (data.cardinalDirection) {
				case 'N':
					motorControl.left = 255;
					motorControl.right = 255;
					motorControl.rev = false;
					break;
				case 'S':
					motorControl.left = 255;
					motorControl.right = 255;
					motorControl.rev = true;
					break;
				case 'E':
					motorControl.left = 255;
					motorControl.right = 0;
					motorControl.rev = false;
					break;
				case 'W':
					motorControl.left = 0;
					motorControl.right = 255;
					motorControl.rev = false;
					break;
				case 'NE':
					motorControl.left = 255;
					motorControl.right = 128;
					motorControl.rev = false;
					break;
				case 'NW':
					motorControl.left = 128;
					motorControl.right = 255;
					motorControl.rev = false;
					break;
				case 'SW':
					motorControl.left = 128;
					motorControl.right = 255;
					motorControl.rev = true;
					break;
				case 'SE':
					motorControl.left = 255;
					motorControl.right = 128;
					motorControl.rev = true;
					break;
				default:
					motorControl.left = 0;
					motorControl.right = 0;
					motorControl.rev = false;
			}
			console.info(motorControl);
			client.publish(Constants.TOPIC_CONTROL, JSON.stringify(motorControl));
		}
		let joystick = new JoyStick('joystick', options, processStickData);
	})

	client.publish(Constants.TOPIC_CONTROL, JSON.stringify(motorControl));

</script>

<div id="joystick"></div>

<style>
	:root {
		--status-active: hsl(120, 80%, 55%);
		--status-inactive: hsl(0, 80%, 55%);
	}

	#joystick {
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
	}
</style>
