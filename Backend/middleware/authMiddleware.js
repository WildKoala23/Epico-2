const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Relation = require('../models/relationshipModel')
const { where } = require('sequelize')
const VALID_TOKEN = 'sleep_token'


async function generateToken(user) {

    const token = jwt.sign({ id: user.id, name: user.name, roleId: user.roleId }, VALID_TOKEN, { expiresIn: '1h' })

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
        console.log(req.user)
        next(); // proceed to route handler
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

//Check to see if user has permission to access app's password
// Implementation of ReBac (I think)
function checkPermissions(permissions) {
    return async function (req, res, next) {
        try {
            console.log(permissions)
            // Get the user from the jwt
            const user = req.user
            console.log(user)
            //Get the app from the parameters
            const { appid } = req.params
            console.log(appid)

            //Get the user permissions to the specific app
            const relations = await Relation.findAll({
                where: {
                    objectId: appid,
                    subjectId: user.id
                }
            })

            const userPermissions = relations.map(p => p.dataValues.relation)
            console.log(userPermissions)

            // Check if user is allowed to do operation
            const hasPermission = userPermissions.some(element => permissions.includes(element));

            if (hasPermission) {
                return next();
            } else {
                return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
            }
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}


module.exports = { generateToken, authenticateJWT, checkPermissions };