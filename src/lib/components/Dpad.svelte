<script lang="ts">
	import { client, Constants } from '../../routes/mqtthelper';

	interface Control {
		id: number;
		label: string;
	}

	let controls: Control[] = [
		{
			id: 1,
			label: '\u2196'
		},
		{
			id: 2,
			label: '\u2191'
		},
		{
			id: 3,
			label: '\u2197'
		},
		{
			id: 4,
			label: '\u2190'
		},
		{
			id: 5,
			label: '\u25A0'
		},
		{
			id: 6,
			label: '\u2192'
		},
		{
			id: 7,
			label: '\u2199'
		},
		{
			id: 8,
			label: '\u2193'
		},
		{
			id: 9,
			label: '\u2198'
		},
		{
			id: 10,
			label: '\u21BB'
		},
		{
			id: 11,
			label: '\u21BA'
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

	export let isConnActive = true;
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
		height: 100%;
		width: 100%;
		padding: 2em;
		display: grid;
		place-items: center;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 16px;
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
		width: 100%;
		height: 100%;
		font-weight: bold;
		text-align: center;
		font-size: 18px;
		vertical-align: middle;
		border-radius: 8px;
		font-size: 24pt;
		box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
		background-color: hsl(0, 0%, 90%);
		color: hsl(0, 0%, 40%);
		transition: cubic-bezier();
	}

	@media (hover: hover) {
		.button:hover {
			background-color: hsl(0, 0%, 98%);
			color: hsl(0, 0%, 25%);
			transition: cubic-bezier();
		}
	}

	.button:active {
		color: hsl(0, 0%, 90%);
		background-color: hsl(0, 0%, 20%);
	}
</style>
