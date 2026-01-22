<script lang="ts">
	import { browser } from '$app/environment'
	import { enhance } from '$app/forms'
	import { page } from '$app/state'
	import { Confetti } from 'svelte-confetti'

	const form = $derived(page.form as App.DiscountFormResult | null)

	$effect(() => {
		if (browser && form?.success) {
			const key = `discount:${form.code}`

			if (!localStorage.hasItem(key)) {
				localStorage.setItem(key, form.timestamp.toString())
			}
		}
	})
</script>

<form action="?/discount" method="POST" use:enhance>
	<fieldset class="flex items-end" disabled={form?.success}>
		<label class="relative grid">
			<small>Discount code</small>
			<input
				name="discount"
				class="input text-center font-mono uppercase"
				type="text"
				required
				value={form?.success ? form.code : ''}
				readonly={form?.success}
			/>

			{#if form?.success}
				<div class="absolute top-1/2 left-1/2 -translate-1/2">
					<Confetti />
				</div>
			{/if}
		</label>
		<button class="action" type="submit">Apply</button>
	</fieldset>

	{#if form?.success}
		<p class="text-center text-xs text-[green]">{form.message}</p>
	{:else if form?.message}
		<p class="text-center text-xs text-[red]">{form.message}</p>
	{/if}
</form>
