const express = require('express');
const router = express.Router();

const cartController = require('../app/controller/CartController');

router.get('/cart', cartController.showcart);




module.exports = router;