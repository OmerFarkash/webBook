const User = require('../models/User');

const createUser = async (name, username, password, profilePic) => {
    const user = await User.findOne({ username });
    if (user !== null) {
        throw new Error('User already exists');
    }
    const newUser = new User({ name: name, username: username, password: password, profilePic: profilePic, androidToken: "" });
    return await newUser.save();
};

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

const updateUser = async (username, name, profilePic) => {
    const user = await User.findOne({ username });

    if (user === null) {
        throw new Error('User not exists');
    }
    return await user.Update({ 'name': name , 'profilePic': profilePic });
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

module.exports = { createUser, getUser, deleteUser, updateUser, addFriend, getFriends, askFriend, deleteFriend};
