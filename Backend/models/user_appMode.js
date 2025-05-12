var Sequelize = require('sequelize')
var sequelize = require('./db')

var User = require('./userModel')
var App = require('./appModel') 


var User_App = sequelize.define(
    'user_app',
    {
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: User,
                key:'id'
            }
        },
        appId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: App,
                key: 'appid'
            }
        }
    }
)

sequelize.sync()
    .then(() => {
        console.log('User_App table created successfully!');
    })
    .catch((err) => {
        console.error('Error creating table:', err);
    });

User.belongsToMany(App, {
    through: User_App, 
    foreignKey: 'userId', 
});

App.belongsToMany(User, {
    through: User_App, 
    foreignKey: 'appId',
      });


module.exports = User_App