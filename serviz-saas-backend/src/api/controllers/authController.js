const authService = require("../services/authService");

exports.signup = async (req, res) => {
  try {
    const { username, email, tenantName, password } = req.body;
    const token = await authService.signup(
      username,
      email,
      password,
      tenantName
    );
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });
    res.json({ message: "User created and Login successful" });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });
    res.json({ message: "Login successful" });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    await authService.changePassword(req.userId, oldPassword, newPassword);
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const resetToken = await authService.forgotPassword(email);
    res.json({ message: "Password reset email sent", resetToken });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { resetToken, password } = req.body;
    await authService.resetPassword(resetToken, password);
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  res.clearCookie("auth_token");
  res.json({ message: "Logout successful" });
};
// Implement other controller methods
