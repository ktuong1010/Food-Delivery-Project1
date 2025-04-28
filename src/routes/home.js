const express = require('express');
const router = express.Router();
const homeController = require('../app/controller/homeController');
const loginController = require('../app/controller/LoginController');

router.get('/', homeController.publicHome);
router.get('/user', homeController.userHome);
router.get('/login', loginController.login);
router.post('/login', loginController.authentication);
router.get('/logout', loginController.logout);


module.exports = router;