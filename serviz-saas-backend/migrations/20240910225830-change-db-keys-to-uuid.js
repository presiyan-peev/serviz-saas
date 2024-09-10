"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Helper function to change column type
    const changeColumnType = async (
      tableName,
      columnName,
      isPrimaryKey = false
    ) => {
      // Get all constraints for the table
      const constraints = await queryInterface.showConstraint(tableName);

      if (isPrimaryKey) {
        // Find and remove the primary key constraint
        const pkConstraint = constraints.find(
          (constraint) =>
            constraint.constraintType === "PRIMARY KEY" &&
            constraint.columnNames &&
            constraint.columnNames.includes(columnName)
        );
        if (pkConstraint) {
          await queryInterface.removeConstraint(
            tableName,
            pkConstraint.constraintName
          );
        }
      }

      // Find and remove foreign key constraints
      const fkConstraints = constraints.filter(
        (constraint) =>
          constraint.constraintType === "FOREIGN KEY" &&
          constraint.columnNames &&
          constraint.columnNames.includes(columnName)
      );
      for (const fkConstraint of fkConstraints) {
        await queryInterface.removeConstraint(
          tableName,
          fkConstraint.constraintName
        );
      }

      // First, add a new UUID column
      await queryInterface.addColumn(tableName, `${columnName}_uuid`, {
        type: Sequelize.UUID,
        allowNull: true,
      });

      // Update the new column with UUID values
      await queryInterface.sequelize.query(`
        UPDATE "${tableName}" 
        SET "${columnName}_uuid" = uuid_generate_v4()
      `);

      // Make the new column not nullable
      await queryInterface.changeColumn(tableName, `${columnName}_uuid`, {
        type: Sequelize.UUID,
        allowNull: false,
      });

      // Drop the old column
      await queryInterface.removeColumn(tableName, columnName);

      // Rename the new column to the original name
      await queryInterface.renameColumn(
        tableName,
        `${columnName}_uuid`,
        columnName
      );

      if (isPrimaryKey) {
        // Add back the primary key constraint
        await queryInterface.addConstraint(tableName, {
          fields: [columnName],
          type: "primary key",
          name: `${tableName}_pkey`,
        });
      }

      // Re-add foreign key constraints (this part is tricky and might need manual adjustment)
      for (const fkConstraint of fkConstraints) {
        if (
          fkConstraint.referencedTableName &&
          fkConstraint.referencedColumnNames
        ) {
          await queryInterface.addConstraint(tableName, {
            fields: [columnName],
            type: "foreign key",
            name: fkConstraint.constraintName,
            references: {
              table: fkConstraint.referencedTableName,
              field: fkConstraint.referencedColumnNames[0],
            },
            onDelete: fkConstraint.deleteAction,
            onUpdate: fkConstraint.updateAction,
          });
        }
      }
    };

    // First, ensure the uuid-ossp extension is available
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );

    // Get all table names
    const tables = await queryInterface.showAllTables();

    for (const tableName of tables) {
      const tableDescription = await queryInterface.describeTable(tableName);

      // Change primary key to UUID
      if (tableDescription.id && tableDescription.id.type === "INTEGER") {
        await changeColumnType(tableName, "id", true);
        console.log(`Changed id to UUID in ${tableName}`);
      }

      // Change foreign keys to UUID
      for (const columnName in tableDescription) {
        if (
          columnName.endsWith("Id") &&
          tableDescription[columnName].type === "INTEGER"
        ) {
          await changeColumnType(tableName, columnName);
          console.log(`Changed ${columnName} to UUID in ${tableName}`);
        }
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    throw new Error(
      "This migration cannot be undone automatically. Please restore from a backup if needed."
    );
  },
};
