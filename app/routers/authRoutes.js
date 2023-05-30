// Ce routeur regrouper les routes liées à l'authentification coté back
const { Router } = require('express');
const authController = require('../controllers/authController');
const requireAuth = require('../middleware/authentificationMiddleware')
const validationModule = require("../services/validation/validate");
const { loginSchema } = require("../services/validation/schema");

const router = Router();

router.post('/login', validationModule.validate('body', loginSchema), authController.handleLogin);

router.get('/refresh', authController.handleRefreshToken);

router.get('/logout', authController.handleLogout);

module.exports = router;


















