export class CardWidget {
	stripe = null
	card = null
	constructor(stripe) {
		this.stripe = stripe
	}

	mount() {
		const elements = this.stripe.elements()
		this.card = elements.create('card',{ style:{},hidePostalCode:true })
		this.card.mount('#card-element')
	}

	destroy() {
		this.card.destroy()
	}

	async createToken() {
		try {
			const result = await this.stripe.createToken(this.card)
			return result.token
		} catch(err) {
			console.log(err)
		}

	}
}