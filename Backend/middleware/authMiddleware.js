const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Role = require('../models/rolesModel')
const VALID_TOKEN = 'sleep_token'


async function generateToken(user) {

    const token = jwt.sign({ id: user.id, name: user.name, roleId: user.roleId }, VALID_TOKEN, { expiresIn: '1h' })
    
    console.log("User token:")
    console.log(token)

    return token
}


// Only authenticated users may access the application
function authenticateJWT(req, res, next) {
    
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    console.log("Token:")
    console.log(token);

    try {
        const decoded = jwt.verify(token, VALID_TOKEN);
        req.user = decoded; // attach decoded user info to request
        console.log(decoded)
        next(); // proceed to route handler
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

//Check to see if user has permission to access app's password
async function checkAppPermission(req, res, next, permission) {
    const { appid } = req.params;
    const user = req.user
    console.log(user)
    try {
        const role = await Role.findByPk(user.roleId)
    } catch (error) {
        return res.status(500).json({error: "Internal server error"})
    }
}

module.exports = {generateToken, authenticateJWT, checkAppPermission };