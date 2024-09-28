const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "userId" });
      Order.belongsTo(models.Tenant, { foreignKey: "tenantId" });
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
      tenantId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Tenants",
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
      notes: {
        type: DataTypes.STRING,
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
