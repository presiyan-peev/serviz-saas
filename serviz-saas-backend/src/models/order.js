const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Order extends Model {
    static associate(models) {
      // Define associations here
      // e.g., Order.belongsTo(models.User)
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      orderNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: "Order",
      timestamps: true,
      paranoid: true, // Enables soft deletes
    }
  );

  return Order;
};