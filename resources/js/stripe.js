import { placeOrder } from './apiService'
import { loadStripe } from '@stripe/stripe-js'
import { CardWidget } from './CardWidget'
export async function initStripe() {
	const stripe = await loadStripe('pk_test_51IHSvuKIfkbrsvhDLphlOfIClH8FbJelGK0zYvMxmTyrHr4bAdT5XteRD8mO2lsFruzMQA7raV5frtDNOF8VAykE00VcXl8rk2');
	let card = null;

	const paymentCOD = document.querySelector('#paymentCOD')
	const paymentCARD = document.querySelector('#paymentCARD')
	if (!paymentCOD && !paymentCARD) {
		return;
	}
	paymentCOD.addEventListener('change', (cod)=>{
		card = new CardWidget(stripe)
		card.destroy();
	})
	paymentCARD.addEventListener('change', (card)=>{
		card = new CardWidget(stripe)
		card.mount()
	})

	//ajax call order placed
	const paymentForm = document.querySelector('#payment-form');
	if (paymentForm) {
		paymentForm.addEventListener('submit', async (e)=>{
			e.preventDefault();
			let formData = new FormData(paymentForm)
			let formObject = {}

			for(let [key,value] of formData.entries()) {
				formObject[key] = value
			}

			//Verify card
			if(!card) {
				//ajax
				placeOrder(formObject);
				return;
			}
			const token = await card.createToken()
			formObject.stripeToken = token.id
			placeOrder(formObject);
		})
	}
}