const joi = require('@hapi/joi');

const registrationValidation = (data) => {
    const schemaRegister = joi.object({
        name: joi.string().min(6).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    });
    return schemaRegister.validate(data);
}

const LoginValidation = (data) => {
    const schemaLogin = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    });
    return schemaLogin.validate(data);
}

const addContactValidation = (data) => {
    const schemaLogin = joi.object({
        name: joi.string().min(6).required(),
        email: joi.string().email().required(),
        phone: joi.string().required(),
        type: joi.string()
    });
    return schemaLogin.validate(data);
}

module.exports.registrationValidation = registrationValidation;
module.exports.LoginValidation = LoginValidation;
module.exports.addContactValidation = addContactValidation