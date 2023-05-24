// Ce routeur regrouper les routes liées à l'authentification coté back
const { Router } = require('express');
const authController = require('../../controllers/authController');
const { checkUser, blockRouteIfAuth } = require('../../middleware/authMiddleware');
const validationModule = require("../../services/validation/validate");
const { loginSchema } = require("../../services/validation/schema");

const router = Router();


router.get('*', checkUser );

router.post('/login', blockRouteIfAuth, validationModule.validate('body', loginSchema), authController.login_post);

module.exports = router;


















