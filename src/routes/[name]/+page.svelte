<script lang="ts">
	import { page } from '$app/state'
	import Everything from '$ui/everything.svelte'

	let name = page.params.name
</script>

<header class="text-center">
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
