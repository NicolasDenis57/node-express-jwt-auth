const { Router } = require('express');
const apiController = require('../../controllers/apiController');
const { requireAuth, checkUser }= require('../../middleware/authMiddleware');
const validationModule = require("../../services/validation/validate");
const { subscribeSchema, updateSchema } = require("../../services/validation/schema");

const router = Router();

router.get('*', checkUser);
router.get('/users', requireAuth, apiController.getAllUsers);
router.get('/users/:id', requireAuth, apiController.getUserById);
router.post('/users' , validationModule.validate('body', subscribeSchema), apiController.createUser);
router.put('/users/:id' , validationModule.validate('body', updateSchema), requireAuth, apiController.updateUserById);
router.delete('/users/:id', requireAuth, apiController.deleteUserById);

module.exports = router;