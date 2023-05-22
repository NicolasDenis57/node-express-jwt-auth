const jwt = require("jsonwebtoken");
const APIError = require("../services/error/APIError");
const User = require("../models/AppUser");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        next(new APIError(err.message, 400));

        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        next(new APIError(err.message, 400));
        res.locals.user = null;
        next();
      } else {
        let user = await User.findOne(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const blockRouteIfAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        next(new APIError(err.message, 400));
        res.locals.user = null;
        next();
      } else {
        let user = await User.findOne(decodedToken.id);
        res.locals.user = user;
        res.redirect("/");
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


module.exports = { requireAuth, checkUser, blockRouteIfAuth };
