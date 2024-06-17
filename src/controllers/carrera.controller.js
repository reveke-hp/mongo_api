const carreraService = require('../services/carreraService');
const carreraSchema = require('../mongoSchemas/carreraSchema');
const materiaSchema = require('../mongoSchemas/materiasSchema');

exports.getCarreras = async (req, res) => {
    try {
        const carreras = await carreraService.getAllCarreras();
        res.status(200).json(carreras);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCarreraById = async (req, res) => {
    try {
        const carrera = await carreraService.getCarreraById(req.params.id);
        if (carrera == null) {
            return res.status(404).json({ message: 'No se pudo encontrar la carrera' });
        }
        res.status(200).json(carrera);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCarrera = async (req, res) => {
    const { error } = carreraSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const nuevaCarrera = await carreraService.createCarrera(req.body);
        res.status(201).json(nuevaCarrera);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.createMateriaInCarrera = async (req, res) => {
    const { error } = materiaSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const nuevaMateria = await carreraService.createMateriaInCarrera(req.params.id, req.body);
        res.status(201).json(nuevaMateria);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getMateriasByCarreraId = async (req, res) => {
    try {
        const materias = await carreraService.getMateriasByCarreraId(req.params.id);
        res.status(200).json(materias);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
