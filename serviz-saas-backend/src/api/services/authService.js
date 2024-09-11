const bcrypt = require("bcryptjs");
const { User, Tenant } = require("../../models"); // Import models from index.js
const { generateToken } = require("../../utils/jwtUtils");
const { sequelize } = require("../../models"); // Import sequelize instance

exports.signup = async (username, email, password, tenantName) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const tenant = await Tenant.create({ name: tenantName }, { transaction });

    const user = await User.create(
      {
        username,
        email,
        password: password, // Don't hash the password here
        tenantId: tenant.id,
        role: "admin",
      },
      { transaction }
    );

    await transaction.commit();
    return generateToken(user.id, tenant.id);
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw error;
  }
};

exports.login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await user.verifyPassword(password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  return generateToken(user.id, user.tenantId);
};

exports.changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await user.verifyPassword(oldPassword);
  if (!isPasswordValid) {
    throw new Error("Invalid old password");
  }

  user.password = await User.hashPassword(newPassword);
  await user.save();
};

exports.forgotPassword = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found");
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
    throw new Error("Invalid or expired reset token");
  }

  user.password = await User.hashPassword(newPassword);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();
};

// Implement other auth methods (login, changePassword, etc.)
