const APIError = require("../error/APIError");
const { userSchema } = require("./schema");

// Ce module permet de valider les données reçues par le serveur.
// Il va vérifier que les données reçues par le serveur correspondent bien au schéma défini dans le fichier schema.js.
const validationModule = {
    validate(param) {
      return (req, _, next) => {
        // aborEarly est ici sur false ce qui signifie que Joi va valider toutes les propriétés de l'objet et renvoyer toutes les erreurs rencontrées.
        // Si on souhaite que Joi arrête de valider les propriétés dès qu'une erreur est rencontrée, on peut mettre abortEarly sur true.
        const { error } = userSchema.validate(req[param], { abortEarly: false });
  
        if (error) {
          // error.details contient un tableau d'objets qui contiennent les erreurs rencontrées.
          // On map sur ce tableau pour récupérer uniquement le message d'erreur.
          const errors = error.details.map((detail) => detail.message);
          // on utilise ensuite join pour transformer le tableau en chaîne de caractères.
          next(new APIError(`Les erreurs suivantes ont été rencontrées : ${errors.join(', ')}`, 400));
        } else {
          next();
        }
      };
    }
  };

module.exports = validationModule;