const APIError = require("./APIError");

const errorModule = {
 
    async manage(err, req, res, next) {
    
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

    _404(_, __, next) {
        next(new APIError('Not found', 404));
    },
};

module.exports = errorModule;

