const express = require("express");
const orderController = require("../controllers/orderController");
const { authenticate, addUserToReq } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/orders", authenticate, addUserToReq, orderController.getOrders);
router.get(
  "/orders/:id",
  authenticate,
  addUserToReq,
  orderController.getOrderById
);

module.exports = router;
