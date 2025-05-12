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


module.exports = User