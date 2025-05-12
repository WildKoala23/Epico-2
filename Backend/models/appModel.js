var Sequelize = require('sequelize')
var sequelize = require('./db')

var Application = sequelize.define(
    'apps',
    {
        appid: {
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


module.exports = Application;