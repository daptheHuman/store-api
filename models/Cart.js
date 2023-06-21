const mongoose = require('mongoose');
const validator = require('validator');

const cartSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			unique: true,
		},
		products: {
			type: [
				{
					productId: {
						type: mongoose.Schema.Types.ObjectId,
						required: true,
					},
					quantity: {
						type: Number,
						required: true,
					},
				},
			],
			default: [],
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Cart', cartSchema);
