var Sequelize = require('sequelize')
var sequelize = require('./db')

var User = sequelize.define(
    'user',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING,
    },
    {
        timestamps: false
    }
)

sequelize.sync()
    .then(() => {
        console.log('User table created successfully!');
    })
    .catch((err) => {
        console.error('Error creating table:', err);
    });

module.exports = User