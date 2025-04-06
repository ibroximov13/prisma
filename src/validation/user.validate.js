const Joi = require("joi");

class UserValidation {
    createzUserValidate (data) {
        const schema = Joi.object({

        });
        return schema.validate(data)
    };
    
    updateUserValidate (data) {
        const schema = Joi.object({

        });
        return schema.validate(data)
    }
};

const userValidation = new UserValidation();
module.exports = userValidation