"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Tenants",
      [
        {
          name: "Acme Corporation",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Globex Industries",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Initech Solutions",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Tenants", null, {});
  },
};
