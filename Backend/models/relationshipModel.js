var Sequelize = require('sequelize')
var sequelize = require('./db')


// Implement relationship model for ReBac
var Relationship = sequelize.define(
    'relationships',
    {
        // Password or App
        objectType: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        objectId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },

        // Owener, viewer, etc
        relation: {
            type: Sequelize.STRING,
            primaryKey: true
        },

        // User or App
        subjectType: {
            type: Sequelize.STRING,
            primaryKey: true
        },

        subjectId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },

    },
    {
        timestamps: false
    }
)


module.exports = Relationship