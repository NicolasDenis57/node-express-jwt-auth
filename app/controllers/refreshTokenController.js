const User = require("../models/AppUser");
const APIError = require("../services/error/APIError");
const jwt = require('jsonwebtoken');


const refreshTokenController = {

async handleRefreshToken(req, res) {
      const cookies = req.cookies
      if (!cookies?.jwt) return new APIError('Unauthorized', 401);
      const refreshToken = cookies.jwt
  
      const foundUser = await User.findOneByField('refreshtoken', refreshToken);
  
      if (!foundUser) return new APIError('Forbidden', 403);
  
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => { 
          if (err || foundUser.firstname !== decoded.firstname) return res.sendStatus(403);
          const role = foundUser.role
          
          const accessToken = jwt.sign(
            {
              "UserInfo" : {
                "firstname": decoded.firstname,
                "role": role
              }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s'}
          );
          res.json({ role, accessToken })
        }
      );
    }
};

module.exports = refreshTokenController;



