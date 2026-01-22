import type { Actions } from './$types'
import { handleDiscount } from '$lib/server/discount-action'

export const actions = {
	discount: handleDiscount,
} satisfies Actions
