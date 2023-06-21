const midtransClient = require('midtrans-client');

const payment = async (req, res, next) => {
	console.log(process.env.MIDTRANS_SERVER_KEY);
	// Create Core API instance
	const core = new midtransClient.CoreApi({
		isProduction: false,
		serverKey: process.env.MIDTRANS_SERVER_KEY,
		clientKey: process.env.MIDTRANS_CLIENT_KEY,
	});
	const { total, orderId } = req.body;
	const parameter = {
		payment_type: 'gopay',
		transaction_details: {
			gross_amount: total,
			order_id: orderId,
		},
	};

	const transaction = await core.charge(parameter);

	return transaction;
};

const status = async (req, res, next) => {
	// Create Core API instance
	const core = new midtransClient.CoreApi({
		isProduction: false,
		serverKey: process.env.MIDTRANS_SERVER_KEY,
		clientKey: process.env.MIDTRANS_CLIENT_KEY,
	});

	const { orderId } = req.body;
	const status = await core.transaction.status(orderId);
	return status;
};

module.exports = { payment, status };
