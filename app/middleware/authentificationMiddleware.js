require("dotenv").config();
const APIError = require("../services/error/APIError");
const jwt = require("jsonwebtoken");

function requireAuth(req, _, next) {
  
  const authHeader = req.headers.authorization || req.headers.Authorization

  if(!authHeader?.startsWith('Bearer ')) return next(new APIError("Unauthorized", 401))

  const token = authHeader.split(" ")[1];
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    
    if (error) {
      
        return next(new APIError(error.message, 403));
    }
    
    req.user = decoded.email;
    req.roles = decoded.roles;
    next();
  }
  );
}

module.exports = requireAuth;


