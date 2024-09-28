const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class OrderChange extends Model {
    static associate(models) {
      OrderChange.belongsTo(models.Order, { foreignKey: "orderId" });
      OrderChange.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  OrderChange.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Orders",
          key: "id",
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
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      changeType: {
        type: DataTypes.ENUM("DELETE", "PATCH"),
        allowNull: false,
      },
      changes: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderChange",
      timestamps: false,
    }
  );

  return OrderChange;
};
