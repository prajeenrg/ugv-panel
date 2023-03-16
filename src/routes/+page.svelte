<script lang="ts">
	import rover1 from '$lib/assets/rover1.jpg?webp&h=200&w=240&fit=cover&metadata';
	import rover2 from '$lib/assets/rover2.jpg?webp&h=200&w=240&fit=cover&metadata';
	import rover3 from '$lib/assets/rover3.jpg?webp&h=200&w=240&fit=cover&metadata';
	import rover4 from '$lib/assets/rover4.jpg?webp&h=200&w=240&fit=cover&metadata';

	let imgs = [rover1, rover2, rover3, rover4];
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="content">
	<h1>Welcome to MIT UGV Control Panel</h1>
	<div class="images">
		{#each imgs as img, i}
			<img src={img.src} width={img.width} height={img.height} alt="rover picture {i + 1}" />
		{/each}
	</div>
	<p>
		Unmanned Ground Vehicles (UGVs) are evolving quickly in recent years for both military and
		non-military uses, due to the rapid development of intelligence, sensor and vehicle control
		technologies. A vehicle that works while in contact with the ground and without a human operator
		is referred to as an unmanned ground vehicle (UGV). Any application where having a human
		operator present could be difficult, risky, or impossible can employ UGVs.
	</p>
	<p>
		Typically, a vehicle will include a collection of sensors to examine its surroundings and make
		judgments about how to operate either on its own or by relaying information to a human operator
		at a remote place who will teleoperate to manage the vehicle. Any UGV should ideally aim to
		perceive its surroundings using sensors, localise itself inside it using software algorithms,
		create a map of its surroundings if one does not already exist, plan its mobility and generate
		the motor commands required to follow a certain course. The driving system utilised, the
		machine's wheel or leg set and the feedback mechanism all have a big impact on these orders.
	</p>
</div>

<style>
	.content {
		padding: 4em;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	h1 {
		text-align: center;
	}

	.images {
		display: flex;
		justify-content: space-between;
		gap: 1em;
		padding: 1em;
	}

	@media only screen and (max-width: 760px) {
		.images {
			flex-direction: column;
		}
	}

	.images ~ p {
		padding: 1em;
		padding-bottom: 0em;
	}
</style>
