"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "admin",
          email: "admin@serviz.com",
          password: bcrypt.hashSync("admin123", 10),
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "mechanic1",
          email: "mechanic1@serviz.com",
          password: bcrypt.hashSync("mech123", 10),
          role: "mechanic",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "manager1",
          email: "manager1@serviz.com",
          password: bcrypt.hashSync("manager123", 10),
          role: "manager",
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
