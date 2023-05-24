// Ce routeur permet de gérer les routes qui seront disponibles une fois loggué.
const { Router } = require('express');
const appController = require('../../controllers/appController');
const { requireAuth, checkUser } = require('../../middleware/authMiddleware');

const router = Router();


router.get('*', checkUser);
router.get('/', appController.home);
router.get('/smoothies', requireAuth, appController.smoothies);

module.exports = router;