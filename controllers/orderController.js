const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
	try {
		const total = await req.body.products.reduce(async (acc, item) => {
			const price = await Product.findById(item.productId).then(
				(product) => product.price,
			);
			return acc + price * item.quantity;
		}, 0);

		const newOrder = new Order({
			userId: req.user.id,
			products: req.body.products,
			total: total,
		});

		const savedOrder = await newOrder.save();
		return res.status(200).json(savedOrder);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

const getUserOrders = async (req, res) => {
	try {
		if (!req.query.orderId && !req.query.status) {
			const orders = await Order.find({ userId: req.params.id }).sort({
				createdAt: -1,
			});

			return res.status(200).json(orders);
		}

		if (req.query.status && req.query.orderId) {
			const orders = await Order.find({
				userId: req.params.id,
				_id: req.query.orderId,
			}).sort({
				createdAt: -1,
			});

			return res.status(200).json(orders);
		}

		if (req.query.status) {
			const orders = await Order.find({
				userId: req.params.id,
				status: req.query.status,
			}).sort({
				createdAt: -1,
			});

			return res.status(200).json(orders);
		}

		if (req.query.orderId) {
			const orders = await Order.find({
				userId: req.params.id,
				_id: req.query.orderId,
			}).sort({
				createdAt: -1,
			});

			return res.status(200).json(orders);
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find().sort({
			createdAt: -1,
		});

		return res.status(200).json(orders);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

const updateOrder = async (req, res) => {
	try {
		const updatedOrder = await Order.findByIdAndUpdate(
			req.params.orderId,
			{ status: req.body.status },
			{ new: true },
		);

		return res.status(200).json(updatedOrder);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

const deleteOrder = async (req, res) => {
	try {
		await Order.findByIdAndDelete(req.params.orderId);

		return res.status(200).json('Order deleted successfully!');
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

module.exports = {
	createOrder,
	getUserOrders,
	getAllOrders,
	updateOrder,
	deleteOrder,
};
