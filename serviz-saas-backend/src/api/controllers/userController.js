const { User } = require("../../models"); // Import models from index.js

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    // ... (previous validation code)

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      tenantId: req.tenantId,
      role,
    });

    // Return success response
    res
      .status(201)
      .json({ message: "User created successfully", userId: user._id });
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB duplicate key error
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
