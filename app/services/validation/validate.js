const APIError = require("../error/APIError");

// Ce module permet de valider les données reçues par le serveur.
// Il va vérifier que les données reçues par le serveur correspondent bien au schéma défini dans le fichier schema.js.
const validationModule = {
  validate(param, schema) {
    return (req, _, next) => {
      const { error } = schema.validate(req[param], { abortEarly: false });
      
      if (error) {
        const errors = error.details.map((detail) => detail.message);
        next(new APIError(`Les erreurs suivantes ont été rencontrées : ${errors.join(', ')}`, 400));
      } else {
        next();
      }
    };
  }
};

module.exports = validationModule;