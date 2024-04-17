const userServices = require('../services/User');

const createUser = async (req, res) => {
    const { name, username, password, profilePic, androidToken } = req.body;
    try {
        await userServices.createUser(name, username, password, profilePic, androidToken);
        return res.status(201).send("User created");
    } catch (error) {
        return res.status(400).send("User already exists");
    }
}

const getUser = async (req, res) => {
    const { username } = req.params;
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

const updateUser = async (req, res) => {
    const { username } = req.params;
    const { name, profilePic } = req.body;
    try {
        await userServices.updateUser(username, name, profilePic);
        return res.status(200).send("User updated");
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

module.exports = { createUser, getUser, deleteUser, updateUser, addFriend, getFriends, askFriend, deleteFriend};