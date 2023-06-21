const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			max: 50,
			unique: true,
		},
		desc: {
			type: String,
			required: true,
			max: 500,
		},
		price: {
			type: Number,
			required: true,
		},
		img: {
			type: String,
			required: true,
		},
		categories: {
			type: Array,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Product', productSchema);
