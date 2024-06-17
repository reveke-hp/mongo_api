const Profesor = require('../db/Profesor');

async function getAllProfesores() {
    return await Profesor.find();
}

async function getProfesorById(id) {
    return await Profesor.findById(id);
}

async function createProfesor(data) {
    const profesor = new Profesor(data);
    return await profesor.save();
}

async function updateProfesor(id, data) {
    const profesor = await Profesor.findById(id);
    if (!profesor) {
        throw new Error('Profesor no encontrado');
    }
    Object.assign(profesor, data);
    return await profesor.save();
}

async function deleteProfesor(id) {
    const profesor = await Profesor.findById(id);
    if (!profesor) {
        throw new Error('Profesor no encontrado');
    }
    return await profesor.remove();
}

async function getCursosByProfesorId(profesorId) {
    const profesor = await Profesor.findById(profesorId).populate('cursos');
    if (!profesor) {
        throw new Error('Profesor no encontrado');
    }
    return profesor.cursos;
}

module.exports = {
    getAllProfesores,
    getProfesorById,
    createProfesor,
    updateProfesor,
    deleteProfesor,
    getCursosByProfesorId
};
