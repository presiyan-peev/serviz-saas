const { User } = require("../../models");
const userService = require("../services/userService");

exports.createUser = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    const creatorRole = req.user.role;
    const creatorTenantId = req.user.tenantId;

    // Access control checks
    if (!["admin", "manager"].includes(creatorRole)) {
      return res
        .status(403)
        .json({ error: "Forbidden: Insufficient permissions" });
    }

    // Role validation based on creator's role
    if (creatorRole === "manager" && !["mechanic", "manager"].includes(role)) {
      return res
        .status(403)
        .json({ error: "Forbidden: Invalid role assignment" });
    }

    // Determine tenantId
    let tenantId = creatorTenantId;
    if (creatorRole === "admin" && role === "admin") {
      tenantId = "00000000-0000-0000-0000-000000000000";
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      role,
      tenantId,
    });

    res
      .status(201)
      .json({ message: "User created successfully", userId: user.name });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort, filter } = req.query;
    const users = await userService.getUsers(req.user, {
      page,
      limit,
      sort,
      filter,
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById(req.user, userId);
    if (!user) {
      return res
        .status(404)
        .json({ error: "Fetch user failed: User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Implement updateUser and deleteUser similarly
exports.updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;
    const updatedUser = await userService.updateUser(
      req.user,
      userId,
      updateData
    );
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await userService.deleteUser(req.user, userId);
    res.status(204).send(); // No content to return on successful deletion
  } catch (error) {
    next(error);
  }
};
