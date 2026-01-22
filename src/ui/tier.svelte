<script lang="ts">
	import { page } from '$app/state'
	import { formatCurrency } from '$lib/utils'

	let {
		name,
		price,
		features,
		badge,
		applyDiscount = false,
	}: {
		name: string
		price: number
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
		<span>{name}</span>
		{#if form?.success && applyDiscount}
			<strong>{formatCurrency(price * (1 - form.percentage))}</strong>
			<s>{formatCurrency(price)}</s>
			<output class="bg-[red] text-white uppercase">{form!.percentage * 100}% off!</output>
		{:else}
			<strong>{formatCurrency(price)}</strong>
		{/if}
	</h2>

	<h3>What you'll get:</h3>
	<ul>
		{#each features as feature, i (i)}
			<li>{@html feature}</li>
		{/each}
	</ul>
</article>
