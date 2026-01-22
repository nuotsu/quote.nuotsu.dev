<script lang="ts">
	import { browser } from '$app/environment'
	import { enhance } from '$app/forms'
	import { page } from '$app/state'
	import { Confetti } from 'svelte-confetti'

	const form = $derived(page.form as App.DiscountFormResult | null)

	$effect(() => {
		if (browser && form?.success) {
			const key = `discount:${form.code}`

			if (!localStorage.getItem(key)) {
				localStorage.setItem(key, form.timestamp.toString())
			}
		}
	})
</script>

<form
	class="px-ch"
	action="?/discount"
	method="POST"
	use:enhance={({ formData }) => {
		const discountCode = formData.get('discount')?.toString().toUpperCase()

		if (discountCode === 'FAMILY') {
			const answer = prompt("What is mom's maiden name?")
			if (!answer) return () => {}
			formData.set('familySecret', answer)
		}

		return async ({ update }) => await update()
	}}
>
	{#key form?.timestamp}
		<fieldset
			class="flex flex-wrap items-end"
			class:shake={form?.message && !form?.success}
			disabled={form?.success}
		>
			<label class="relative grid grow">
				<small>Discount code:</small>
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

			<button class="action grow" type="submit">Apply</button>
		</fieldset>
	{/key}

	{#if form?.success}
		<p class="text-center text-xs text-[green]">{form.message}</p>
	{:else if form?.message}
		<p class="text-center text-xs text-[red]">{form.message}</p>
	{/if}
</form>

<style>
	.shake {
		animation: shake 0.5s ease-in-out;
	}

	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		10%,
		30%,
		50%,
		70% {
			transform: translateX(-8px);
		}
		20%,
		40%,
		60% {
			transform: translateX(8px);
		}
		80% {
			transform: translateX(-4px);
		}
		90% {
			transform: translateX(4px);
		}
	}
</style>
