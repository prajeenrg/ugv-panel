<script lang="ts">
	import { page } from '$app/stores';
	export const appTitle = 'RhoVar';

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

<header>
	<div class="color-strip" />
	<nav>
		<div class="title">
			<img src="/logo.png" class="logo" alt="rover" />
			<p>{appTitle}</p>
		</div>
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
</header>

<slot />

<style>
	:root {
		--bg-main-color: hsl(0, 0%, 100%);
		--nav-item-active: hsla(0, 0%, 0%, 0.87);
		--nav-item-inactive: hsla(0, 0%, 0%, 0.4);
		--nav-item-disabled: hsla(0, 0%, 0%, 0.15);
		--text-primary-color: hsla(0, 0%, 0%, 1);
		--main-grad-start: hsl(240deg 66% 56%);
		--main-grad-end: hsl(158deg 96% 59%);
	}

	:global(*) {
		margin: 0;
		font-family: 'Poppins', sans-serif;
		box-sizing: border-box;
	}

	:global(body) {
		margin-top: 84px;
	}

	:global(body::-webkit-scrollbar) {
		display: none;
	}

	header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 5;
	}

	.color-strip {
		height: 16px;
		z-index: 10;
		background: linear-gradient(45deg, var(--main-grad-start), var(--main-grad-end));
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
	}

	.logo {
		height: 56px;
		padding: 4px;
		margin-right: 8px;
	}

	nav {
		padding: 1em 2em;
		height: 72px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--bg-main-color);
		flex-direction: row;
		box-shadow: 0 0px 8px rgba(0, 0, 0, 0.1);
		border-top: 1px solid var(--nav-item-disabled);
		border-bottom: 2px solid var(--nav-item-disabled);
		color: var(--text-primary-color);
		font-weight: 700;
		font-size: 20px;
	}

	nav li {
		display: inline;
	}

	nav a {
		font-weight: 600;
		font-size: 16px;
		text-decoration: none;
		padding: 0 0.4em;
	}
</style>
