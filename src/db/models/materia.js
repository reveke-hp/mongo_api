const mongoose = require('mongoose');

const materiaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    cursos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Curso' }],
    carrera: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrera', required: true }
});

module.exports = mongoose.model('Materia', materiaSchema);