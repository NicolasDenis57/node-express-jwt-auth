// Joi est un module qui permet de valider les données d'un objet. On peut définir des schémas de validation pour les objets. On peut ensuite utiliser ces schémas pour valider les données d'un objet. Si les données ne sont pas valides, on renvoie une erreur.
const Joi = require('joi');



const emailSchema = Joi.string().email().messages({
  'string.email': 'L\'adresse e-mail est invalide',
  'string.empty': 'Veuillez entrer une adresse e-mail'
});

const passwordSchema = Joi.string()
  .pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})'))
  .messages({
    'string.pattern.base': 'Le mot de passe doit contenir au moins une majuscule, un chiffre, un caractère spécial et faire au moins 10 caractères',
    'string.min': 'Le mot de passe doit contenir au moins 10 caractères',
    'string.empty': 'Veuillez entrer un mot de passe'
  });

const nameSchema = Joi.string()
  .pattern(new RegExp('^[a-zA-Z]+$'))
  .min(1)
  .messages({
    'string.pattern.base': 'Le prénom et/ou le nom doit contenir uniquement des lettres',
    'string.min': 'Le prénom et/ou le nom doit contenir au moins 1 caractère',
    'string.empty': 'Veuillez entrer un nom et/ou un prénom'
  });

const subscribeSchema = Joi.object({
  email: emailSchema.required().messages({
    'any.required': 'L\'adresse e-mail est requise',
  }),
  password: passwordSchema.required().messages({
    'any.required': 'Le mot de passe est requis',
  }),
  firstname: nameSchema.required().messages({
    'any.required': 'Le prénom est requis',
  }),
  lastname: nameSchema.required().messages({
    'any.required': 'Le nom est requis',
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Les mots de passe doivent correspondre',
      'any.required': 'Veuillez confirmer votre mot de passe',
      'string.empty': 'Veuillez entrer votre mot de passe de confirmation'
    }),
});

const updateSchema = Joi.object({
  email: emailSchema.optional(),
  password: passwordSchema.optional(),
  firstname: nameSchema.optional(),
  lastname: nameSchema.optional(),
});

module.exports = {
    subscribeSchema, updateSchema
};