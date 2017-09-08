const db = require('./db');
const Sequelize = require('sequelize');

module.exports = db.defineModel('class', {
  name: Sequelize.STRING(50),
  info: Sequelize.STRING(255),
  content: Sequelize.TEXT,
  ispublish: Sequelize.BOOLEAN,
  issingle: Sequelize.INTEGER
})
