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
  async signup_post(req, res, next) {
    const { email, password, firstname, lastname, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return next(new APIError("Les mots de passe ne correspondent pas", 400));
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({ email, password: hashedPassword, lastname, firstname });
      // On envoie un code 201 pour indiquer que la requête a été traitée avec succès et qu'un nouvel élément a été créé. le code 201 correspond à la création d'un nouvel élément.
      const token = createToken(user.id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
      res.status(201).json({user : user.id});
    } catch (err) {
      // On vérifie si l'erreur est une erreur de contrainte de clé unique, si c'est le cas on renvoie une erreur 400 (Bad Request) avec un message d'erreur personnalisé.
      if (err.code === "23505" && err.constraint === "app_user_email_key") {
        next(new APIError({"error" : "Il existe déjà un compte avec cet email"}, 400));
      } else {
        next(err);
      }
    }
  },
  async login_post(req, res) {
    const { email, password } = req.body;
    console.log(email, password);
    res.send("user login");
  },
};

module.exports = authController;
