var Sequelize = require('sequelize')
var sequelize = require('./db')

const User = require('./userModel')
const Application = require('./appModel')

// Create a table for logging purposes

const Log = sequelize.define(
    'logs',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        operation: Sequelize.STRING
    },
    {
        timestamps: true
    }
)


module.exports = Log
