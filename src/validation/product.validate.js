const Joi = require("joi");

class ProductValidation {
    createProductValidate (data) {
        const schema = Joi.object({
            name: Joi.string().min(2).required(),
            price: Joi.number().required(),
            color: Joi.string().min(2).required(),
            photo: Joi.string().required(),
            categoryId: Joi.number().integer().required()
        });
        return schema.validate(data)
    };

    updateProductValidate (data) {
        const schema = Joi.object({
            name: Joi.string().min(2).optional(),
            price: Joi.number().optional(),
            color: Joi.string().min(2).optional(),
            photo: Joi.string().optional(),
            categoryId: Joi.number().integer().optional()
        });
        return schema.validate(data)
    }
};

const productValidation = new ProductValidation();
module.exports = productValidation;