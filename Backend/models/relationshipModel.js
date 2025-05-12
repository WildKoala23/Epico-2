var Sequelize = require('sequelize')
var sequelize = require('./db')

var User = require('./userModel')
var App = require('./appModel') 


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

sequelize.sync()
    .then(() => {
        console.log('Relationship table created successfully!');
    })
    .catch((err) => {
        console.error('Error creating table:', err);
    });



module.exports = Relationship