"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, fetch the customer IDs
    const customers = await queryInterface.sequelize.query(
      `SELECT id from "Customers";`
    );

    const customerRows = customers[0];

    return queryInterface.bulkInsert(
      "Cars",
      [
        {
          customerId: customerRows[0].id,
          make: "Toyota",
          model: "Camry",
          year: 2018,
          licensePlate: "ABC123",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          customerId: customerRows[1].id,
          make: "Honda",
          model: "Civic",
          year: 2019,
          licensePlate: "XYZ789",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Cars", null, {});
  },
};
