const tokenService = require('../services/Token');

// createToken is a function that creates a token for a new user
const createToken = async (req, res) => {
    const { username, password } = req.body;
    const headers = JSON.stringify(req.headers);
    if (headers.includes("androidtoken")) {
        const androidToken = JSON.parse(headers).androidtoken;
        try {
            const token = await tokenService.createToken(username, password, androidToken);
            return res.status(200).send(token);
        } catch (error) {
            return res.status(404).send("Incorrect username and/or password1");
        }
    }

    else {
        try {
            const token = await tokenService.createToken(username, password, "");
            return res.status(200).send(token);
        } catch (error) {
            return res.status(404).send(error.message);
        } 
    }
}

const verifyToken = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);
    try {
        return res.JSON(await tokenService.verifyToken(username, password));
         
    } catch (error) {
        return res.null
    }
}

module.exports = { createToken, verifyToken };