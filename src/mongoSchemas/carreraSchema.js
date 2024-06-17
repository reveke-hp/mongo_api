const Joi = require('joi');

const carreraSchema = Joi.object({
    nombre: Joi.string().required()
});

module.exports = carreraSchema;
