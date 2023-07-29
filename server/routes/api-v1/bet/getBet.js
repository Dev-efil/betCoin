const express = require('express');
const router = express.Router();
const { authLogin } = require('../../../controllers/betController')

router.post('/login', authLogin);

module.exports = router;