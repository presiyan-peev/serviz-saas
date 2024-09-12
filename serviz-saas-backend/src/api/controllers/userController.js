const { User } = require("../../models");

exports.createUser = async (req, res) => {
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
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
