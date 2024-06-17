const Curso = require('../db/Curso');
const Profesor = require('../db/Profesor');

async function getAllCursos() {
    return await Curso.find();
}

async function getCursoById(id) {
    return await Curso.findById(id);
}

async function deleteCurso(id) {
    const curso = await Curso.findById(id);
    if (!curso) {
        throw new Error('Curso no encontrado');
    }
    return await curso.remove();
}

async function updateCurso(id, data) {
    const curso = await Curso.findById(id);
    if (!curso) {
        throw new Error('Curso no encontrado');
    }
    Object.assign(curso, data);
    return await curso.save();
}

async function createProfesorInCurso(cursoId, profesorData) {
    const curso = await Curso.findById(cursoId);
    if (!curso) {
        throw new Error('Curso no encontrado');
    }

    const profesor = new Profesor(profesorData);
    const nuevoProfesor = await profesor.save();
    curso.profesores.push(nuevoProfesor);
    await curso.save();

    return nuevoProfesor;
}

async function getProfesoresByCursoId(cursoId) {
    const curso = await Curso.findById(cursoId).populate('profesores');
    if (!curso) {
        throw new Error('Curso no encontrado');
    }
    return curso.profesores;
}

module.exports = {
    getAllCursos,
    getCursoById,
    deleteCurso,
    updateCurso,
    createProfesorInCurso,
    getProfesoresByCursoId
};
