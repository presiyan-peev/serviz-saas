const express = require("express");
const orderController = require("../controllers/orderController");
const { authenticate, addUserToReq } = require("../middleware/authMiddleware");
const {
  validateOrderInput,
  validateOrderUpdate,
} = require("../middleware/orderMiddleware");
const router = express.Router();

router.get("/orders", authenticate, addUserToReq, orderController.getOrders);
router.get(
  "/orders/:id",
  authenticate,
  addUserToReq,
  orderController.getOrderById
);
router.delete(
  "/orders/:id",
  authenticate,
  addUserToReq,
  orderController.deleteOrder
);
router.put(
  "/orders/:id",
  authenticate,
  addUserToReq,
  validateOrderUpdate,
  orderController.updateOrder
);
router.post(
  "/orders",
  authenticate,
  addUserToReq,
  validateOrderInput,
  orderController.createOrder
);

module.exports = router;
