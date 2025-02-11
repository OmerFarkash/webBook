const postController = require('../controllers/Post');
const tokenController = require('../controllers/Token');

const express = require('express');
var router = express.Router();

// Route to Feed
router.get('/', tokenController.verifyToken, postController.getFeed);

// Route to like / remove like a post - works
router.post('/:id/likes', tokenController.verifyToken, postController.likePost);

module.exports = router;