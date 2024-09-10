const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Appointment extends Model {
    static associate(models) {
      // Define associations here
      Appointment.belongsTo(models.Customer, { foreignKey: "customerId" });
      Appointment.belongsTo(models.Car, { foreignKey: "carId" });
    }
  }

  Appointment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Customers",
          key: "id",
        },
      },
      carId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Cars",
          key: "id",
        },
      },
      appointmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      serviceType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      status: {
        type: DataTypes.ENUM(
          "scheduled",
          "in-progress",
          "completed",
          "cancelled"
        ),
        allowNull: false,
        defaultValue: "scheduled",
      },
    },
    {
      sequelize,
      modelName: "Appointment",
      timestamps: true,
      paranoid: true, // Enables soft deletes
    }
  );

  return Appointment;
};
