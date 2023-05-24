// Ce routeur regrouper les routes liées à l'authentification coté front
const { Router } = require('express');
const authController = require('../../controllers/authController');
const { checkUser, blockRouteIfAuth } = require('../../middleware/authMiddleware');
const validationModule = require("../../services/validation/validate");
const { loginSchema } = require("../../services/validation/schema");

const router = Router();


router.get('*', checkUser );

router.get('/signup', blockRouteIfAuth, authController.signup_get);

router.get('/login', blockRouteIfAuth, authController.login_get);

router.get('/logout', authController.logout_get);

module.exports = router;