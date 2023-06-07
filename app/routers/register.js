const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const validationModule = require("../services/validation/validate");
const { subscribeSchema } = require("../services/validation/schema");


router.post('/' , validationModule.validate('body', subscribeSchema) , usersController.createUser);

module.exports = router;