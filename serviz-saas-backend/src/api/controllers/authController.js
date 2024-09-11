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
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
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
    res.status(400).json({ error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    await authService.changePassword(req.userId, oldPassword, newPassword);
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const resetToken = await authService.forgotPassword(email);
    res.json({ message: "Password reset email sent", resetToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    await authService.resetPassword(resetToken, newPassword);
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("auth_token");
  res.json({ message: "Logout successful" });
};
// Implement other controller methods
