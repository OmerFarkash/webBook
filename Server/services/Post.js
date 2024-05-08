const Post = require('../models/Post');
const User = require('../models/User');

// works
// help function to check if the user is known user
const validUser = async (username, jwt) => {
    const user = await User.findOne({androidToken: jwt});
    if (username !== user.username) {
        throw new Error('user name does not match token');
    }
    return user;
}

// works
// help function to check if the user is the owner of the post so it can perform actions on it
const postOwner = async (username, postId, jwt) => {
    const user = await validUser(username, jwt);
    const post = await Post.findById(postId);
    if (post.username !== username) {
        throw new Error('not authorized to edit this post');
    }
    return user;
}

// works
// create a new post and save it to the database for current user
const createPost = async (username, jwt, desc, postPic, date) => {
    const user = await validUser(username, jwt);
    const newPost = new Post({name: user.name, profilePic: user.profilePic, desc: desc, username: username});
    if (postPic != null) newPost.postPic = postPic;
    if (date) newPost.date = date;
    await newPost.save();
    user.posts.push(newPost._id);
    await user.save();
    return JSON.stringify(newPost);
};

// return all the user's posts - if the user is a friend or the user itself
const getUserPosts = async (jwt, wantToSee) => {
    const user = await User.findOne({"androidToken" : jwt});
    const userToWatch = await User.findOne({username: wantToSee});
    try {
        if (user.friends.includes(wantToSee) || user.username === wantToSee) {
            var posts = [];
            for (let i = 0; i < userToWatch.posts.length; i++) {
                posts.push(await Post.findById(userToWatch.posts[i]));
                if (posts.length == 25) 
                    break;
            }
            posts = posts.sort((a, b) => b.date - a.date);
            return JSON.stringify(posts); 
        }
        else {
            return JSON.stringify("not authorized to see this user posts");
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
};

// works
// edit the post with the given postId
const editPost = async (username, jwt, postId, desc, postPic) => {
    await postOwner(username, postId, jwt);
    var newVer = await Post.findById(postId);
    if (desc !== newVer.desc && desc != "") newVer.desc = desc;
    if (postPic !== newVer.postPic && postPic != "") newVer.postPic = postPic;
    
    await newVer.save();
    return JSON.stringify(newVer);
};

// works
const replacePost = async (username, jwt, postId, desc, postPic) => {
    await postOwner(username, postId, jwt);
    var newVer = await Post.findById(postId);
    
    newVer.desc = desc;
    newVer.postPic = postPic;
    
    await newVer.save();
    return JSON.stringify(newVer);
};

// works
// remove likes on the post from users lists, remove the post from the user's posts, rmove the post itself
const deletePost = async (username, jwt, postId) => {
    var user = await postOwner(username, postId, jwt);
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

const getFeed = async (jwt) => {
    const user = await User.findOne({"androidToken" : jwt});
    var friendsPosts = [];
    var otherPosts = [];
    const posts = await Post.find();

    for (let i = 0; i < posts.length; i++) {
        const currentPost = posts[i];
        const currentPostUser = currentPost.name;
        if ((user.username === currentPostUser) || (user.friends.includes(currentPostUser))) {
            friendsPosts.push(currentPost);
            friendsPosts = friendsPosts.sort((a, b) => b.date - a.date);
            if (friendsPosts.length > 20) 
                friendsPosts.pop();
        }
        else {
            otherPosts.push(currentPost);
            otherPosts = otherPosts.sort((a, b) => b.date - a.date);
            if (otherPosts.length > 5) 
                otherPosts.pop();
        }
    }
    var feed = friendsPosts.concat(otherPosts);
    feed = feed.sort((a, b) => b.date - a.date);
    return JSON.stringify(feed);
}

module.exports = {createPost, getUserPosts, replacePost, editPost, deletePost, likePost, getFeed};