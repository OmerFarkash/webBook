const userServices = require('../services/User');

// works
const createUser = async (req, res) => {
    const { name, username, password, profilePic } = req.body;
    try {
        user = await userServices.createUser(name, username, password, profilePic);
        return res.status(201).json(user);
    } catch (error) {
        return res.json(error);
    }
}
// works
const getUser = async (req, res) => {
    const username = req.params.id;
    try {
        const user = await userServices.getUser(username);
        return res.status(200).send(user);
    } catch (error) {
        return res.status(404).send("User not exists");
    }
}

const deleteUser = async (req, res) => {
    const jwt = req.headers['authorization']
    const username = req.params.id;
    try {
        await userServices.deleteUser(jwt, username);
        return res.status(200).send("User deleted");
    } catch (error) {
        return res.status(404).send("User not exists");
    }
}

// works
const updateUser = async (req, res) => {
    const jwt = req.headers['authorization']
    const username = req.params.id;
    const newUsername = req.body.username;
    const newProfilePic = req.body.profilePic;
    try {
        return res.json(await userServices.updateUser(username, jwt, newUsername, newProfilePic));
    } catch (error) {
        return res.status(404).send("User not exists");
    }
}

// works
const editUser = async (req, res) => {
    const jwt = req.headers['authorization']
    const username = req.params.id;
    const newUsername = req.body.username;
    const newProfilePic = req.body.profilePic;
    try {
        return res.json(await userServices.editUser(username, jwt, newUsername, newProfilePic));
    } catch (error) {
        return res.status(404).send("User not exists");
    }
}

// works
const addFriend = async (req, res) => {
    const jwt = req.headers['authorization']
    const username = req.params.id;
    const friend = req.params.fid;
    try {
        await userServices.addFriend(jwt, username, friend);
        return res.status(200).send("Friend added");
    } catch (error) {
        return res.status(404).send("User not exists");
    }
}

// works
const getFriends = async (req, res) => {
    const jwt = req.headers['authorization']
    const username = req.params.id;
    try {
        const friends = await userServices.getFriends(jwt, username);
        return res.json(friends)
    } catch (error) {
        return res.status(404).send("User not exists");
    }
}

// works
const askFriend = async (req, res) => {
    const jwt = req.headers['authorization']
    const friend = req.params.id;
    try {
        await userServices.askFriend(jwt, friend);
        return res.status(200).send("Friend request sent");
    } catch (error) {
        return res.status(404).json(friend + " not exists");
    }
}

// works
const deleteFriend = async (req, res) => {
    const jwt = req.headers['authorization']
    const username = req.params.id;
    const friend = req.params.fid;
    try {
        await userServices.deleteFriend(jwt, username, friend);
        return res.status(200).send("Friend deleted");
    } catch (error) {
        return res.status(404).send("User or friend not exists");
    }
}

module.exports = { createUser, getUser, editUser, deleteUser, updateUser, addFriend, getFriends, askFriend, deleteFriend};