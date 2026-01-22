<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/state'

	const form = $derived(page.form as App.DiscountFormResult | null)
</script>

<form method="POST" use:enhance>
	<fieldset class="flex items-end" disabled={form?.success}>
		<label class="grid">
			<small>Discount code</small>
			<input
				name="discount"
				class="input font-mono uppercase"
				type="text"
				required
				value={form?.success ? form.code : ''}
				readonly={form?.success}
			/>
		</label>
		<button class="action" type="submit">Apply</button>
	</fieldset>

	{#if form?.success}
		<p class="text-sm text-[green]">{form.message}</p>
	{:else if form?.message}
		<p class="text-sm text-[red]">{form.message}</p>
	{/if}
</form>
