<script lang="ts">
	import './app.css'

	let { children } = $props()
</script>

<svelte:head>
	<title>Let's build something great together | nuotsu.dev</title>
	<meta name="description" content="Shall we collaborate? Get your quote now!" />

	<link rel="icon" href="https://fav.farm/🤑" />
</svelte:head>

<main class="flex min-h-dvh flex-col gap-ch p-ch">{@render children()}</main>

<style>
	main {
		padding-bottom: max(1ch, env(safe-area-inset-bottom));
	}
</style>
