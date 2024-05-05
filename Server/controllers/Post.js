const postService = require('../services/Post');

// works
const createPost = async (req, res) => {
    const {desc, postPic} = req.body;
    const jwt = req.headers['authorization']
    const username = req.params.id;
    try {
        return res.json(await postService.createPost(username, jwt, desc, postPic));
    }
    catch (error) {
        return res.status(400).send("Post already exists");
    }
};

const getUserPosts = async (req, res) => {
    const jwt = req.headers['authorization']
    const wantToSee = req.params.id;

    try {
        const posts = await postService.getUserPosts(jwt, wantToSee);
        return res.status(200).send(posts);
    }
    catch (error) {
        return res.status(404).send("Posts not exists");
    }
};

// works
const editPost = async (req, res) => {
    const {desc, postPic} = req.body;
    const jwt = req.headers['authorization']
    const username = req.params.id;
    const postId = req.params.pid;
    try {
        return res.json(await postService.editPost(username, jwt, postId, desc, postPic));
    }
    catch (error) {
        return res.status(400).send("Post not exists");
    }
};

// works
const replacePost = async (req, res) => {
    const {desc, postPic} = req.body;
    const jwt = req.headers['authorization']
    const username = req.params.id;
    const postId = req.params.pid;
    try {
        return res.json(await postService.replacePost(username, jwt, postId, desc, postPic));
    }
    catch (error) {
        return res.status(400).send("Post not exists");
    }
}

// works
const deletePost = async (req, res) => {
    const jwt = req.headers['authorization']
    const username = req.params.id;
    const postId = req.params.pid;

    try {
        await postService.deletePost(username, jwt, postId);
        return res.status(220).json("Post deleted");
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
}

// works
const likePost = async (req, res) => {
    const jwt = req.headers['authorization']
    const postId = req.params.id;
    try {
        return res.json(await postService.likePost(jwt, postId));
    }
    catch (error) {
        return res.status(400).send("Post not exists");
    }
}

const getFeed = async (req, res) => {
    const jwt = req.headers['authorization']
    try {
        const posts = await postService.getFeed(jwt);
        return res.status(200).send(posts);
    }
    catch (error) {
        return res.status(404).send("Posts not exists");
    }
}

module.exports = {createPost, getUserPosts, replacePost, editPost, deletePost, likePost, getFeed};