const Joi = require('joi');

const cursoSchema = Joi.object({
    nombre: Joi.string().required(),
    materia: Joi.string().required()
});

module.exports = cursoSchema;
