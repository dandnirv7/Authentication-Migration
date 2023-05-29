const { Sequelize } = require("sequelize");

require("dotenv").config();

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const dbName = DB_NAME,
  dbHost = DB_HOST,
  dbUsername = DB_USERNAME,
  dbPassword = DB_PASSWORD,
  dbDialect = "mysql";

const sequelizeConnection = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
});

module.exports = sequelizeConnection;
