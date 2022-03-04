const orderid = require('order-id')('mysecret')
const Order = require('../../../models/order')
const moment = require('moment')
const notifier = require('node-notifier')
const path = require('path')
const stripe = require('stripe')(process.env.STRIPE_KEY)

function orderController() {

	return {
		store(req, res){
			//validate
			const { phone, address, stripeToken, payment } = req.body
			if (!phone || !address) {
				// req.flash('error','All field are required!!')
				// return res.redirect('/cart')
				return res.status(422).json({message:'All field are required!!'})
			}

			const id = orderid.generate()

			const order = new Order({
				customerId:req.user._id,
				orderId:id,
				items:req.session.cart.items,
				totalQty:req.session.cart.totalQty,
				totalPrice:req.session.cart.totalPrice,
				phone,
				address
			})

			order.save().then(result => {
				Order.populate(result,{path:'customerId'},(err,placedOrder)=>{
					//req.flash('success','Order placed successfully!!')
					// Stripe payment

					if (payment === 'card') {
						stripe.charges.create({
							amount: req.session.cart.totalPrice * 100,
							source: stripeToken,
							currency:'inr',
							description:`Order ID : ${placedOrder.orderId}`
						}).then(()=>{
							placedOrder.paymentStatus = true;
							placedOrder.payment = payment
							placedOrder.save().then((ord)=>{
								console.log(ord)
								const eventEmitter = req.app.get('eventEmitter')
								eventEmitter.emit('orderPlaced',ord)
								delete req.session.cart
								return res.json({success:'Order placed successfully!!'})
							}).catch((err)=>{
								console.log(err)
							})
						}).catch((err)=>{
							delete req.session.cart
							return res.json({success:'Payment failed'})
						})
					} else {
						delete req.session.cart
						return res.json({success:'Order placed successfully!!'})
					}
					notifier.notify({
						title: 'Order Placed',
						message: 'Order Confirmed Pleae go to your order',
						icon: 'public/img/placed.jpg',
						sound: true,
						wait: true,
						timeout:1000*60*60*24,
						open: 'pizzaeat.herokuapp.com'  
					});
				})
			}).catch(err => {
				delete req.session.cart
				return res.status(500).json({message:'Somthing went wrong!!'})
			})
		},

  		async index(req, res) {
			const orders = await Order.find({customerId:req.user._id},
				null,
				{sort:{'createdAt':-1}})
			res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
			return res.render('customers/orders',{orders:orders,moment:moment})
		},

		async show(req, res) {
			const order = await Order.findById(req.params.id)
			//Authorized user
			if (req.user._id.toString() === order.customerId.toString()) {
				return res.render('customers/status', {order})
			}
			return res.redirect('/')
		}
	}

}

module.exports = orderController