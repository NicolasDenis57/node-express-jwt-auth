const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validationModule = require("../services/validation/validate");
const { loginSchema } = require("../services/validation/schema");

router.post('/', validationModule.validate('body', loginSchema), authController.handleLogin);

module.exports = router;