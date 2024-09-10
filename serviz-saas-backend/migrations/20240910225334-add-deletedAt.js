"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get all table names
    const tables = await queryInterface.showAllTables();

    for (const tableName of tables) {
      // Check if the deletedAt column already exists
      const tableDescription = await queryInterface.describeTable(tableName);
      if (!tableDescription.deletedAt) {
        await queryInterface.addColumn(tableName, "deletedAt", {
          type: Sequelize.DATE,
          allowNull: true,
        });
        console.log(`Added deletedAt column to ${tableName}`);
      } else {
        console.log(`deletedAt column already exists in ${tableName}`);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tables = await queryInterface.showAllTables();

    for (const tableName of tables) {
      // Check if the deletedAt column exists before trying to remove it
      const tableDescription = await queryInterface.describeTable(tableName);
      if (tableDescription.deletedAt) {
        await queryInterface.removeColumn(tableName, "deletedAt");
        console.log(`Removed deletedAt column from ${tableName}`);
      } else {
        console.log(`deletedAt column does not exist in ${tableName}`);
      }
    }
  },
};
