// On appelle ici le modèle User permettant de créer un nouvel utilisateur, ce modèle correspond à la table app_user de la base de données.
const User = require("../models/AppUser");
// On appelle ici le service d'erreur APIError qui permet de gérer les erreurs de manière plus propre.
const APIError = require("../services/error/APIError");
const jwt = require('jsonwebtoken');

const bcrypt = require("bcrypt");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge});
}

const authController = {
  signup_get(req, res) {
    res.render("signup");
  },
  login_get(req, res) {
    res.render("login");
  },
  async login_post(req, res, next) {
    const { email, password } = req.body;

    try {
    
      const user = await User.login(email, password);
      const token = createToken(user.id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
      res.status(200).json({user : user.id});
    
 
    }catch(err) {
      next(new APIError(err.message, 400));
    }

  },
  async logout_get(req, res) {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
  }
};

module.exports = authController;

