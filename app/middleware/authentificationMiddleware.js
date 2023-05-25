require("dotenv").config();
const APIError = require("../services/error/APIError");
const jwt = require("jsonwebtoken");

function requireAuth(req, _, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return next(new APIError("Unauthorized", 401));
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      if (error.name === "TokenExpiredError") {
        return next(new APIError("Token expired", 401));
      } else {
        return next(new APIError("Forbidden", 403));
      }
    }
    req.user = user;
    next();
  });
}

module.exports = requireAuth;
