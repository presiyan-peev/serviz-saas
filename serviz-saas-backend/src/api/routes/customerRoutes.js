const express = require("express");
const customerController = require("../controllers/customerController");
const { authenticate, addUserToReq } = require("../middleware/authMiddleware");
const { validateCustomerInput } = require("../middleware/customerMiddleware");
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
router.post(
  "/customers",
  authenticate,
  addUserToReq,
  validateCustomerInput,
  customerController.createCustomer
);
router.put(
  "/customers/:id",
  authenticate,
  addUserToReq,
  validateCustomerInput,
  customerController.updateCustomer
);
router.delete(
  "/customers/:id",
  authenticate,
  addUserToReq,
  customerController.deleteCustomer
);

module.exports = router;
