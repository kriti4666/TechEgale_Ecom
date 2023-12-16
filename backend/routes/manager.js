const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');
const authMiddleware = require('../middlewares/authMiddleware');
const managerMiddleware = require('../middlewares/managerMiddleware');

router.use(authMiddleware.authenticate, managerMiddleware.authorizeManager);

router.post('/add-product', managerController.addProduct);
router.put('/update-quantity/:productId', managerController.updateProductQuantity);
router.delete('/delete-product/:productId', managerController.deleteProduct);
router.post('/place-order', managerController.placeOrder);
router.put('/update-order-status/:orderId', managerController.updateOrderStatus);

module.exports = router;
