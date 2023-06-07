const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const validationModule = require("../../services/validation/validate");
const { updateSchema } = require("../../services/validation/schema");

router.route('/')
      .get(verifyRoles(ROLES_LIST.admin), usersController.getAllUsers);


router.route('/:id')
      .get(verifyRoles(ROLES_LIST.admin), usersController.getUserById)
      .put(verifyRoles(ROLES_LIST.admin), validationModule.validate('body', updateSchema), usersController.updateUserById)
      .delete(verifyRoles(ROLES_LIST.admin), usersController.deleteUserById);

module.exports = router;