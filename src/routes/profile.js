const express = require('express');
const router = express.Router();
const profileController = require('../app/controller/profileController');
const multer = require('multer');
const upload = multer({ dest: 'src/public/uploads/' });

router.get('/edit', profileController.getEditProfile);
router.post('/edit', upload.single('profileImage'), profileController.postEditProfile);
router.get('/history', profileController.getHistory);

module.exports = router; 