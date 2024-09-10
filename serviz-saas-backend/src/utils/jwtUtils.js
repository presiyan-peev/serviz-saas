const jwt = require("jsonwebtoken");
const config = require("../config/jwtConfig");

exports.generateToken = (userId, tenantId) => {
  return jwt.sign({ id: userId, tenantId }, config.secret, {
    expiresIn: config.expiresIn,
  });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, config.secret);
};
