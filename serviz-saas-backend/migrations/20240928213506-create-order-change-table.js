"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("OrderChanges", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      orderId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Orders",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      changeType: {
        type: Sequelize.ENUM("DELETE", "PATCH", "CREATE", "RESTORE", "PUT"),
        allowNull: false,
      },
      changes: {
        type: Sequelize.JSON,
        allowNull: false,
      },
    });

    await queryInterface.addIndex("OrderChanges", ["orderId"]);
    await queryInterface.addIndex("OrderChanges", ["userId"]);
    await queryInterface.addIndex("OrderChanges", ["timestamp"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("OrderChanges");
  },
};
