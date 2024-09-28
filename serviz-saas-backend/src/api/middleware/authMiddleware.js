const { verifyToken } = require("../../utils/jwtUtils");
const { User } = require("../../models"); // Import models from index.js

exports.authenticate = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (!token) {
    throw new Error("No token provided", { cause: 401 });
  }
  try {
    const decoded = verifyToken(token);
    req.userId = decoded.id;
    req.tenantId = decoded.tenantId;
    next();
  } catch (error) {
    throw new Error("Invalid token", { cause: 401 });
  }
};

exports.addUserToReq = async (req, res, next) => {
  console.log("in addUserToReq");
  try {
    if (!req.userId) {
      throw new Error("Authentication required", { cause: 401 });
    }

    const user = await User.findByPk(req.userId);
    if (!user) {
      throw new Error("Logged-in user not found", { cause: 401 });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in addUserToReq middleware:", error);
    throw new Error("Server error while adding user to request", {
      cause: 500,
    });
  }
};
