const postController = require('../controllers/Post');
const tokenController = require('../controllers/Token');

const express = require('express');
var router = express.Router();

// Route to get a specific post by name
router.get('/', tokenController.verifyToken, postController.getPost);

module.exports = router;