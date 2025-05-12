var Sequelize = require('sequelize')
var sequelize = require('./db')

var Role = require('./rolesModel')

var User = sequelize.define(
    'user',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING,
        roleId: {
            type: Sequelize.INTEGER,
            references: {
                model: Role,
                key: 'id'
            }
        }
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

User.belongsTo(Role)

module.exports = User