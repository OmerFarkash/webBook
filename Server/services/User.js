const User = require('../models/User');
const TokenService = require('../services/Token');
const PostServices = require('../services/Post');
const Post = require('../models/Post');

// works
const validUser = async (username, jwt) => {
    const user = await User.findOne({androidToken: jwt});
    if (username !== user.username) {
        throw new Error('not authorized');
    }
    return user;
}

// works
const createUser = async (name, username, password, profilePic) => {
    const user = await User.findOne({ username: username });
    
    if (user !== null) {
        throw new Error('User already exists');
    }
    var newUser = new User({ name: name, username: username, profilePic: profilePic, androidToken: "" });
    await newUser.save();
    
    await TokenService.createToken(username, password, "");
    newUser = await User.findOne({ 'username': username });

    return JSON.stringify(newUser);
}

// works
const getUser = async (username) => {
    const user = await User.findOne({ "username": username});

    if (user === null) {
        throw new Error('User not exists');
    }
    
    return JSON.stringify(user);
}

// works
const deleteUser = async (jwt, username) => {
    const user = await validUser(username, jwt);
    if (user === null) {
        throw new Error('User not exists');
    }

    // delete all likes
    for (let i = 0 ; i < user.likedPosts.length ; i++) {
        await PostServices.likePost(jwt, user.likedPosts[i]);
    }

    // delete all posts
    for (let i = 0 ; i < user.posts.length ; i++) {
        await PostServices.deletePost(username, jwt, user.posts[i]);
    }

    // delete all friend requests sent
    for (let i = 0 ; i < user.friendRequestsSent.length ; i++) {
        var temp = await User.findOne({ username: user.friendRequestsSent[i]});
        temp.friendRequests.remove(username);
        await temp.save();
        user.friendRequestsSent.pop();
    }
    await user.save();
    
    // delete all friend requests
    for (let i = 0 ; i < user.friendRequests.length ; i++) {
        await deleteFriend(jwt, username, user.friendRequests[i]);
    }

    // delete all friends
    for (let i = 0 ; i < user.friends.length ; i++) {
        await deleteFriend(jwt, username, user.friends[i]);
    }
    

    return await User.findOneAndDelete({ username: username });
}

// works
const editUser = async (username, jwt, newName, newProfilePic) => {
    var user = await validUser(username, jwt);
    user.name = newName;
    user.profilePic = newProfilePic;
    await user.save();
    var user2 = await User.findOne({ username: username });

    for (let i = 0 ; i < user.posts.length ; i++) {
        var post = await Post.findById(user.posts[i]);
        console.log(post);
        post.name = newName;
        await post.save();
    }

    return (user2);
}

// // works
// const editUser = async (username, jwt, newUsername, newProfilePic) => {
//     const user = await validUser(username, jwt);
    
//     if (newUsername !== user.username && newUsername != "")
//         user.username = newUsername;
//     if (newProfilePic !== user.profilePic && newProfilePic != "")
//         user.profilePic = newProfilePic;
    
//     await user.save();
//     return JSON.stringify(user);
// }

// works
const addFriend = async (jwt, username, friend) => {
    var user = await validUser(username, jwt)
    var friendUser = await User.findOne({ username: friend});

    if (user === null || friendUser === null) {
        throw new Error('User not exists');
    }
    
    if (user.friends.includes(friend) || friendUser.friends.includes(username)) {
        throw new Error('Already friends');
    }

    if (user.friendRequests.includes(friend)) {
        user.friendRequests.remove(friend);
        
        user.friends.push(friend);
        friendUser.friends.push(username);

        friendUser.friendRequestsSent.remove(username);

        await user.save();
        await friendUser.save();
    }
    else {
        throw new Error('No friend request');
    }
    return; 
}

// works
const getFriends = async (jwt, username) => {
    const user = await User.findOne({ "androidToken": jwt });
    const friend = await User.findOne({ "username": username });

    if (user === null || friend === null) {
        throw new Error('User not exists');
    }
    if (user.friends.includes(username)) {
        return JSON.stringify(friend.friends);
    }
    if (user.username === username) {
        return JSON.stringify(user.friends);
    }
    throw new Error('Not friends');
}

// works
const askFriend = async (jwt, friend) => {
    var user = await User.findOne({ androidToken: jwt });
    var friendUser = await User.findOne({ username: friend});
    if (user == null || friendUser == null) {
        throw new Error('User not exists');
    }
    if (user.friends.includes(friend) || friendUser.friends.includes(user.username)) {
        throw new Error('Already friends');
    
    }
    if ( user.friendRequestsSent.includes(friend) || friendUser.friendRequestsSent.includes.apply(user.username)) {
        throw new Error('Already sent request');
    
    }
    user.friendRequestsSent.push(friend);
    await user.save();
    friendUser.friendRequests.push(user.username);
    return await friendUser.save();
}

// works
// delete friend or friend request depending on the case
const deleteFriend = async (jwt, username, friend) => {
    var user = await validUser(username, jwt);
    var friendUser = await User.findOne({ username: friend});

    if (user === null || friendUser === null) {
        throw new Error('User not exists');
    }
    
    if (user.friends.includes(friend) || friendUser.friends.includes(username)) {
        user.friends.remove(friend);
        friendUser.friends.remove(username);
        await user.save();
        await friendUser.save();
        return;
    }

    if (user.friendRequests.includes(friend)) {
        user.friendRequests.remove(friend);
        await user.save();
        
        friendUser.friendRequestsSent.remove(username);
        await friendUser.save();
        
        return;
    }

    throw new Error('Not friends');
}

const getFriendReqs = async (jwt) => {
    const user = await User.findOne({ "androidToken": jwt });

    if (user === null) {
        throw new Error('User not exists');
    } else {
        return JSON.stringify(user.friendRequests);
    }
}

module.exports = { createUser, getUser, editUser, deleteUser, addFriend, getFriends, askFriend, deleteFriend, getFriendReqs};
