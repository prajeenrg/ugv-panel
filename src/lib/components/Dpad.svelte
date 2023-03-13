<script lang="ts">
	import { client, Constants } from '../../routes/mqtthelper';

	interface Control {
		id: number;
		label: string;
	}

	let controls: Control[] = [
		{
			id: 1,
			label: 'NWD'
		},
		{
			id: 2,
			label: 'ND'
		},
		{
			id: 3,
			label: 'NED'
		},
		{
			id: 4,
			label: 'WD'
		},
		{
			id: 5,
			label: 'STOP'
		},
		{
			id: 6,
			label: 'ED'
		},
		{
			id: 7,
			label: 'SWD'
		},
		{
			id: 8,
			label: 'SD'
		},
		{
			id: 9,
			label: 'SED'
		},
		{
			id: 10,
			label: 'CW'
		},
		{
			id: 11,
			label: 'CCW'
		}
	];

	const sendControl = async (control: Control) => {
		await client.publish(Constants.TOPIC_CONTROL, JSON.stringify(control));
		console.info(`Control event ${control.label} has been sent.`);
	};

	const onKeyDown = (event: KeyboardEvent) => {
		switch (event.key) {
			case 'w':
				sendControl(controls[1]);
				break;
			case 'x':
				sendControl(controls[7]);
				break;
			case 'a':
				sendControl(controls[3]);
				break;
			case 'd':
				sendControl(controls[5]);
				break;
			case 'q':
				sendControl(controls[0]);
				break;
			case 'e':
				sendControl(controls[2]);
				break;
			case 'z':
				sendControl(controls[6]);
				break;
			case 'c':
				sendControl(controls[8]);
				break;
			case 's':
				sendControl(controls[4]);
				break;
			case ',':
				sendControl(controls[10]);
				break;
			case '.':
				sendControl(controls[9]);
				break;
		}
	};
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="content">
	{#each controls as control (control.id)}
		<button on:click={() => sendControl(control)}>{control.label}</button>
	{/each}
</div>

<style>
	.content {
		padding: 1em;
		display: grid;
		place-items: center;
		grid-template-columns: 7em 7em 7em;
		grid-template-rows: 7em 7em 7em;
	}

	button {
		width: 5em;
		height: 5em;
		margin: 1em;
		background: rgb(255, 255, 255);
		border: 2px solid rgb(122, 122, 122);
		border-radius: 8px;
		outline: none;
		font-weight: bold;
		font-size: 18px;
	}

	button:active {
		background: royalblue;
		transition: cubic-bezier();
		border: 2px solid rgb(0, 0, 0);
		box-shadow: 0 0 2px 0 rgb(0, 0, 0);
	}
</style>
