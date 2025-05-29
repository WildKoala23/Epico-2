const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Relation = require('../models/relationshipModel')
const sequelize = require('sequelize')
const VALID_TOKEN = 'sleep_token'
const Log = require('../models/logModel')
const Application = require('../models/appModel')


async function generateToken(user) {

    const token = jwt.sign({ id: user.id, name: user.name, roleId: user.roleId }, VALID_TOKEN, { expiresIn: '5h' })

    return token
}

// Middleware to record operation in databse
// If success = true -> Operation was sucessfull (no middleware detected foreign auth)
// If sucess = false -> Operation was not sucessfull 
async function recordLog(message) {
    try {
        const data = await Log.create({
            operation: message
        });
        return data;
    } catch (err) {
        console.error("Failed to log operation:", err);
        return null;
    }
}


// Only authenticated users may access the application
function authenticateJWT() {
    return async function (req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            await recordLog("User not authenticated tried to do an operation")
            return res.status(401).json({ message: 'Token missing or malformed' });
        }

        const token = authHeader.split(' ')[1];

        console.log("Token:")
        console.log(token);

        try {
            const decoded = jwt.verify(token, VALID_TOKEN);
            req.user = decoded; // attach decoded user info to request
            //console.log(req.user)
            await recordLog('User [' + req.user.id + "] logged in")
            console.log("User autheticated")
            return next(); // proceed to route handler
        } catch (err) {
            await recordLog("User not authenticated tried to do an operation")
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    }
}

//Check to see if user has permission to access app's password
// Implementation of ReBac (I think)
function checkPermissions(permissions) {
    return async function (req, res, next) {
        try {
            const appid = Number(req.params.appid);

            if (!Number.isInteger(appid)) {
                return res.status(400).json({ success: false, message: "Invalid appid" });
            }

            console.log(appid)


            const app = await Application.findByPk(appid)
            // Check to see if app exists
            if (!app) {
                await recordLog("None existing app was tried to access")
                return res.status(400).json({ error: 'App does not exist' });
            }



            //Get the user permissions to the specific app
            const relations = await Relation.findAll({
                where: {
                    objectId: appid,
                    subjectId: req.user.id
                }
            })

            const userPermissions = relations.map(p => p.dataValues.relation)
            console.log(userPermissions)

            // Check if user is allowed to do operation
            const hasPermission = userPermissions.some(element => permissions.includes(element));

            if (hasPermission) {
                await recordLog(req.user.name + " accessed" + app.name + "[" + app.name + "]")
                return next();
            } else {
                await recordLog(req.user.name + " tried to access/alter " + app.name + "without permission", req.user.id, app.appid)
                return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

// Function to simulate loggind for creation of mocks
function validateCredentials() {
    return function (req, res, next) {
        console.log('Validating credentials');
        return next();
    }
}

module.exports = { generateToken, authenticateJWT, checkPermissions, validateCredentials };