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
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.json({ token });
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

// Implement other controller methods
