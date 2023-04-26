<script lang="ts">
	import rover1 from '$lib/assets/rover1.jpg?webp&h=200&w=200&fit=cover&metadata';
	import rover2 from '$lib/assets/rover2.jpg?webp&h=200&w=200&fit=cover&metadata';
	import rover3 from '$lib/assets/rover3.jpg?webp&h=200&w=200&fit=cover&metadata';
	import rover4 from '$lib/assets/rover4.jpg?webp&h=200&w=200&fit=cover&metadata';
	import Card from '$lib/components/Card.svelte';

	type Content = {
		id: number;
		img: any;
		heading: string;
		text: string;
		alt: string;
	};

	let contents: Content[] = [
		{
			id: 1,
			img: rover1,
			heading: 'Collision Avoidance',
			alt: 'Feature 1',
			text: 'Built with four time of flight sensors made by ST electronics to detect obstacles faster. These sensors have improved accuracy and range in outdoor environments when compared to ultrasonic sensors.'
		},
		{
			id: 2,
			img: rover2,
			heading: 'GPRS',
			alt: 'Feature 2',
			text: 'Integrated with GPRS module for remote operation of UGV. GPRS also enables better throughput along with range for message queues.'
		},
		{
			id: 3,
			img: rover3,
			heading: 'GPS',
			alt: 'Feature 3',
			text: 'Incorporated with GPS module to get exact position and for remote tracking the UGV when not in Line of Sight (LOS).'
		},
		{
			id: 4,
			img: rover4,
			heading: 'Rechargeable',
			alt: 'Feature 4',
			text: 'Lithium-ion battery powers the UGV for longer operating time. Such batteries have higher capacity to weight ratio.'
		}
	];
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="hero">
	<p>RhoVar: The UGV Prototype</p>
	<p>
		RhoVar is an Unmanned Ground Vehicle prototype capable of carrying out remote operation and environment monitoring.
	</p>
</div>
<div class="feats">
	{#each contents as c (c.id)}
		<Card heading={c.heading} desc={c.text} src={c.img.src} />
	{/each}
</div>

<style>
	.hero {
		width: 100%;
		height: 60vh;
		padding: 2em;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		gap: 1em;
		background: linear-gradient(45deg, var(--main-grad-start), var(--main-grad-end));
		backdrop-filter: blur(6px);
		color: hsl(0, 0%, 100%);
		text-shadow: 0px 2px 10px hsla(0, 0%, 0%, 0.2);
		font-size: 18px;
		text-align: center;
	}

	.hero :first-child {
		font-size: 40px;
		font-weight: 700;
	}

	.feats {
		padding: 4em;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5em;
		align-items: center;
		flex-direction: column;
	}

	@media only screen and (max-width: 900px) {
		.feats {
			grid-template-columns: 1fr;
		}
	}
</style>
