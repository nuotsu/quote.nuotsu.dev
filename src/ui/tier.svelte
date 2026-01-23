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

<article class="relative space-y-ch border p-ch">
	<header>
		{#if badge}
			<em class="absolute top-0 right-ch inline-block -translate-y-1/2 bg-background px-ch">
				{badge}
			</em>
		{/if}

		<h2>
			{name}
		</h2>

		<div class="flex items-center gap-ch">
			{#if form?.success && applyDiscount}
				<div class="flex flex-col items-end">
					<strong class="text-2xl font-black">
						{formatCurrency(price * (1 - form.percentage))}
					</strong>
					<s class="text-sm leading-none">{formatCurrency(price)}</s>
				</div>

				<output
					class="relative inline-grid aspect-square w-[4lh] -rotate-3 place-content-center bg-[red] text-center text-sm leading-none text-white uppercase"
				>
					{form!.percentage * 100}% off!
				</output>

				<ExpirationTimer />
			{:else}
				<strong class="text-2xl font-black">{formatCurrency(price)}</strong>
			{/if}
		</div>
	</header>

	<p>{@html description}</p>

	<div>
		<h3>What you'll get:</h3>
		<ul class="list-disc pl-[2ch] marker:content-['✔︎_']">
			{#each features as feature, i (i)}
				<li>{feature}</li>
			{/each}
		</ul>
	</div>
</article>

<style>
	output {
		clip-path: polygon(
			50% 0%,
			55.5% 15.4%,
			65.5% 2.5%,
			65.9% 18.8%,
			79.4% 9.5%,
			74.7% 25.2%,
			90.5% 20.6%,
			81.2% 34.1%,
			97.5% 34.5%,
			84.6% 44.5%,
			100% 50%,
			84.6% 55.5%,
			97.5% 65.5%,
			81.2% 65.9%,
			90.5% 79.4%,
			74.7% 74.7%,
			79.4% 90.5%,
			65.9% 81.2%,
			65.5% 97.5%,
			55.5% 84.6%,
			50% 100%,
			44.5% 84.6%,
			34.5% 97.5%,
			34.1% 81.2%,
			20.6% 90.5%,
			25.2% 74.7%,
			9.5% 79.4%,
			18.8% 65.9%,
			2.5% 65.5%,
			15.4% 55.5%,
			0% 50%,
			15.4% 44.5%,
			2.5% 34.5%,
			18.8% 34.1%,
			9.5% 20.6%,
			25.2% 25.2%,
			20.6% 9.5%,
			34.1% 18.8%,
			34.5% 2.5%,
			44.5% 15.4%
		);
	}
</style>
