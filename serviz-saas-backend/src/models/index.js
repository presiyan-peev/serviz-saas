const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

// Import models
const User = require("./user")(sequelize, DataTypes);
const Order = require("./order")(sequelize, DataTypes);
const Appointment = require("./appointment")(sequelize, DataTypes);
const Customer = require("./customer")(sequelize, DataTypes);
const Car = require("./car")(sequelize, DataTypes);
const Tenant = require("./tenant")(sequelize, DataTypes);

// Define associations
Tenant.hasMany(User);
User.belongsTo(Tenant);

User.hasMany(Order);
Order.belongsTo(User);

Customer.hasMany(Car);
Car.belongsTo(Customer);

Customer.hasMany(Appointment);
Appointment.belongsTo(Customer);

Car.hasMany(Appointment);
Appointment.belongsTo(Car);

// Test the connection
sequelize
  .authenticate()
  .then(() =>
    console.log("Database connection has been established successfully.")
  )
  .catch((err) => console.error("Unable to connect to the database:", err));

module.exports = {
  sequelize,
  User,
  Order,
  Appointment,
  Customer,
  Car,
  Tenant,
};
