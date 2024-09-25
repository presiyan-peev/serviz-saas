const express = require("express");
const customerController = require("../controllers/customerController");
const { authenticate, addUserToReq } = require("../middleware/authMiddleware");
const router = express.Router();

router.get(
  "/customers",
  authenticate,
  addUserToReq,
  customerController.getCustomers
);
router.get(
  "/customers/:id",
  authenticate,
  addUserToReq,
  customerController.getCustomerById
);

module.exports = router;
