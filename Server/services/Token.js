const User = require('../models/User');
const jwt = require("jsonwebtoken");

const secretKey = "Shhhhh...";

const createToken = async (username, password, androidToken) => {
    var user = await User.findOne({ username });

    if (user === null) {
        throw new Error('User not found');
    }

    if (user.password !== password) {
        throw new Error('Password is incorrect');
    }

    if (androidToken !== "") {
        return verifyToken(androidToken);
    }
    const token = jwt.sign({ username }, secretKey);

    await User.findOneAndUpdate({ username }, { androidToken: token });
    return token;
}

const verifyToken = (token) => {
    try {
        const data = jwt.verify(token, secretKey);
        return data;
    } catch (err) {
        throw new Error('Invalide token');
    }
}

module.exports = { createToken, verifyToken };