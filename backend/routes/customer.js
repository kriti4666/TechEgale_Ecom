const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware.authenticate);

router.get('/inventory', customerController.getInventory);
router.post('/cart', customerController.addToCart);
router.get('/cart', customerController.getUserCart);
router.put('/cart/:productId', customerController.updateCartItem);
router.post('/place-order', customerController.placeOrder);
router.get('/track-order/:orderId', customerController.trackOrder);

module.exports = router;
