const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_his', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;