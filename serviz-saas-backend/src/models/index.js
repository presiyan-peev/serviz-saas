const fs = require("fs");
const path = require("path");

const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const basename = path.basename(__filename);
const db = {};

// Import models
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Define associations
// Tenant.hasMany(User);
// User.belongsTo(Tenant);

// TODO - premesti gi tiq po modelite

// User.hasMany(Order);
// Order.belongsTo(User);

// Customer.hasMany(Car);
// Car.belongsTo(Customer);

// Customer.hasMany(Appointment);
// Appointment.belongsTo(Customer);

// Car.hasMany(Appointment);
// Appointment.belongsTo(Car);

// Test the connection
sequelize
  .authenticate()
  .then(() =>
    console.log("Database connection has been established successfully.")
  )
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    console.log("Connection details:", sequelize.config);
  });

db.sequelize = sequelize;

module.exports = { ...db };
