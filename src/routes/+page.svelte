<script lang="ts">
	import rover1 from '$lib/assets/rover1.jpg?webp&h=200&w=240&fit=cover&metadata';
	import rover2 from '$lib/assets/rover2.jpg?webp&h=200&w=240&fit=cover&metadata';
	import rover3 from '$lib/assets/rover3.jpg?webp&h=200&w=240&fit=cover&metadata';
	import rover4 from '$lib/assets/rover4.jpg?webp&h=200&w=240&fit=cover&metadata';
	import { text } from 'svelte/internal';

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
			heading: 'Feature 1',
			alt: 'Feature 1',
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus egestas sed sed risus pretium. Enim sed faucibus turpis in eu mi bibendum neque egestas. Nascetur ridiculus mus mauris vitae ultricies leo. Quam vulputate dignissim suspendisse in est ante. Volutpat odio facilisis mauris sit amet massa vitae tortor condimentum. Nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Urna cursus eget nunc scelerisque viverra mauris. Eget arcu dictum varius duis at consectetur lorem donec massa. Eu facilisis sed odio morbi quis commodo odio aenean. Aenean sed adipiscing diam donec adipiscing tristique risus nec feugiat.'
		},
		{
			id: 2,
			img: rover2,
			heading: 'Feature 2',
			alt: 'Feature 2',
			text: 'Velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus. Sodales neque sodales ut etiam sit amet. Dui nunc mattis enim ut tellus elementum. At tellus at urna condimentum mattis pellentesque. Ante in nibh mauris cursus. Ligula ullamcorper malesuada proin libero nunc consequat. Lobortis mattis aliquam faucibus purus in massa tempor nec feugiat. Fames ac turpis egestas integer eget aliquet nibh praesent tristique. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Amet justo donec enim diam. Vel eros donec ac odio tempor orci. Vitae tempus quam pellentesque nec nam.'
		},
		{
			id: 3,
			img: rover3,
			heading: 'Feature 3',
			alt: 'Feature 3',
			text: 'Sed lectus vestibulum mattis ullamcorper velit. A diam sollicitudin tempor id eu nisl nunc mi. Lectus urna duis convallis convallis tellus id interdum velit. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. Donec ac odio tempor orci dapibus ultrices in iaculis nunc. Turpis egestas sed tempus urna et pharetra. Sed risus ultricies tristique nulla aliquet. Mi eget mauris pharetra et ultrices neque ornare aenean. Turpis egestas sed tempus urna et pharetra pharetra massa. Vulputate enim nulla aliquet porttitor lacus luctus accumsan. Feugiat scelerisque varius morbi enim. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Purus in mollis nunc sed id semper risus. Venenatis cras sed felis eget velit aliquet sagittis id consectetur.'
		},
		{
			id: 4,
			img: rover4,
			heading: 'Feature 4',
			alt: 'Feature 4',
			text: 'Sed enim ut sem viverra aliquet eget sit amet. Odio euismod lacinia at quis risus sed vulputate. At lectus urna duis convallis convallis tellus id interdum. Condimentum vitae sapien pellentesque habitant morbi. Leo vel orci porta non pulvinar neque laoreet suspendisse interdum. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor. Ultricies integer quis auctor elit sed. Vivamus at augue eget arcu dictum varius. Nisi est sit amet facilisis magna etiam tempor. Ante in nibh mauris cursus. Commodo viverra maecenas accumsan lacus vel facilisis.'
		}
	];
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="hero">
	<p>The MIT Rover is here!!!!!</p>
	<p>
		MIT Rover is an Unmanned Ground Vehicle capable of remote operation and environment monitoring.
	</p>
</div>
<h1>Features</h1>
<div class="content">
	{#each contents as c (c.id)}
		<div>
			<img src={c.img.src} width={c.img.width} height={c.img.height} alt={c.alt} />
			<div>
				<h3>{c.heading}</h3>
				<p>{c.text}</p>
			</div>
		</div>
	{/each}
</div>

<style>
	.hero {
		width: 100%;
		height: 40vh;
		padding: 2em;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		gap: 4px;
		background: linear-gradient(15deg, hsl(46, 95%, 56%), hsl(350, 97%, 65%));
		backdrop-filter: blur(6px);
		color: hsl(0, 0%, 100%);
		text-shadow: 0px 2px 10px hsla(0, 0%, 0%, 0.2);
		font-size: 18px;
		text-align: center;
	}

	h1 {
		text-align: center;
		padding-top: 1em;
		text-decoration: dashed underline;
		font-size: 36px;
		font-weight: 600;
	}

	.hero :first-child {
		font-size: 40px;
		font-weight: 700;
	}

	.content {
		padding: 4em;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	@media only screen and (min-width: 600px) {
		.content > div {
			display: flex;
			width: 100%;
			height: 30vh;
			flex-direction: row;
			justify-content: space-evenly;
			align-items: center;
			gap: 4em;
		}
	}
</style>
