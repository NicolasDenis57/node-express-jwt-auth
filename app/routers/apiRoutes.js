const { Router } = require('express');
const usersController = require('../controllers/usersController');
const recipesController = require('../controllers/recipesController');
const requireAuth = require('../middleware/authentificationMiddleware')
const validationModule = require("../services/validation/validate");
const { subscribeSchema, updateSchema } = require("../services/validation/schema");

const router = Router();

router.get('/users', requireAuth, usersController.getAllUsers);
router.get('/users/:id', requireAuth, usersController.getUserById);
router.put('/users/:id', requireAuth, validationModule.validate('body', updateSchema), usersController.updateUserById);
router.delete('/users/:id', requireAuth, usersController.deleteUserById);

//Subscribe route
router.post('/users' , validationModule.validate('body', subscribeSchema), usersController.createUser);


router.get('/recipes', requireAuth, recipesController.getAllRecipes);
router.get('/recipes/:id', /*requireAuth,*/ recipesController.getRecipeById);

module.exports = router;