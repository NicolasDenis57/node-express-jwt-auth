// On appelle ici le service d'erreur APIError qui permet de gérer les erreurs de manière plus propre.
const APIError = require("./APIError");

const errorModule = {
 
    async manage(err, req, res, next) {
        // le switch permet de gérer les erreurs en fonction du code de l'erreur. si le code de l'erreur est 400 on renvoie un message d'erreur personnalisé, si le code de l'erreur est 404 on renvoie un message d'erreur personnalisé, sinon on renvoie un message d'erreur par défaut.
        switch (err.code) {
            case 400:
                const errorMessage = err.message || 'Bad request';
                res.status(400).json(errorMessage);
                break;
            case 404:
                res.status(404).json("Not found");
                break;
            default:
                res.status(err.code).json("Internal server error");
                break;
        }
    },
    // dans le cas de la 404 on renvoie un message d'erreur personnalisé.
    _404(_, __, next) {
        next(new APIError('Not found', 404));
    },
};

module.exports = errorModule;

