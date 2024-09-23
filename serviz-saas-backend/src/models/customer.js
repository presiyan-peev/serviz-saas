const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Customer extends Model {
    static associate(models) {
      // Define associations here
      // e.g., Customer.hasMany(models.Order)
      Customer.hasMany(models.Car); // Added association to Car
    }
  }

  Customer.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
      },
      facebook: {
        type: DataTypes.STRING, // To store the customer's Facebook profile link
      },
      notes: {
        type: DataTypes.STRING, // To store any additional notes about the customer
      },
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );

  return Customer;
};
