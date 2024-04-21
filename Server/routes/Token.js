const tokenController = require('../controllers/Token');

const express = require('express');
const router = express.Router();

// 
router.post('/', tokenController.verifyLogin);

module.exports = router;