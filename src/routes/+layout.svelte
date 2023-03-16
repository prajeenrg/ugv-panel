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
				<a href={navlink.href} class:active={$page.url.pathname == navlink.href}>{navlink.name}</a>
			</li>
		{/each}
	</ul>
</nav>

<slot />

<style>
	:root {
		--bg-main-color: #108bf5;
		--nav-item-active: #e3f3ff;
		--nav-item-inactive: #8fccff;
		--text-primary-color: #ffffff;
	}

	:global(*) {
		margin: 0;
		font-family: 'Poppins', 'Helvetica', sans-serif;
		box-sizing: border-box;
	}

	:global(body) {
		margin-top: 72px;
	}

	nav {
		position: fixed;
		top: 0;
		width: 100%;
		min-height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--bg-main-color);
		flex-direction: row;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
		padding: 1em;
		box-sizing: border-box;
	}

	nav p {
		color: var(--text-primary-color);
		font-weight: bold;
	}

	nav li {
		display: inline;
	}

	nav a {
		text-decoration: none;
		color: var(--nav-item-inactive);
		padding: 0 0.5em 0 0.5em;
	}

	nav .active {
		color: var(--nav-item-active);
	}
</style>
