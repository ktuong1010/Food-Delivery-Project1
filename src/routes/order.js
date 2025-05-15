const express = require('express');
const router = express.Router();
const orderController = require('../app/controller/OrderController');

router.post('/', orderController.placeOrder);
router.post('/:id/status', orderController.updateOrderStatus);
module.exports = router;