const { Router } = require('express');
const authController = require('../controllers/authController');
const validationModule = require("../services/validation/validate");

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', validationModule.validate("body"), authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

module.exports = router;