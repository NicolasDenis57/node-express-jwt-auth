const express = require('express');
const router = express.Router();
const recipesController = require('../../controllers/recipesController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
      .get(verifyRoles(ROLES_LIST.admin, ROLES_LIST.user), recipesController.getAllRecipes);


router.route('/:id')
      .get(verifyRoles(ROLES_LIST.admin, ROLES_LIST.user), recipesController.getRecipeById)

module.exports = router;