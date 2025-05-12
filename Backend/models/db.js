var Sequelize = require('sequelize')
const sequelize = new Sequelize(
    'Epico_2',
    'postgres',
    'postgres',
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres'
    }
)

sequelize.sync()

module.exports = sequelize;