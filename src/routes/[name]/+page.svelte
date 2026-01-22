<script lang="ts">
	import { page } from '$app/state'
	import Everything from '$ui/everything.svelte'

	let name = page.params.name
</script>

<svelte:head>
	<title>{name}, let's build something great together | nuotsu.dev</title>
	<link rel="preload" href="/Biro_Script_reduced.otf" as="font" type="font/otf" />
	<link rel="preload" href="/Biro_Script_reduced.ttf" as="font" type="font/ttf" />
</svelte:head>

<header class="px-ch text-center">
	<h1 class="text-xl">Howdy, <u class="relative font-handwritten leading-none">{name}</u>!</h1>
</header>

<Everything />

<style>
	u {
		pointer-events: none;
		user-select: none;
		display: inline-block;
		text-decoration: none;
		padding-inline: 2ch;
		font-size: 1.5em;

		&::before {
			content: '';
			position: absolute;
			inset: 0 0 0;
			border-bottom: 1px solid;
		}
	}
</style>
