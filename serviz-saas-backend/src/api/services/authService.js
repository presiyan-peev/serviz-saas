const { User, Tenant } = require("../../models"); // Import models from index.js
const { generateToken } = require("../../utils/jwtUtils");
const { sequelize } = require("../../models"); // Import sequelize instance
const { Op } = require("sequelize");
const { ApiError } = require("../../utils/ApiError");

exports.signup = async (username, email, password, tenantName) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const tenant = await Tenant.create({ name: tenantName }, { transaction });

    const user = await User.create(
      {
        username,
        email,
        password,
        tenantId: tenant.id,
        role: "manager",
      },
      { transaction }
    );

    await transaction.commit();
    return generateToken(user.id, tenant.id);
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw new ApiError("Signup failed", {
      cause: 400,
      internalCode: "Ex10011",
    });
  }
};

exports.login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new ApiError("Login failed: User not found", {
      cause: 404,
      internalCode: "Ex10021",
    });
  }

  const isPasswordValid = await user.verifyPassword(password);
  if (!isPasswordValid) {
    throw new ApiError("Login failed: Invalid password", {
      cause: 401,
      internalCode: "Ex10022",
    });
  }

  return generateToken(user.id, user.tenantId);
};

exports.changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new ApiError("Change password failed: User not found", {
      cause: 404,
      internalCode: "Ex10031",
    });
  }

  const isPasswordValid = await user.verifyPassword(oldPassword);
  if (!isPasswordValid) {
    throw new ApiError("Change password failed: Invalid old password", {
      cause: 401,
      internalCode: "Ex10032",
    });
  }

  user.password = newPassword;
  await user.save();
};

exports.forgotPassword = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new ApiError("Forgot password failed: User not found", {
      cause: 404,
      internalCode: "Ex10041",
    });
  }

  // Generate a password reset token (you may want to use a library for this)
  const resetToken = Math.random().toString(36).substr(2, 10);
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  // Send email with reset token (implement email sending logic)
  // ...

  return resetToken;
};

exports.resetPassword = async (resetToken, newPassword) => {
  const user = await User.findOne({
    where: {
      resetPasswordToken: resetToken,
      resetPasswordExpires: { [Op.gt]: Date.now() },
    },
  });

  if (!user) {
    throw new ApiError(
      "Reset password failed: Invalid or expired reset token",
      {
        cause: 400,
        internalCode: "Ex10051",
      }
    );
  }

  user.password = newPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();
};

// Implement other auth methods (login, changePassword, etc.)
