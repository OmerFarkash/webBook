const tokenService = require('../services/Token');

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

const verifyToken = async (req, res, next) => {
    
    const token = req.headers['authorization']?.replace('Bearer ', '')
    
    if (token == null) {
        return res.status(403).send("Token required");    
    }

    try {
        req.username = tokenService.verifyToken(token).username;
        next();
    } catch (error) {
        return res.status(401).send("Unauthorized");
    }
}

module.exports = { createToken, verifyToken };