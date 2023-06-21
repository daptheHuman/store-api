const { verifyAndAdmin } = require('../middleware/verify');

const router = require('express').Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/:prodId', productController.getProduct);
router.post('/', verifyAndAdmin, productController.createProduct);
router.put('/:id', verifyAndAdmin, productController.updateProduct);
router.delete('/:prodId', verifyAndAdmin, productController.deleteProduct);

module.exports = router;
