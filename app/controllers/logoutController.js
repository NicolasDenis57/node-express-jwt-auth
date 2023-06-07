const User = require("../models/AppUser");
const APIError = require("../services/error/APIError");

const logoutController = {

      async handleLogout(req, res) {
            const cookies = req.cookies;
            if (!cookies?.jwt) return new APIError('No content to send back', 204);
            let refreshToken = cookies.jwt;
        
            const foundUser = await User.findOneByField('refreshToken', refreshToken);
        
            if (!foundUser) {
              res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 *1000});
              return new APIError('No content to send back', 204);
            }
        
            refreshToken = ''
        
            const result = await User.update({refreshtoken : refreshToken}, foundUser.id);
        
           
            
            res.clearCookie('jwt'); // secure: true - only serves on https
            res.sendStatus(204)
            
          }
};

module.exports = logoutController