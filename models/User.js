const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			max: 50,
			unique: true,
		},
		email: {
			type: String,
			required: true,

			validate: {
				validator: validator.isEmail,
				message: '{VALUE} is not a valid email',
				isAsync: false,
			},
		},
		password: {
			type: String,
			required: true,
			min: 6,
			max: 50,
		},

		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
