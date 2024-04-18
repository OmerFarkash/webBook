const User = require('../models/User');
const TokenService = require('../services/Token');


// works
const authorize = async (username, jwt) => {
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
    
    return user;
}

const deleteUser = async (username) => {
    const user = await User.findOne({ username : username });

    if (user === null) {
        throw new Error('User not exists');
    }

    return await user.Delete();
}

// works
const updateUser = async (username, jwt, newUsername, newProfilePic) => {
    const user = await authorize(username, jwt);
    user.username = newUsername;
    user.profilePic = newProfilePic;

    await user.save();
    return JSON.stringify(user);
}

// works
const editUser = async (username, jwt, newUsername, newProfilePic) => {
    const user = await authorize(username, jwt);
    
    if (newUsername !== user.username && newUsername != "")
        user.username = newUsername;
    if (newProfilePic !== user.profilePic && newProfilePic != "")
        user.profilePic = newProfilePic;
    
    await user.save();
    return JSON.stringify(user);
}

const addFriend = async (username, friend) => {
    const user = await User.findOne({ username });
    const friendUser = await User.findOne({ username: friend});

    if (user === null || friendUser === null) {
        throw new Error('User not exists');
    }
    
    return await UserdUpdate({ $push: { 'friends': friend } }) && 
    await friendUser.Update({ $push: { 'friends': username }}); 
}

const getFriends = async (username) => {
    const user = await User.findOne({ username });
    return await user.friends;
}

const askFriend = async (username, friend) => {
    const user = await User.findOne({ username });
    const friendUser = await User.findOne({ username: friend});

    if (user === null || friendUser === null) {
        throw new Error('User not exists');
    }
    return await friendUser.Update({ $push: { 'friendRequests': username }});
}

const deleteFriend = async (username, friend) => {
    const user = await User.findOne({ username });
    const friendUser = await User.findOne({ username: friend});
    if (user === null || friendUser === null) {
        throw new Error('User not exists');
    }
    return await user.findOneAndDelete({ 'friends': friend }) && await friendUser.findOneAndDelete({ 'friends': user });
}

module.exports = { createUser, getUser, editUser, deleteUser, updateUser, addFriend, getFriends, askFriend, deleteFriend};
