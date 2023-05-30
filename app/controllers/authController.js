// On appelle ici le modèle User permettant de créer un nouvel utilisateur, ce modèle correspond à la table app_user de la base de données.
const User = require("../models/AppUser");
// On appelle ici le service d'erreur APIError qui permet de gérer les erreurs de manière plus propre.
const APIError = require("../services/error/APIError");
const jwt = require('jsonwebtoken');


const authController = {
  async handleLogin(req, res, next) {
    const { email, password } = req.body;
    try {
      const lowerCaseEmail = email.toLowerCase();
      
      const foundUser = await User.login(lowerCaseEmail, password);

      const accessToken = jwt.sign({ 'email': email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10s'});
      const refreshToken = jwt.sign({ 'email': email}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '15s'});

      const result = await User.update({refreshtoken : refreshToken}, foundUser.id);
      
      res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 *1000});

      res.status(200).json({ role: foundUser.role, accessToken });
    } catch (err) {
      next(new APIError(err.message, 400));
    }
  },

  async handleRefreshToken(req, res) {
    const cookies = req.cookies
    if (!cookies?.jwt) return new APIError('Unauthorized', 401);
    const refreshToken = cookies.jwt

    const foundUser = await User.findOneByField('refreshtoken', refreshToken);
    
    if (!foundUser) return new APIError('Forbidden', 403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, user) => { 
        if (err || foundUser.email !== user.email) return res.sendStatus(403);
        const accessToken = jwt.sign(
          {"email": user.email},
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '15s'}
        );
        res.json({ accessToken })
      }
    );
  },

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
    console.log(result)

    res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 *1000}); // secure: true - only serves on https
    res.sendStatus(204);
    
  }
};

module.exports = authController;

