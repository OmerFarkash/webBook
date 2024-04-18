const express = require('express');
const UserController = require('../controllers/User');
const TokenController = require('../controllers/Token');
const postController = require('../controllers/Post');

const router = express.Router();

// Route to create a new user - works
router.post('/', UserController.createUser);

// Route to create a new post - works
router.post('/:id/posts', TokenController.verifyToken, postController.createPost);

// Route to get all the posts of the user
router.get('/:id/posts', TokenController.verifyToken, postController.getPost);

// Route to replace a post entirely - works
router.put('/:id/posts/:pid', TokenController.verifyToken, postController.replacePost);

// Route to edit a post - works
router.patch('/:id/posts/:pid', TokenController.verifyToken, postController.editPost);

// Route to delete a post - works
router.delete('/:id/posts/:pid', TokenController.verifyToken, postController.deletePost);


// Route to get a specific user by ID (username) - works
router.get('/:id', TokenController.verifyToken, UserController.getUser);

// Route to update fully a user by ID (username) - works
router.put('/:id', TokenController.verifyToken, UserController.updateUser);

// Route to update a user by ID (username) - works
router.patch('/:id', TokenController.verifyToken, UserController.editUser);

// Route to delete a user by ID
router.delete('/:id', TokenController.verifyToken, UserController.deleteUser);


// Route to reaturn the list of my friends
router.get('/:id/friends', TokenController.verifyToken, UserController.getFriends);

// Route to create a new friend request - works
router.post('/:id/friends', TokenController.verifyToken, UserController.askFriend);


// Route to accept the friend request - works
router.patch('/:id/friends/:fid', TokenController.verifyToken, UserController.addFriend);

// Route to delete a friend from the list - works
router.delete('/:id/friends/:fid', TokenController.verifyToken, UserController.deleteFriend);

module.exports = router;