// On appelle ici le modèle User permettant de créer un nouvel utilisateur, ce modèle correspond à la table app_user de la base de données.
const User = require("../models/AppUser");
// On appelle ici le service d'erreur APIError qui permet de gérer les erreurs de manière plus propre.
const APIError = require("../services/error/APIError");
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;
const createToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: maxAge});
}

const authController = {
 
  async login_post(req, res, next) {
    const { email, password } = req.body;
    try {
      
      const user = await User.login(email, password);
      const token = createToken(user);
      res.status(200).json({role: user.role, accessToken : token}) ;
    
 
    }catch(err) {
      
      next(new APIError(err.message, 400));
    }

  },
};

module.exports = authController;

