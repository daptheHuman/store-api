const {
	verify,
	verifyAndAuth,
	verifyAndAdmin,
} = require('../middleware/verify');
const orderController = require('../controllers/orderController');

const router = require('express').Router();

router.get('/user/:id', verifyAndAuth, orderController.getUserOrders);
router.get('/', verifyAndAdmin, orderController.getAllOrders);
router.post('/', verify, orderController.createOrder);
router.put('/:orderId', verifyAndAdmin, orderController.updateOrder);
router.delete('/:orderId', verifyAndAdmin, orderController.deleteOrder);

module.exports = router;
