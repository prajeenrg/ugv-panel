<script lang="ts">
	import { page } from '$app/stores';
	export const appTitle = 'MIT UGV Control Panel';

	export const navlinks = [
		{
			id: 1,
			name: 'Home',
			href: '/'
		},
		{
			id: 2,
			name: 'Control',
			href: '/control'
		}
	];
</script>

<nav>
	<p>{appTitle}</p>
	<ul>
		{#each navlinks as navlink (navlink.id)}
			<li>
				<a
					href={navlink.href}
					style:color={$page.url.pathname == navlink.href
						? 'var(--nav-item-active)'
						: 'var(--nav-item-inactive)'}>{navlink.name}</a
				>
			</li>
		{/each}
	</ul>
</nav>

<slot />

<style>
	:root {
		--bg-main-color: #430EE1;
		--nav-item-active: hsla(0, 0%, 100%, 0.87);
		--nav-item-inactive: hsla(0, 0%, 100%, 0.6);
		--text-primary-color: hsla(0, 0%, 100%, 1);
	}

	:global(*) {
		margin: 0;
		font-family: 'Space Grotesk', sans-serif;
		box-sizing: border-box;
	}

	:global(body) {
		margin-top: 84px;
	}

	nav {
		position: fixed;
		top: 0;
		width: 100%;
		height: 72px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--bg-main-color);
		flex-direction: row;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
		padding: 1em;
		box-sizing: border-box;
		color: var(--text-primary-color);
		font-weight: bold;
		font-size: 18px;
	}

	nav li {
		display: inline;
	}

	nav a {
		font-weight: normal;
		font-size: 16px;
		text-decoration: none;
		padding: 0 0.5em 0 0.5em;
	}
</style>
