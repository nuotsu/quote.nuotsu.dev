import { fail } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import type { Actions } from './$types'

function parseDiscounts(discountsEnv: string): Map<string, number> {
	const discountMap = new Map<string, number>()

	const lines = discountsEnv
		.split(/\n/g)
		.map((line) => line.trim())
		.filter((line) => line && line.includes('='))

	for (const line of lines) {
		const [code, percentageStr] = line.split('=')
		const percentage = parseFloat(percentageStr)

		if (code && !isNaN(percentage)) {
			discountMap.set(code.toUpperCase(), percentage)
		}
	}

	return discountMap
}

const discountCodes = parseDiscounts(env.DISCOUNTS || '')

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData()
		const discount = formData.get('discount')
		const discountCode = String(discount).toUpperCase()

		if (!discountCodes.has(discountCode)) {
			return fail(400, {
				success: false,
				message: 'Invalid discount code',
			})
		}

		const discountPercentage = discountCodes.get(discountCode)!

		return {
			success: true,
			message: 'Discount applied successfully!',
			percentage: discountPercentage,
			code: discountCode,
		}
	},
} satisfies Actions
