<script lang="ts">
	import '@fontsource/ibm-plex-sans';

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
			title: 'Info',
			url: '/info'
		},
		{
			id: 3,
			title: 'Control',
			url: '/control'
		}
	];
</script>

<nav class="navbar">
	<a href="#">MIT UGV Control Panel</a>
	<div class="navitems">
		<ul>
			{#each items as item (item.id)}
				<li><a href={item.url}>{item.title}</a></li>
			{/each}
		</ul>
	</div>
</nav>

<style>
	.navbar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: crimson;
		padding: 1em;
		min-height: 1em;
		font-family: 'IBM Plex Sans', sans-serif;
	}

	.navbar > a {
		color: white;
		text-decoration: none;
		font-weight: 800;
	}

	.navitems > ul {
		display: flex;
		flex-direction: row;
		list-style-type: none;
	}

	.navitems > ul > li {
		padding-left: 1em;
		padding-right: 1em;
	}

	.navitems > ul > li > a {
		color: gainsboro;
		text-decoration: none;
		font-weight: 600;
	}

	.navitems > ul > li > a:hover {
		color: white;
		transition: cubic-bezier();
	}

	li {
		padding: 4px;
	}
</style>
