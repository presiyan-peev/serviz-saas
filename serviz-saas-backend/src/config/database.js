const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "db", // 'db' is the service name in docker-compose
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

console.log("Database connection details:", {
  host: process.env.DB_HOST || "default_host",
  port: process.env.DB_PORT || "default_port",
  database: process.env.DB_NAME || "default_db_name",
});

module.exports = sequelize;
