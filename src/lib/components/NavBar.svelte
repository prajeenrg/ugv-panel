<script lang="ts">
	interface Item {
		id: number;
		title: string;
		url: string;
	}

	export let items: Item[] = [
		{
			id: 1,
			title: 'Home',
			url: '/'
		},
		{
			id: 2,
			title: 'Control',
			url: '/control'
		}
	];

	export let activeId: number = 0;
</script>

<nav class="navbar">
	<a href="#" class="title">MIT UGV Control Panel</a>
	<div class="navitems">
		<ul>
			{#each items as item (item.id)}
				{#if activeId == item.id}
					<li><a class="active" href={item.url}>{item.title}</a></li>
				{:else}
					<li><a class="inactive" href={item.url}>{item.title}</a></li>
				{/if}
			{/each}
		</ul>
	</div>
</nav>

<style>
	:root {
		--bg-main-color: #108bf5;
		--nav-item-active: #e3f3ff;
		--nav-item-inactive: #8fccff;
		--text-primary-color: #ffffff;
	}
	.navbar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: var(--bg-main-color);
		padding: 1em;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
		min-height: 1em;
	}

	.title {
		color: var(--text-primary-color);
		text-decoration: none;
		font-weight: bold;
	}

	.navitems > ul {
		display: flex;
		flex-direction: row;
		list-style-type: none;
	}

	.inactive {
		color: var(--nav-item-inactive);
		text-decoration: none;
		font-weight: normal;
	}

	.active {
		color: var(--nav-item-active);
		text-decoration: none;
		font-weight: normal;
	}

	.inactive:hover {
		color: var(--nav-item-active);
		transition: cubic-bezier();
	}

	.inactive,
	.active {
		padding: 0 0.5em 0 0.5em;
	}
</style>
