const User = require("../models/AppUser");
const APIError = require("../services/error/APIError");

const authController = {
  signup_get(req, res) {
    res.render("signup");
  },
  login_get(req, res) {
    res.render("login");
  },
  async signup_post(req, res, next) {
    const { email, password, firstname, lastname } = req.body;

    try {
      const user = await User.create({ email, password, lastname, firstname });
      res.status(201).json(user);
    } catch (err) {
      if (err.code === "23505" && err.constraint === "app_user_email_key") {
        next(new APIError("Il existe déjà un compte avec cet email", 400));
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
