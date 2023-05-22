// cette classe permet de créer des erreurs personnalisées qui seront utilisées dans les routes pour retourner des erreurs au client.
class APIError extends Error {
    constructor(message,code){
        super(message);
        this.code = code;
    }
};

module.exports = APIError;