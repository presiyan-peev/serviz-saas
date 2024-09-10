const authService = require("../services/authService");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const token = await authService.signup(username, email, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Implement other controller methods
