const sequelize = require('./db');

require('./userModel');
require('./appModel');
require('./passwordModel');
require('./relationshipModel');


const initDB = async () => {
    try {
        await sequelize.sync({});
        console.log('All tables created!');
    } catch (err) {
        console.error('Error creating tables:', err);
    }
};

module.exports = initDB;
