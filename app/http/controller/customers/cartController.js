function cartController() {
	return {
		index(req, res) {
			res.render('customers/cart')
		},
		update(req, res) {

			//create session structure
			if(!req.session.cart) {
				req.session.cart = {
					items : {},
					totalPrice: 0,
					totalQty: 0
				}
			}

			let cart = req.session.cart
			// cart check exits or not
			if (!cart.items[req.body._id]) {
				cart.items[req.body._id] = {
					item: req.body,
					qty: 1
				}
				cart.totalPrice = cart.totalPrice + req.body.price
				cart.totalQty = cart.totalQty + 1
			} else {
				cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
				cart.totalPrice = cart.totalPrice + req.body.price
				cart.totalQty = cart.totalQty + 1
			}
			return res.json({totalQty : req.session.cart.totalQty})
		}
	}
}
module.exports = cartController