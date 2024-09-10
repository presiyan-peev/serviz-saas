const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Car extends Model {
    static associate(models) {
      // Define associations here
      Car.belongsTo(models.Customer);
    }
  }

  Car.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Customers",
          key: "id",
        },
      },
      make: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1900,
          max: new Date().getFullYear() + 1,
        },
      },
      licensePlate: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      oldLicensePlates: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        unique: true,
      },
      vin: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: true,
          len: [17, 17],
        },
      },
    },
    {
      sequelize,
      modelName: "Car",
      timestamps: true,
      paranoid: true, // Enables soft deletes
    }
  );

  return Car;
};
