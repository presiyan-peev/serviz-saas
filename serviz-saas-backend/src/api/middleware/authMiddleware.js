const { verifyToken } = require("../../utils/jwtUtils");
const { User } = require("../../models"); // Import models from index.js

exports.authenticate = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = verifyToken(token);
    req.userId = decoded.id;
    req.tenantId = decoded.tenantId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Access denied. Admin role required." });
    }
    req.user = user; // Optionally attach the user object to the request
    next();
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    res.status(500).json({ error: "Server error" });
  }
};
