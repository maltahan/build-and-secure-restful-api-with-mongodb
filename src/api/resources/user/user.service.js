const Joi = require('joi');
const bcrypt = require('bcryptjs');

exports.encryptPassword = function(palinText) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(palinText, salt);
},
exports.comparePassword = function(plainText, encrypedPassword) {
    return bcrypt.compareSync(plainText, encrypedPassword);
};

exports.validateSignup = function(body) {
        const schema = Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string().required(),
            role: Joi.number().integer(),
        });
        const { value, error } = Joi.validate(body, schema);
        if (error && error.details) {
            return { error };
        }
        return { value };
};
exports.validateLogin =  function(body) {
    const schema = Joi.object().keys({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string().required(),
    });
    const { value, error } = Joi.validate(body, schema);
    if (error && error.details) {
        return { error };
    }
    return { value };
}