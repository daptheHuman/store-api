const midtransClient = require('midtrans-client');

const Order = require('../models/Order');
const Product = require('../models/Product');

const getStatus = async (req, res) => {
	// Create Core API instance
	try {
		const core = new midtransClient.CoreApi({
			isProduction: false,
			serverKey: process.env.MIDTRANS_SERVER_KEY,
			clientKey: process.env.MIDTRANS_CLIENT_KEY,
		});

		const orderId = req.params.orderId;
		console.log(orderId);
		const status = await core.transaction.status(orderId);
		return res.status(200).json(status);
	} catch (err) {
		return res.status(err.httpStatusCode).send(err.ApiResponse);
	}
};

const getOrderDetails = (order) => {
	const productDetail = Promise.all(
		order.products.map(async (product) => {
			const detail = await Product.findById(product.productId);
			return {
				quantity: product.quantity,
				price: detail.price,
				name: detail.title,
			};
		}),
	);

	return productDetail;
};

const createPayment = async (req, res) => {
	try {
		// Create Core API instance
		const core = new midtransClient.CoreApi({
			isProduction: false,
			serverKey: process.env.MIDTRANS_SERVER_KEY,
			clientKey: process.env.MIDTRANS_CLIENT_KEY,
		});
		const orderId = req.params.orderId;
		const order = await Order.findById(orderId);

		const makeParameter = async () => {
			return {
				payment_type: 'gopay',
				transaction_details: {
					gross_amount: order.total,
					order_id: orderId,
				},
				item_details: await getOrderDetails(order),
			};
		};

		parameter = await makeParameter();
		const transaction = await core.charge(parameter);
		return res.status(200).json(transaction);
	} catch (err) {
		// return res.status(500).send(err);
		return res.status(err.httpStatusCode).send(err.ApiResponse);
	}
};

module.exports = {
	getStatus,
	createPayment,
};
