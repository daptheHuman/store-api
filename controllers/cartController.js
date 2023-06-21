const Cart = require('../models/Cart');

const createCart = async (req, res) => {
	const newCart = new Cart({
		userId: req.user.id,
	});

	try {
		const savedCart = await newCart.save();
		return res.status(200).json(savedCart);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

const getCartUser = async (req, res) => {
	try {
		const cart = await Cart.findOne({ userId: req.params.id }).sort({
			createdAt: -1,
		});

		return res.status(200).json(cart);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

const getAllCarts = async (req, res) => {
	try {
		const carts = await Cart.find().sort({
			createdAt: -1,
		});

		return res.status(200).json(carts);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

const updateCart = async (req, res) => {
	try {
		const updatedCart = await Cart.findOneAndUpdate(
			{ userId: req.params.id },
			{
				$set: req.body,
			},
			{ new: true },
		);

		return res.status(200).json(updatedCart);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

const deleteCart = async (req, res) => {
	try {
		await Cart.findOneAndDelete({ userId: req.params.id });

		return res.status(200).json('Product deleted successfully!');
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

module.exports = {
	createCart,
	getCartUser,
	getAllCarts,
	updateCart,
	deleteCart,
};
