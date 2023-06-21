const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		products: {
			type: [
				{
					productId: {
						type: String,
						required: true,
						ref: 'Product',
					},
					quantity: {
						type: Number,
						required: true,
					},
				},
			],

			default: [],
		},

		total: {
			type: Number,
			default: 0,
			required: true,
			
		},
		status: {
			type: String,
			default: 'pending',
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Order', orderSchema);
