const express = require('express');
const router = express.Router();

const meController = require('../app/controller/MeController');


router.get('/stored/item', meController.storeditem);
router.get('/order/list', meController.OrderList);
router.get('/', meController.adminHome);


module.exports = router;