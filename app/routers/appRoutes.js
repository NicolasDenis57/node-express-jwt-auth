const { Router } = require('express');
const appController = require('../controllers/appController');

const router = Router();

router.get('/', appController.home);
router.get('/smoothies',appController.smoothies);

module.exports = router;