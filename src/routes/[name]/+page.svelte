<script lang="ts">
	import { page } from '$app/state'
	import Everything from '$ui/everything.svelte'

	let name = page.params.name
</script>

<header class="text-center">
	<h1>Howdy, <u>{name}</u>!</h1>
</header>

<Everything />

<style>
	u {
		text-decoration: none;
		border-bottom: 1px solid;
		padding-inline: 1ch;
	}
</style>
