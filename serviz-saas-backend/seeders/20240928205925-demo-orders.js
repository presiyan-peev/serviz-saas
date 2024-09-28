"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Orders",
      [
        {
          id: uuidv4(),
          orderNumber: "1233",
          userId: "0109d731-db5c-4f26-8e6c-6cc09ef96449",
          tenantId: "a5ffebcb-48e7-48f7-a5a2-fb82abebaf7b",
          value: 32.23,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          orderNumber: "1234",
          userId: "1109d731-db5c-4f26-8e6c-6cc09ef96449",
          tenantId: "a5ffebcb-48e7-48f7-a5a2-fb82abebaf7b",
          value: 322.23,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          orderNumber: "19",
          userId: "2977bb6f-f5ce-45c4-a042-2d7f2de2f1ef",
          tenantId: "52484ac0-3839-45ec-bcbf-7758c54ebe07",
          value: 322.21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
