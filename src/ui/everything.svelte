<script lang="ts">
	import DiscountForm from '$ui/discount-form.svelte'
	import Tier from '$ui/tier.svelte'
</script>

<section class="mx-auto max-w-7xl">
	<div
		class="grid snap-x snap-mandatory auto-cols-[min(var(--container-sm),80vw)] grid-flow-col overflow-x-auto *:snap-start md:grid-cols-2"
	>
		<Tier
			name="Option 1"
			price={500}
			description="For when you're <em>kinda</em> serious"
			features={['1 request per day', 'Basic support']}
		/>

		<Tier
			name="Option 2"
			price={2000}
			description="For when you actually want a website"
			features={['Unlimited requests*', 'Priority support']}
			badge="Best value!"
			applyDiscount
		/>
	</div>

	<footer class="mx-auto max-w-max">
		<small class="text-[x-small]">
			<ol>
				<li>*1-year term (or until I get bored)</li>
			</ol>
		</small>
	</footer>
</section>

<aside class="mx-auto max-w-max">
	<DiscountForm />
</aside>
