var Sequelize = require('sequelize')
var sequelize = require('./db')


// Implement relationship model for ReBac
var Relationship = sequelize.define(
    'relationships',
    {
        // The ID of the app
        objectId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },

        // Owener, viewer, etc
        relation: {
            type: Sequelize.STRING,
            primaryKey: true
        },

        // The ID of the user
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