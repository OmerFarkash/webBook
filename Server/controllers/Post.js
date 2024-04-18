const postService = require('../services/Post');

// works
const createPost = async (req, res) => {
    const {desc, postPic} = req.body;
    const jwt = req.headers['authorization']?.replace('Bearer ', '')
    const username = req.params.id;
    try {
        return res.json(await postService.createPost(username, jwt, desc, postPic));
    }
    catch (error) {
        return res.status(400).send("Post already exists");
    }
};

const getPost = async (req, res) => {
    try {
        const post = await postService.getPost(req.params.name);
        return res.status(200).send(post);
    }
    catch (error) {
        return res.status(404).send("Post not exists");
    }
};

// works
const editPost = async (req, res) => {
    const {desc, postPic} = req.body;
    const jwt = req.headers['authorization']?.replace('Bearer ', '')
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
    const jwt = req.headers['authorization']?.replace('Bearer ', '')
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
    const jwt = req.headers['authorization']?.replace('Bearer ', '')
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
    const jwt = req.headers['authorization']?.replace('Bearer ', '')
    const postId = req.params.id;
    try {
        return res.json(await postService.likePost(jwt, postId));
    }
    catch (error) {
        return res.status(400).send("Post not exists");
    }
}

module.exports = {createPost, getPost, replacePost, editPost, deletePost, likePost};