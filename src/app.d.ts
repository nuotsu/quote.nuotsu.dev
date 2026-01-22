// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

		type DiscountFormResult =
			| {
					success: true
					message: string
					timestamp: number
					percentage: number
					code: string
			  }
			| {
					success: false
					message: string
					timestamp: number
			  }
	}
}

export {}
