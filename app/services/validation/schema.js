// Joi est un module qui permet de valider les données d'un objet. On peut définir des schémas de validation pour les objets. On peut ensuite utiliser ces schémas pour valider les données d'un objet. Si les données ne sont pas valides, on renvoie une erreur.
const Joi = require('joi');
// Ici nous avons un schéma de validation pour un utilisateur. On peut définir des messages d'erreurs personnalisés pour chaque propriété de l'objet. Si les données ne sont pas valides, on renvoie une erreur.
const userSchema = Joi.object({
  // ici l'email doit être une chaîne de caractères, elle doit être une adresse e-mail valide, elle est requise et on peut définir un message d'erreur personnalisé.
  email: Joi.string().email().required().messages({
    'string.email': 'L\'adresse e-mail est invalide',
    // any.required est un message d'erreur générique qui est utilisé si aucune erreur n'est définie pour la propriété.
    'any.required': 'L\'adresse e-mail est requise',
    'string.empty': 'Veuillez entrer une adresse e-mail'
  }),
  password: Joi.string()
  // cette RegExp permet de vérifier que le mot de passe contient au moins une majuscule, un chiffre et un caractère spécial.
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{10,})'))
    .required().messages({
      'string.pattern.base': 'Le mot de passe doit contenir au moins une majuscule, un chiffre, un caractère spécial et faire au moins 10 caractères',
      'string.min': 'Le mot de passe doit contenir au moins 10 caractères',
      'any.required': 'Le mot de passe est requis',
      'string.empty': 'Veuillez entrer un mot de passe'
  }),
  // cette RegExp permet de vérifier que le prénom et le nom ne contiennent que des lettres.
  firstname: Joi.string().pattern(new RegExp('^[a-zA-Z]+$')).min(1).required().messages({
    'string.pattern.base': 'Le prénom doit contenir uniquement des lettres',
    'string.min': 'Le prénom doit contenir au moins 1 caractère',
    'any.required': 'Le prénom est requis',
    'string.empty': 'Veuillez entrer un prénom'
  }),
  // cette RegExp permet de vérifier que le prénom et le nom ne contiennent que des lettres.
  lastname: Joi.string().pattern(new RegExp('^[a-zA-Z]+$')).min(1).required().messages({
    'string.pattern.base': 'Le nom doit contenir uniquement des lettres',
    'string.min': 'Le nom doit contenir au moins 1 caractère',
    'any.required': 'Le nom est requis',
    'string.empty': 'Veuillez entrer un nom'
  }),
   confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Les mots de passe doivent correspondre',
    'any.required': 'Veuillez confirmer votre mot de passe',
    'string.empty': 'Veuillez entrer votre mot de passe de confirmation'
  })
});

module.exports = {
    userSchema
};