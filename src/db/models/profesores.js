const mongoose = require('mongoose');

const profesorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    cursos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Curso' }]
});

module.exports = mongoose.model('Profesor', profesorSchema);