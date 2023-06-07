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

      const role = foundUser.role;

      const accessToken = jwt.sign({
        "UserInfo" : {
          "firstname": foundUser.firstname,
          "role":role
        }
      }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
      const refreshToken = jwt.sign({ 'firstname': foundUser.firstname }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5m' });

      await User.update({ refreshtoken : refreshToken }, foundUser.id);
      
      res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 *1000 });

      res.status(200).json({role: foundUser.role, accessToken });
    } catch (err) {
      next(new APIError(err.message, 400));
    }
  },
};

module.exports = authController;

