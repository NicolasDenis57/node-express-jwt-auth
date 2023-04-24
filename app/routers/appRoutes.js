// Ce routeur permet de gérer les routes qui seront disponibles une fois loggué.
const { Router } = require('express');
const appController = require('../controllers/appController');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

router.get('/', appController.home);
router.get('/smoothies', authMiddleware.requireAuth, appController.smoothies);

module.exports = router;