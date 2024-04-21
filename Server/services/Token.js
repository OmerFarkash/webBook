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
const verifyToken = (token) => {
    try {
        const data = jwt.verify(token, secretKey);
        return data;
    } catch (err) {
        throw new Error('Invalide token');
    }
}

const verifyLogin = async (username, password) => {
    try {
        const user = await User.findOne({ username });
        const token = user.androidToken;
        const res = jwt.decode(token, secretKey);
        
        if (password === res.password) {
            return JSON.stringify(token);
        }
    } catch (err) {
        throw new Error('Invalide token');
    }
}

module.exports = { createToken, verifyToken, verifyLogin };