<script lang="ts">
	import { browser } from '$app/environment'
	import { page } from '$app/state'
	import { formatDateTime } from '$lib/utils'

	const form = $derived(page.form as App.DiscountFormResult | null)

	let remaining = $state('24:00:00')

	let timestamp = $derived(
		browser && form?.success ? parseInt(localStorage.getItem(`discount:${form.code}`)!, 10) : null,
	)

	function formatTime(ms: number): string {
		if (ms <= 0) {
			localStorage.removeItem(`discount:${page.form.code}`)
			return ''
		}

		const totalSeconds = Math.floor(ms / 1000)
		const hours = Math.floor(totalSeconds / 3600)
		const minutes = Math.floor((totalSeconds % 3600) / 60)
		const seconds = totalSeconds % 60

		return [hours, minutes, seconds].map((part) => part.toString().padStart(2, '0')).join(':')
	}

	function updateTimer() {
		if (!timestamp) return

		const expiration = timestamp + 24 * 60 * 60 * 1000
		remaining = formatTime(expiration - Date.now())
	}

	$effect(() => {
		if (browser && form?.success) {
			updateTimer()
			const interval = setInterval(updateTimer, 1000)

			return () => clearInterval(interval)
		}
	})
</script>

{#if timestamp}
	{@const expiration = timestamp + 24 * 60 * 60 * 1000}

	<time
		class="inline-grid tabular-nums empty:hidden"
		datetime={formatDateTime(expiration)}
		title="Expires at {formatDateTime(expiration)}"
	>
		<small class="text-[x-small] leading-none">Expires in</small>

		{remaining}
	</time>
{/if}
