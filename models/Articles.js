const db = require('./db');
const Sequelize = require('sequelize');

module.exports = db.defineModel('articles', {
  classid: Sequelize.BIGINT,
  title: Sequelize.STRING(100),
  info: Sequelize.STRING(255),
  content: Sequelize.TEXT,
  author: Sequelize.STRING(50),
  ispublish: Sequelize.BOOLEAN,
  sortnumber:Sequelize.INTEGER
})
