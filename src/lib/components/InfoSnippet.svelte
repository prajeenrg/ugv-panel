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
				{item[0]}
			</div>
		{/each}
	</div>
</div>

<style>
	.infobox {
		display: flex;
		width: 100%;
		flex-direction: column-reverse;
		align-items: center;
		padding: 8px;
		margin: 8px;
		border-radius: 4px;
		border: 2px solid hsl(0, 0%, 70%);
	}

	.info {
		display: flex;
		justify-content: space-around;
		gap: 1em;
	}

	.info div {
		display: inline;
		padding: 0.5em;
		font-size: 20px;
		border-radius: 4px;
		border: 2px solid hsl(0, 0%, 70%);
		text-align: center;
	}
</style>
