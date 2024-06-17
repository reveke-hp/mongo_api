const mongoose = require('mongoose');

const carreraSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    materias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Materia' }]
});

module.exports = mongoose.model('Carrera', carreraSchema);