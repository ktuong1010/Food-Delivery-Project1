const express = require('express');
const router = express.Router();

const cartController = require('../app/controller/CartController');

router.get('/:slug', cartController.showcart);




module.exports = router;