const express = require('express');
require('express-group-routes');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import Routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const paymentRoute = require('./routes/payment');

const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose
	.connect(process.env.MONGOOSE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('DB Connected!'))
	.catch((err) => {
		console.log(err);
	});

// health check
app.get('/', (req, res) => {
	res.send('Hello World!');
});
app.group('/api', (router) => {
	router.use('/auth', authRoute);
	router.use('/user', userRoute);
	router.use('/product', productRoute);
	router.use('/cart', cartRoute);
	router.use('/order', orderRoute);
	router.use('/payment', paymentRoute);
});

app.listen(process.env.PORT || 5000, () =>
	console.log(`Server started on http://localhost:${process.env.PORT || 5000}`),
);
