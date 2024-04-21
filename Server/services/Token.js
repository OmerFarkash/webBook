const User = require('../models/User');
const jwt = require("jsonwebtoken");

const secretKey = "Shhhhh...";

const createToken = async (username, password, androidToken) => {
    var user = await User.findOne({ username });
    
    if (user === null) {
        throw new Error('User not found');
    }
    
    if (androidToken !== "") {
        return verifyToken(androidToken);
    }
    const token = jwt.sign({ username , password }, secretKey);

    await User.findOneAndUpdate({ username }, { androidToken: token });
    return token;
}

const verifyToken = async (username, password) => {
    try {
        console.log(username);
        const token = jwt.sign({ username , password }, secretKey);
        const user = await User.findOne({ username });
        const userToken = user.androidToken;
        console.log(user);
        if (token === userToken) {
            return JSON.stringify(userToken);
        }
    } catch (err) {
        throw new Error('Invalide token');
    }
}

module.exports = { createToken, verifyToken };