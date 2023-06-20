const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const payload = {
    sub: "BackendServer",
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = generateToken;
