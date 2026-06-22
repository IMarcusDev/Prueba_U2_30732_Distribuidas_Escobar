const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/balance', authMiddleware, accountController.getBalance);

module.exports = router;
