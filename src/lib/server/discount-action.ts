import { fail, type RequestEvent } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

function parseDiscounts(discountsEnv: string): Map<string, number> {
	const discountMap = new Map<string, number>()

	const lines = discountsEnv
		.split(/\n/g)
		.map((line) => line.trim())
		.filter((line) => line && line.includes('='))

	for (const line of lines) {
		const [code, percentageStr] = line.split('=')
		const percentage = parseFloat(percentageStr)
		discountMap.set(code.toUpperCase(), percentage)
	}

	return discountMap
}

const discountCodes = parseDiscounts(env.DISCOUNTS || '')

export async function handleDiscount({ request }: RequestEvent) {
	const formData = await request.formData()
	const discount = formData.get('discount')
	const discountCode = String(discount).toUpperCase()

	if (!discountCodes.has(discountCode)) {
		return fail(400, {
			success: false,
			message: 'Invalid discount code',
			timestamp: Date.now(),
		})
	}

	// validation for FAMILY discount code
	if (discountCode === 'FAMILY') {
		const familySecret = formData.get('familySecret')?.toString()
		const validSecrets = env.FAMILY_SECRET?.split(',').map((s) => s.trim()) || []

		if (!familySecret || !validSecrets.includes(familySecret)) {
			return fail(400, {
				success: false,
				message: 'Invalid answer',
				timestamp: Date.now(),
			})
		}
	}

	const discountPercentage = discountCodes.get(discountCode)!

	return {
		success: true,
		message: 'Discount applied successfully!',
		percentage: discountPercentage,
		code: discountCode,
		timestamp: Date.now(),
	}
}
