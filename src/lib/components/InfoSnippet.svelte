<script lang="ts">
	export let title = '';
	export let contents: [string, number][] = [];
</script>

<div class="infobox">
	<p>{title}</p>
	<div class="info">
		{#each contents as item, i (i)}
			<div>
				<p>{item[1]}</p>
				<p>{item[0]}</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.infobox {
		display: flex;
		width: 100%;
		flex-direction: column-reverse;
		padding: 8px;
		margin: 8px;
		gap: 8px;
		min-width: 400px;
		border-radius: 8px;
		text-align: center;
		border: 2px solid hsl(0, 0%, 30%);
		color: hsl(0, 0%, 80%);
		background-color: hsl(0, 0%, 15%);
		text-transform: uppercase;
	}

	.info {
		display: flex;
		gap: 8px;
		color: hsl(0, 0%, 60%);
	}

	.info div {
		display: inline;
		padding: 0.5em;
		width: 100%;
		font-size: 20px;
		background-color: hsl(0, 0%, 10%);
		border-radius: 4px;
		text-align: center;
	}

	.info p:last-child {
		font-size: 12px;
	}
</style>
