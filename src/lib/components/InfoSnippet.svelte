<script lang="ts">
	export let title = '';
	export let contents: [string, string | number][] = [];
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
	:root {
		--info-bar-bg: hsl(0deg, 0%, 100%);
		--info-box-bg: hsl(0deg, 0%, 92%);
		--info-bar-text-color: hsl(0deg, 0%, 35%);
		--info-box-text-color: hsl(0deg, 0%, 5%);
	}
	.infobox {
		display: flex;
		width: 100%;
		flex-direction: column-reverse;
		padding: 8px;
		margin: 8px;
		gap: 8px;
		min-width: 400px;
		text-align: center;
		border-radius: 0.5em;
		box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
		color: var(--info-bar-text-color);
		background-color: var(--info-bar-bg);
		text-transform: uppercase;
	}

	.info {
		display: flex;
		gap: 8px;
		color: var(--info-bar-text-color);
	}

	.info div {
		display: inline;
		padding: 0.5em;
		width: 100%;
		font-size: 20px;
		background-color: var(--info-box-bg);
		border-radius: 4px;
		text-align: center;
	}

	.info p:last-child {
		font-size: 12px;
	}
</style>
