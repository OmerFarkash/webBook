const tokenController = require('../controllers/Token');

const express = require('express');
const router = express.Router();

// Route to create a new token
router.post('/', tokenController.verifyToken);

module.exports = router;