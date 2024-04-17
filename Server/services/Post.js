const post = require('../models/Post');
const User = require('../models/User');

// working don't tuch!!!!
// help function to check if the user is authorized
const authorize = async (username, jwt) => {
    const user = await User.findOne({androidToken: jwt});
    if (username !== user.username) {
        throw new Error('not authorized');
    }
    return user;
}

// working don't tuch!!!!
// create a new post and save it to the database for current user
const createPost = async (username, jwt, desc, postPic, date) => {
    const user = authorize(username, jwt);
    const newPost = new post({name: user.name, profilePic: user.profilePic, desc: desc});
    if (postPic != null) newPost.postPic = postPic;
    if (date) newPost.date = date;
    return await newPost.save();
};

const getPost = async (name) => {
    return await post.findOne({ 'name': name });
};

// work in proggress
// edit the post with the given postId
const editPost = async (username, jwt, postId, desc, postPic) => {
    authorize(username, jwt);
    var newVer = await post.findById(postId);
    console.log(newVer)
    if (desc !== newVer.desc && desc != "") newVer.desc = desc;
    console.log(newVer)

    if (postPic !== newVer.postPic && postPic != "") newVer.postPic = postPic;
    
    return await newVer.save();
};

// working don't tuch!!!!
const replacePost = async (username, jwt, postId, desc, postPic) => {
    authorize(username, jwt);
    var newVer = await post.findById(postId);
    
    newVer.desc = desc;
    newVer.postPic = postPic;
    
    return await newVer.save();
};

module.exports = {createPost, getPost, replacePost, editPost};