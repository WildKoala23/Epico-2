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
        password: Sequelize.INTEGER,
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

sequelize.sync()
    .then(() => {
        console.log('Password table created successfully!');
    })
    .catch((err) => {
        console.error('Error creating table:', err);
    });

Password.belongsTo(Application)

module.exports = Password;