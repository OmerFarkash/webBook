const User = require('../models/User');
const TokenService = require('../services/Token');


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
    const user = await validUser(username, jwt);
    user.username = newUsername;
    user.profilePic = newProfilePic;

    await user.save();
    return JSON.stringify(user);
}

// works
const editUser = async (username, jwt, newUsername, newProfilePic) => {
    const user = await validUser(username, jwt);
    
    if (newUsername !== user.username && newUsername != "")
        user.username = newUsername;
    if (newProfilePic !== user.profilePic && newProfilePic != "")
        user.profilePic = newProfilePic;
    
    await user.save();
    return JSON.stringify(user);
}

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

const getFriends = async (username) => {
    const user = await User.findOne({ username });
    return await user.friends;
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

module.exports = { createUser, getUser, editUser, deleteUser, updateUser, addFriend, getFriends, askFriend, deleteFriend};
