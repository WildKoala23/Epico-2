var Sequelize = require('sequelize')
var sequelize = require('./db')

var Role = sequelize.define(
    'role',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        desc: Sequelize.STRING
    },
    {
        timestamps: false
    }
)

sequelize.sync()
    .then(() => {
        console.log('Roles table created successfully!');
    })
    .catch((err) => {
        console.error('Error creating table:', err);
    });

module.exports = Role;