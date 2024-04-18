const Post = require('../models/Post');
const User = require('../models/User');

// works
// help function to check if the user is authorized
const authorize = async (username, jwt) => {
    const user = await User.findOne({androidToken: jwt});
    if (username !== user.username) {
        throw new Error('not authorized');
    }
    return user;
}

// works
// create a new post and save it to the database for current user
const createPost = async (username, jwt, desc, postPic, date) => {
    const user = await authorize(username, jwt);
    const newPost = new Post({name: user.name, profilePic: user.profilePic, desc: desc});
    if (postPic != null) newPost.postPic = postPic;
    if (date) newPost.date = date;
    await newPost.save();
    user.posts.push(newPost._id);
    await user.save();
    return JSON.stringify(newPost);
};

const getPost = async (name) => {
    return await Post.findOne({ 'name': name });
};

// works
// edit the post with the given postId
const editPost = async (username, jwt, postId, desc, postPic) => {
    await authorize(username, jwt);
    var newVer = await Post.findById(postId);
    if (desc !== newVer.desc && desc != "") newVer.desc = desc;
    if (postPic !== newVer.postPic && postPic != "") newVer.postPic = postPic;
    
    await newVer.save();
    return JSON.stringify(newVer);
};

// works
const replacePost = async (username, jwt, postId, desc, postPic) => {
    await authorize(username, jwt);
    var newVer = await Post.findById(postId);
    
    newVer.desc = desc;
    newVer.postPic = postPic;
    
    await newVer.save();
    return JSON.stringify(newVer);
};

// works
// remove likes on the post from users lists, remove the post from the user's posts, rmove the post itself
const deletePost = async (username, jwt, postId) => {
    var user = await authorize(username, jwt);
    const post = await Post.findById(postId);
    for (let i = 0; i < post.likes.length; i++) {
        const tempUser = await User.findOne({username: post.likes[i]});
        tempUser.likedPosts = tempUser.likedPosts.remove(postId);
        await tempUser.save();
    }
    user = await User.findOne({username: username});
    user.posts = user.posts.remove(post._id);
    await user.save();
    await Post.findByIdAndDelete(postId);
    return;
};

// works
// add / remove likes to the post, add / remove the post to the user's likedPosts
const likePost = async (jwt, postId) => {
    const user = await User.findOne({androidToken: jwt});
    const currentPost = await Post.findById(postId);
    
    if (currentPost.likes.includes(user.username)) {
        currentPost.likes = currentPost.likes.remove(user.username);
        user.likedPosts = user.likedPosts.remove(postId);
    } else {
        currentPost.likes.push(user.username);
        user.likedPosts.push(postId);
    }
    await currentPost.save();
    await user.save();
    return JSON.stringify(currentPost.likes);
}

module.exports = {createPost, getPost, replacePost, editPost, deletePost, likePost};