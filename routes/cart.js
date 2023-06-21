const {
	verify,
	verifyAndAuth,
	verifyAndAdmin,
} = require('../middleware/verify');

const cartController = require('../controllers/cartController');
const router = require('express').Router();

router.post('/', verify, cartController.createCart);
router.get('/user/:id', verifyAndAuth, cartController.getCartUser);
router.get('/all', verifyAndAdmin, cartController.getAllCarts);
router.put('/:id', verifyAndAuth, cartController.updateCart);
router.delete('/:id', verifyAndAuth, cartController.deleteCart);

module.exports = router;
