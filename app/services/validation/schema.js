const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'L\'adresse e-mail est invalide',
    'any.required': 'L\'adresse e-mail est requise',
    'string.empty': 'Veuillez entrer une adresse e-mail'
  }),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{10,})'))
    .required().messages({
      'string.pattern.base': 'Le mot de passe doit contenir au moins une majuscule, un chiffre, un caractère spécial et faire au moins 10 caractères',
      'string.min': 'Le mot de passe doit contenir au moins 10 caractères',
      'any.required': 'Le mot de passe est requis',
      'string.empty': 'Veuillez entrer un mot de passe'
  }),
  firstname: Joi.string().pattern(new RegExp('^[a-zA-Z]+$')).min(1).required().messages({
    'string.pattern.base': 'Le prénom doit contenir uniquement des lettres',
    'string.min': 'Le prénom doit contenir au moins 1 caractère',
    'any.required': 'Le prénom est requis',
    'string.empty': 'Veuillez entrer un prénom'
  }),
  lastname: Joi.string().pattern(new RegExp('^[a-zA-Z]+$')).min(1).required().messages({
    'string.pattern.base': 'Le nom doit contenir uniquement des lettres',
    'string.min': 'Le nom doit contenir au moins 1 caractère',
    'any.required': 'Le nom est requis',
    'string.empty': 'Veuillez entrer un nom'
  })
});

module.exports = {
    userSchema
};