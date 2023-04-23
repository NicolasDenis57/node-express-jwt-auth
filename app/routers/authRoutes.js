// Ce routeur regrouper les routes liées à l'authentification.
const { Router } = require('express');
const authController = require('../controllers/authController');
const validationModule = require("../services/validation/validate");

const router = Router();

router.get('/signup', authController.signup_get);
// ici on appelle la méthode validate du module validationModule, cette méthode prend en paramètre le type de validation à effectuer (ici "body" car on veut valider le body de la requête) et retourne une fonction middleware qui sera appelée avant la route signup_post.
router.post('/signup', validationModule.validate("body"), authController.signup_post);

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

module.exports = router;