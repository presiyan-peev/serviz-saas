"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add tenantId to Customers
    await queryInterface.addColumn("Customers", "tenantId", {
      type: Sequelize.UUID,
      allowNull: true, // Initially allow null
    });

    // Add tenantId to Cars
    await queryInterface.addColumn("Cars", "tenantId", {
      type: Sequelize.UUID,
      allowNull: true, // Initially allow null
    });

    // Update existing records with the default tenant ID
    const defaultTenantId = "52484ac0-3839-45ec-bcbf-7758c54ebe07";
    await queryInterface.sequelize.query(`
      UPDATE "Customers" SET "tenantId" = '${defaultTenantId}' WHERE "tenantId" IS NULL;
    `);
    await queryInterface.sequelize.query(`
      UPDATE "Cars" SET "tenantId" = '${defaultTenantId}' WHERE "tenantId" IS NULL;
    `);

    // Change tenantId to non-nullable in Customers
    await queryInterface.changeColumn("Customers", "tenantId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "Tenants",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    // Change tenantId to non-nullable in Cars
    await queryInterface.changeColumn("Cars", "tenantId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "Tenants",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Customers", "tenantId");
    await queryInterface.removeColumn("Cars", "tenantId");
  },
};
