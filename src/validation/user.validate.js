const Joi = require("joi");

class UserValidation {
    
    sendOtpValidate (data) {
        const schema = Joi.object({
            email: Joi.string().email().required()
        });
        return schema.validate(data);
    }
    
    verifyOtpValidate (data) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            otp: Joi.string().min(5).max(5).required()
        });
        return schema.validate(data); 
    }
    
    userRegisterValidate (data) {
        const schema = Joi.object({
            name: Joi.string().min(2).max(55).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(4).required(),
            role: Joi.string().valid("USER", "ADMIN").required(),
        });
        return schema.validate(data)
    };

    userLoginValidate (data) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(4).required(),
            ipAddress: Joi.string().required()
        });
        return schema.validate(data)
    }

    createUserValidate (data) {
        const schema = Joi.object({
            name: Joi.string().min(2).max(55).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(4).required(),
            role: Joi.string().valid("USER", "ADMIN", "SUPER_ADMIN").required(),
        });
        return schema.validate(data)
    }

    updateUserValidate (data) {
        const schema = Joi.object({
            name: Joi.string().min(2).max(55).optional(),
            email: Joi.string().email().optional(),
            password: Joi.string().min(4).optional(),
            role: Joi.string().valid("USER", "ADMIN", "SUPER_ADMIN").optional(),
        });
        return schema.validate(data)
    }
};

const userValidation = new UserValidation();
module.exports = userValidation