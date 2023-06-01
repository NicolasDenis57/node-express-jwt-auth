const Recipe = require("../models/Recipe");
// On appelle ici le service d'erreur APIError qui permet de gérer les erreurs de manière plus propre.
const APIError = require("../services/error/APIError");

const recipesController = {

    async getAllRecipes(req, res, next) {
        try {
            const recipes = await Recipe.findAll();
            res.status(200).json(recipes);

            if(!recipes) {
                return next(new APIError("Aucune recette trouvée", 404));
            }
        } catch (err) {
            next(err);
        }
    },

    async getRecipeById(req, res, next) {
      try {
          const recipe = await Recipe.findOneByField('id', req.params.id);

          if (!recipe) {
              return next(new APIError("Recette non trouvée", 404));
          }

          res.status(200).json(recipe);
      } catch (err) {
          next(err);
      }
  },



}

module.exports = recipesController;