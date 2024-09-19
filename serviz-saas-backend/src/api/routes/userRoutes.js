const express = require("express");
const userController = require("../controllers/userController");
const { authenticate, addUserToReq } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/users", authenticate, addUserToReq, userController.getUsers);
router.get(
  "/users/:userId",
  authenticate,
  addUserToReq,
  userController.getUserById
);
router.post("/users", authenticate, addUserToReq, userController.createUser);
router.put(
  "/users/:userId",
  authenticate,
  addUserToReq,
  userController.updateUser
);
router.delete(
  "/users/:userId",
  authenticate,
  addUserToReq,
  userController.deleteUser
);

module.exports = router;
