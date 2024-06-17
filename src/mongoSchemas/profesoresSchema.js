const Joi = require('joi');

const profesorSchema = Joi.object({
    nombre: Joi.string().required()
});

module.exports = profesorSchema;
