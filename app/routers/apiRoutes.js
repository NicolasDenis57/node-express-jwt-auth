const { Router } = require('express');
const apiController = require('../controllers/apiController');
const requireAuth = require('../middleware/authentificationMiddleware')
const validationModule = require("../services/validation/validate");
const { subscribeSchema, updateSchema } = require("../services/validation/schema");

const router = Router();

router.get('/users', requireAuth, apiController.getAllUsers);
router.get('/users/:id', requireAuth, apiController.getUserById);
router.put('/users/:id', requireAuth, validationModule.validate('body', updateSchema), apiController.updateUserById);
router.delete('/users/:id', requireAuth, apiController.deleteUserById);

//Subscribe route
router.post('/users' , validationModule.validate('body', subscribeSchema), apiController.createUser);

module.exports = router;