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

sequelize.sync()
    .then(() => {
        console.log('App table created successfully!');
    })
    .catch((err) => {
        console.error('Error creating table:', err);
    });

module.exports = Application;