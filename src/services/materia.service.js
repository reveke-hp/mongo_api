const Materia = require('../db/Materia');
const Curso = require('../db/Curso');

async function getAllMaterias() {
    return await Materia.find();
}

async function getMateriaById(id) {
    return await Materia.findById(id);
}

async function deleteMateria(id) {
    const materia = await Materia.findById(id);
    if (!materia) {
        throw new Error('Materia no encontrada');
    }
    return await materia.remove();
}

async function createCursoInMateria(materiaId, cursoData) {
    const materia = await Materia.findById(materiaId);
    if (!materia) {
        throw new Error('Materia no encontrada');
    }

    const curso = new Curso({
        ...cursoData,
        materia: materia._id
    });

    const nuevoCurso = await curso.save();
    materia.cursos.push(nuevoCurso);
    await materia.save();

    return nuevoCurso;
}

async function getCursosByMateriaId(materiaId) {
    const materia = await Materia.findById(materiaId).populate('cursos');
    if (!materia) {
        throw new Error('Materia no encontrada');
    }
    return materia.cursos;
}

module.exports = {
    getAllMaterias,
    getMateriaById,
    deleteMateria,
    createCursoInMateria,
    getCursosByMateriaId
};
