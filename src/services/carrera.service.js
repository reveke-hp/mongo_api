const Carrera = require('../db/Carrera');
const Materia = require('../db/Materia');

async function getAllCarreras() {
    return await Carrera.find();
}

async function getCarreraById(id) {
    return await Carrera.findById(id);
}

async function createCarrera(data) {
    const carrera = new Carrera(data);
    return await carrera.save();
}

async function createMateriaInCarrera(carreraId, materiaData) {
    const carrera = await Carrera.findById(carreraId);
    if (!carrera) {
        throw new Error('Carrera no encontrada');
    }

    const materia = new Materia({
        ...materiaData,
        carrera: carrera._id
    });

    const nuevaMateria = await materia.save();
    carrera.materias.push(nuevaMateria);
    await carrera.save();

    return nuevaMateria;
}

async function getMateriasByCarreraId(carreraId) {
    const carrera = await Carrera.findById(carreraId).populate('materias');
    if (!carrera) {
        throw new Error('Carrera no encontrada');
    }
    return carrera.materias;
}

module.exports = {
    getAllCarreras,
    getCarreraById,
    createCarrera,
    createMateriaInCarrera,
    getMateriasByCarreraId
};
