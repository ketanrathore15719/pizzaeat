const mongoose = require('mongoose')
const Schema = mongoose.Schema


const orderSchema = new Schema({
	customerId:{ 
				type: mongoose.Schema.Types.ObjectId,
				ref:'User',
				required:true
			},
	orderId: { type:String, required:true },
	items: { type:Object, required:true },
	totalQty: {type:String, required:true},
	totalPrice:{type:String, required:true},
	phone: { type:String, required:true },
	address: { type:String, required:true },
	payment: { type:String, default:'COD' },
	paymentStatus: { type:Boolean, default:false },
	status: { type:String, default:'order_placed'}
},{timestamps:true})
 
module.exports = mongoose.model('Order',orderSchema)