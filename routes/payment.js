const { verifyAndAuth } = require('../middleware/verify');
const paymentController = require('../controllers/paymentController');
const router = require('express').Router();

router.post(
	'/create/:id/:orderId',
	verifyAndAuth,
	paymentController.createPayment,
);
router.get('/status/:id/:orderId', verifyAndAuth, paymentController.getStatus);

module.exports = router;
