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

	export let isConnActive: boolean;
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="content">
	{#each controls as control (control.id)}
		<div class="button" on:keydown={() => {}} on:click={() => sendControl(control)}>
			{control.label}
		</div>
	{/each}
	<div
		class="status"
		style:background={isConnActive ? 'var(--status-active)' : 'var(--status-inactive)'}
	/>
</div>

<style>
	:root {
		--status-active: hsl(120, 80%, 55%);
		--status-inactive: hsl(0, 80%, 55%);
	}
	.content {
		padding: 1em;
		display: grid;
		place-items: center;
		grid-template-columns: 1fr 1fr 1fr;
		row-gap: 8px;
		column-gap: 8px;
	}

	.status {
		width: 100%;
		height: 100%;
		transition: cubic-bezier();
		border: 2px solid rgba(0, 0, 0, 0.15);
		border-radius: 8px;
	}

	.button {
		display: grid;
		place-items: center;
		width: 100px;
		height: 100px;
		font-weight: bold;
		text-align: center;
		color: azure;
		font-size: 18px;
		vertical-align: middle;
		border-radius: 8px;
		background-color: hsl(0, 0%, 15%);
		color: hsl(0, 0%, 60%);
		transition: cubic-bezier();
	}

	.button:hover {
		background-color: hsl(0, 0%, 10%);
		color: hsl(0, 0%, 75%);
		transition: cubic-bezier();
	}

	.button:active {
		color: hsl(0, 0%, 90%);
		background-color: hsl(0, 0%, 20%);
	}
</style>
