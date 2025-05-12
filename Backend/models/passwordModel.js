var Sequelize = require('sequelize')
var sequelize = require('./db')

var Application = require('./appModel')

var Password = sequelize.define(
    'passwords',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        password: Sequelize.STRING,
        appid: {
            type: Sequelize.INTEGER,
            references: {
                model: Application,
                key: 'appid'
            }
        }
    },
    {
        timestamps: false
    }
)

Password.belongsTo(Application)

module.exports = Password;