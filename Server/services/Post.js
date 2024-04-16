const post = require('../models/Post');
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
    const newPost = new post({name: user.name, profilePic: user.profilePic, desc: desc});
    if (postPic != null) newPost.postPic = postPic;
    if (date) newPost.date = date;
    await newPost.save();
    return JSON.stringify(newPost);
};

const getPost = async (name) => {
    return await post.findOne({ 'name': name });
};

// works
// edit the post with the given postId
const editPost = async (username, jwt, postId, desc, postPic) => {
    await authorize(username, jwt);
    var newVer = await post.findById(postId);
    if (desc !== newVer.desc && desc != "") newVer.desc = desc;
    if (postPic !== newVer.postPic && postPic != "") newVer.postPic = postPic;
    
    await newVer.save();
    return JSON.stringify(newVer);
};

// works
const replacePost = async (username, jwt, postId, desc, postPic) => {
    await authorize(username, jwt);
    var newVer = await post.findById(postId);
    
    newVer.desc = desc;
    newVer.postPic = postPic;
    
    await newVer.save();
    return JSON.stringify(newVer);
};

// works
const deletePost = async (username, jwt, postId) => {
    await authorize(username, jwt);
    await post.findByIdAndDelete(postId);
    // if the post is not found, it is not harmful
    return;
};

module.exports = {createPost, getPost, replacePost, editPost, deletePost};