<script lang="ts">
	import { JoyStick, StickStatus } from './joy';
	import { client, Constants } from '../../routes/mqtthelper';
	import { onMount } from 'svelte';

	let motorControl = {
		left: 0,
		right: 0,
		rev: false,
		cleft: false,
		cfront: false,
		cback: false,
		cright: false
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
			const x = Math.ceil(2.55 * Math.abs(data.x));
			const y = Math.ceil(2.55 * Math.abs(data.y));

			switch (data.cardinalDirection) {
				case 'N':
					motorControl.left = y;
					motorControl.right = y;
					motorControl.rev = false;
					motorControl.cleft = false;
					motorControl.cfront = true;
					motorControl.cback = false;
					motorControl.cright = false;
					break;
				case 'S':
					motorControl.left = y;
					motorControl.right = y;
					motorControl.rev = true;
					motorControl.cleft = false;
					motorControl.cfront = false;
					motorControl.cback = true;
					motorControl.cright = false;
					break;
				case 'E':
					motorControl.left = x;
					motorControl.right = 0;
					motorControl.rev = false;
					motorControl.cleft = false;
					motorControl.cfront = false;
					motorControl.cback = false;
					motorControl.cright = true;
					break;
				case 'W':
					motorControl.left = 0;
					motorControl.right = x;
					motorControl.rev = false;
					motorControl.cleft = true;
					motorControl.cfront = false;
					motorControl.cback = false;
					motorControl.cright = false;
					break;
				case 'NE':
					motorControl.left = x;
					motorControl.right = y;
					motorControl.rev = false;
					motorControl.cleft = false;
					motorControl.cfront = true;
					motorControl.cback = false;
					motorControl.cright = true;
					break;
				case 'NW':
					motorControl.left = y;
					motorControl.right = x;
					motorControl.rev = false;
					motorControl.cleft = true;
					motorControl.cfront = true;
					motorControl.cback = false;
					motorControl.cright = false;
					break;
				case 'SW':
					motorControl.left = y;
					motorControl.right = x;
					motorControl.rev = true;
					motorControl.cleft = true;
					motorControl.cfront = false;
					motorControl.cback = true;
					motorControl.cright = false;
					break;
				case 'SE':
					motorControl.left = x;
					motorControl.right = y;
					motorControl.rev = true;
					motorControl.cleft = false;
					motorControl.cfront = false;
					motorControl.cback = true;
					motorControl.cright = true;
					break;
				default:
					motorControl.left = 0;
					motorControl.right = 0;
					motorControl.rev = false;
					motorControl.cleft = false;
					motorControl.cfront = false;
					motorControl.cback = false;
					motorControl.cright = false;
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
