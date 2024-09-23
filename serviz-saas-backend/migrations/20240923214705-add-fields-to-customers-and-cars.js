"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add new fields to Customers
    await queryInterface.addColumn("Customers", "notes", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Add new fields to Cars
    await queryInterface.addColumn("Cars", "power", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Cars", "fuel", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Cars", "cubicCapacity", {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove new fields from Customers
    await queryInterface.removeColumn("Customers", "notes");

    // Remove new fields from Cars
    await queryInterface.removeColumn("Cars", "power");
    await queryInterface.removeColumn("Cars", "fuel");
    await queryInterface.removeColumn("Cars", "cubicCapacity");
  },
};
