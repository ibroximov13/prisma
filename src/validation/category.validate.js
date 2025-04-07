const Joi = require("joi");

class CategoryValidation {
    createCategoryValidate (data) {
        const schema = Joi.object ({
            name: Joi.string().min(3).max(55).required(),
            photo: Joi.string().required(),
        });
        return schema.validate(data)
    };

    updateCategoryValidate (data) {
        const schema = Joi.object ({
            name: Joi.string().min(3).max(55).optional(),
            photo: Joi.string().optional(),
        });
        return schema.validate(data)
    }
};

const categoryValidation = new CategoryValidation();
module.exports = categoryValidation