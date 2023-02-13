const express = require('express');
const router = express.Router();
const { authLogin } = require('../../../controllers/authController')

router.post('/login', authLogin);

module.exports = router;