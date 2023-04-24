const { Router } = require('express');
const apiController = require('../controllers/apiController');
const authMiddleware = require('../middleware/authMiddleware');
const validationModule = require("../services/validation/validate");
const { userSchema } = require("../services/validation/schema");

const router = Router();

router.get('/users'/*, authMiddleware.requireAuth*/, apiController.getAllUsers);
router.get('/users/:id'/*, authMiddleware.requireAuth*/, apiController.getUserById);
router.post('/users' , validationModule.validate("body", userSchema, "createUser")/*, authMiddleware.requireAuth*/, apiController.createUser);
router.put('/users/:id' , validationModule.validate("body", userSchema, "update") /*, authMiddleware.requireAuth*/, apiController.updateUserById);
router.delete('/users/:id'/*, authMiddleware.requireAuth*/, apiController.deleteUserById);

module.exports = router;