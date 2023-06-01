// On appelle ici le modèle User permettant de créer un nouvel utilisateur, ce modèle correspond à la table app_user de la base de données.
const User = require("../models/AppUser");
// On appelle ici le service d'erreur APIError qui permet de gérer les erreurs de manière plus propre.
const APIError = require("../services/error/APIError");

const bcrypt = require("bcrypt");

const usersController = {

    async getAllUsers(req, res, next) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);

            if(!users) {
                return next(new APIError("Aucun utilisateur trouvé", 404));
            }
        } catch (err) {
            next(err);
        }
    },

    async getUserById(req, res, next) {
        try {
            const user = await User.findOneByField('id', req.params.id);

            if (!user) {
                return next(new APIError("Utilisateur non trouvé", 404));
            }

            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    },

    async createUser(req, res, next) {
        const { email, password, firstname, lastname, confirmPassword } = req.body;
      
        if (Object.values(req.body).every(value => !value)) {
            return next(new APIError("Veuillez remplir tous les champs", 400));
        }

        if (password !== confirmPassword) {
          return next(new APIError("Les mots de passe ne correspondent pas", 400));
        }
    
        try {
          const hashedPassword = await bcrypt.hash(password, 10);

          const lowercaseEmail = email.toLowerCase();
    
          const user = await User.create({ email : lowercaseEmail, password: hashedPassword, lastname, firstname });
          // On envoie un code 201 pour indiquer que la requête a été traitée avec succès et qu'un nouvel élément a été créé. le code 201 correspond à la création d'un nouvel élément.
          res.status(201).json({user});
        } catch (err) {
          // On vérifie si l'erreur est une erreur de contrainte de clé unique, si c'est le cas on renvoie une erreur 400 (Bad Request) avec un message d'erreur personnalisé.
          if (err.code === "23505" && err.constraint === "app_user_email_key") {
            next(new APIError("Il existe déjà un compte avec cet email", 400));
          } else {
            next(err);
            
          }
        }
    },

    async updateUserById(req, res, next) {
        try {
            const user = await User.update(req.body, req.params.id);

            if (!user) {
                return next(new APIError("Utilisateur non trouvé", 404));
            }
            res.status(200).json(user);

        } catch (err) {
            next(err);
        }
    },

    async deleteUserById(req, res, next) {
        try {
            const user = await User.delete(req.params.id);

            if (!user) {
                return next(new APIError("Utilisateur non trouvé", 404));
            }
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    },

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



}

module.exports = usersController;