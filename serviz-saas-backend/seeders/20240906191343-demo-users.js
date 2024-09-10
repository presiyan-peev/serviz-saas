"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get the ID of the first tenant (Acme Corporation)
    const [tenants] = await queryInterface.sequelize.query(
      `SELECT id FROM "Tenants" WHERE name = 'Acme Corporation' LIMIT 1;`
    );
    const tenantId = tenants[0].id;

    return queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "admin",
          email: "admin@serviz.com",
          password: bcrypt.hashSync("admin123", 10),
          role: "admin",
          tenantId: tenantId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "mechanic1",
          email: "mechanic1@serviz.com",
          password: bcrypt.hashSync("mech123", 10),
          role: "mechanic",
          tenantId: tenantId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "manager1",
          email: "manager1@serviz.com",
          password: bcrypt.hashSync("manager123", 10),
          role: "manager",
          tenantId: tenantId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
