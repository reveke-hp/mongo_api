const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    profesores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profesor' }],
    materia: { type: mongoose.Schema.Types.ObjectId, ref: 'Materia', required: true }
});

module.exports = mongoose.model('Curso', cursoSchema);