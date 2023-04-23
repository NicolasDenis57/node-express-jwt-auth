const APIError = require("../error/APIError");
const { userSchema } = require("./schema");


const validationModule = {
    validate(param) {
      return (req, _, next) => {
        const { error } = userSchema.validate(req[param], { abortEarly: false });
  
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