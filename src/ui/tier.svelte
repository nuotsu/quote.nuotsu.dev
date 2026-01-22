<script lang="ts">
	import { page } from '$app/state'
	import { formatCurrency } from '$lib/utils'
	import ExpirationTimer from '$ui/expiration-timer.svelte'

	let {
		name,
		price,
		description,
		features,
		badge,
		applyDiscount = false,
	}: {
		name: string
		price: number
		description: string
		features: string[]
		badge?: string
		applyDiscount?: boolean
	} = $props()

	const form = $derived(page.form as App.DiscountFormResult | null)
</script>

<article>
	{#if badge}
		<p>{badge}</p>
	{/if}

	<h2>
		{name}
	</h2>

	<p class="flex items-end gap-ch">
		{#if form?.success && applyDiscount}
			<strong class="text-xl font-black">{formatCurrency(price * (1 - form.percentage))}</strong>
			<s>{formatCurrency(price)}</s>
			<output class="inline-block -rotate-3 bg-[red] text-sm text-white uppercase">
				{form!.percentage * 100}% off!
			</output>
			<ExpirationTimer />
		{:else}
			<strong class="text-xl font-black">{formatCurrency(price)}</strong>
		{/if}
	</p>

	<p>{@html description}</p>

	<h3>What you'll get:</h3>
	<ul class="list-disc pl-[2ch] marker:content-['✔︎_']">
		{#each features as feature, i (i)}
			<li>{feature}</li>
		{/each}
	</ul>
</article>
