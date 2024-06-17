const Joi = require('joi');

const materiaSchema = Joi.object({
    nombre: Joi.string().required(),
    carrera: Joi.string().required()
});

module.exports = materiaSchema;
