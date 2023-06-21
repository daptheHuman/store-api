const router = require('express').Router();
const userController = require('../controllers/userController');
const { verifyAndAuth, verifyAndAdmin } = require('../middleware/verify');

router.get('/', verifyAndAdmin, userController.getAllUsers);
router.get('/:id', verifyAndAdmin, userController.getUser);
router.put('/:id', verifyAndAuth, userController.updateUser);
router.delete('/:id', verifyAndAuth, userController.deleteUser);

module.exports = router;
