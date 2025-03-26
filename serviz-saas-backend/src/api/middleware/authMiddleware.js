const { verifyToken } = require("../../utils/jwtUtils");
const { User } = require("../../models"); // Import models from index.js
const { ApiError } = require("../../utils/ApiError");

exports.authenticate = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (!token) {
    throw new ApiError("No token provided", {
      cause: 401,
      internalCode: "Ex10001",
    });
  }
  try {
    const decoded = verifyToken(token);
    req.userId = decoded.id;
    req.tenantId = decoded.tenantId;
    next();
  } catch (error) {
    throw new ApiError("Invalid token", {
      cause: 401,
      internalCode: "Ex10001",
    });
  }
};

exports.addUserToReq = async (req, res, next) => {
  try {
    if (!req.userId) {
      throw new ApiError("Authentication required", {
        cause: 401,
        internalCode: "Ex10001",
      });
    }

    const user = await User.findByPk(req.userId);
    if (!user) {
      throw new ApiError("Logged-in user not found", {
        cause: 401,
        internalCode: "Ex10001",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in addUserToReq middleware:", error);
    throw new ApiError("Server error while adding user to request", {
      cause: 500,
    });
  }
};
