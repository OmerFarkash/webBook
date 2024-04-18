const postController = require('../controllers/Post');
const tokenController = require('../controllers/Token');

const express = require('express');
var router = express.Router();

// Route to get a specific post by name
router.get('/', tokenController.verifyToken, postController.getPost);

// Route to like / remove like a post - works
router.post('/:id/likes', tokenController.verifyToken, postController.likePost);

module.exports = router;