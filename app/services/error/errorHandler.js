// On appelle ici le service d'erreur APIError qui permet de gérer les erreurs de manière plus propre.
const APIError = require("./APIError");

const errorModule = {
 
    async manage(err, req, res, next) {
        const errorMessage = err.message || 'Bad request';
        // le switch permet de gérer les erreurs en fonction du code de l'erreur. si le code de l'erreur est 400 on renvoie un message d'erreur personnalisé, si le code de l'erreur est 404 on renvoie un message d'erreur personnalisé, sinon on renvoie un message d'erreur par défaut.
        switch (err.code) {
            case 400:
                res.status(400).json(errorMessage);
                break;
            case 401:
                res.status(err.code).json(errorMessage);
                break;
            case 403:
                res.status(err.code).json(errorMessage)
                break;
            case 404:
                res.status(404).json(errorMessage);
                break;
            default:
                res.status(500).json("Internal server error");
                console.log(err.message)
                break;
        }
    },
    // dans le cas de la 404 on renvoie un message d'erreur personnalisé.
    _404(_, __, next) {
        next(new APIError("Not Found", 404));
    },
};

module.exports = errorModule;

