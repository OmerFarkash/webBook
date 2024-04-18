const userServices = require('../services/User');

// works
const createUser = async (req, res) => {
    const { name, username, password, profilePic } = req.body;
    try {
        user = await userServices.createUser(name, username, password, profilePic);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(404).send(error.message);
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
    const { username } = req.params;
    try {
        await userServices.deleteUser(username);
        return res.status(200).send("User deleted");
    } catch (error) {
        return res.status(404).send("User not exists");
    }
}

// works
const updateUser = async (req, res) => {
    const jwt = req.headers['authorization']?.replace('Bearer ', '')
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
    const jwt = req.headers['authorization']?.replace('Bearer ', '')
    const username = req.params.id;
    const newUsername = req.body.username;
    const newProfilePic = req.body.profilePic;
    try {
        return res.json(await userServices.editUser(username, jwt, newUsername, newProfilePic));
    } catch (error) {
        return res.status(404).send("User not exists");
    }
}

const addFriend = async (req, res) => {
    const { username, friend } = req.params;
    try {
        await userServices.addFriend(username, friend);
        return res.status(200).send("Friend added");
    } catch (error) {
        return res.status(404).send("User not exists");
    }
}

const getFriends = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await userServices.getUser(username);
        return res.status(200).send(user.friends);
    } catch (error) {
        return res.status(404).send("User not exists");
    }
}

const askFriend = async (req, res) => {
    const { username, friend } = req.params;
    try {
        await userServices.askFriend(username, friend);
        return res.status(200).send("Friend request sent");
    } catch (error) {
        return res.status(404).send("User not exists");
    }
}

const deleteFriend = async (req, res) => {
    const { username, friend } = req.params;
    try {
        await userServices.deleteFriend(username, friend);
        return res.status(200).send("Friend deleted");
    } catch (error) {
        return res.status(404).send("User or friend not exists");
    }
}

module.exports = { createUser, getUser, editUser, deleteUser, updateUser, addFriend, getFriends, askFriend, deleteFriend};