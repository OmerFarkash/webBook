const postService = require('../services/Post');

const createPost = async (req, res) => {
    const {desc, postPic} = req.body;
    const jwt = req.headers['authorization']?.replace('Bearer ', '')
    const username = req.params.id;
    try {
        return res.json(postService.createPost(username, jwt, desc, postPic));
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

const editPost = async (req, res) => {
    const {desc, postPic} = req.body;
    const jwt = req.headers['authorization']?.replace('Bearer ', '')
    const username = req.params.id;
    const postId = req.params.pid;
    try {
        return res.json(postService.editPost(username, jwt, postId, desc, postPic));
    }
    catch (error) {
        return res.status(400).send("Post not exists");
    }
};

const replacePost = async (req, res) => {
    const {desc, postPic} = req.body;
    const jwt = req.headers['authorization']?.replace('Bearer ', '')
    const username = req.params.id;
    const postId = req.params.pid;
    try {
        return res.json(postService.replacePost(username, jwt, postId, desc, postPic));
    }
    catch (error) {
        return res.status(400).send("Post not exists");
    }
}

module.exports = {createPost, getPost, replacePost, editPost};