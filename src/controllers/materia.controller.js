const materiaService = require('../services/materiaService');
const materiaSchema = require('../mongoSchemas/materiaSchema');
const cursoSchema = require('../mongoSchemas/cursosSchema');

exports.getMaterias = async (req, res) => {
    try {
        const materias = await materiaService.getAllMaterias();
        res.status(200).json(materias);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMateriaById = async (req, res) => {
    try {
        const materia = await materiaService.getMateriaById(req.params.id);
        if (materia == null) {
            return res.status(404).json({ message: 'No se pudo encontrar la materia' });
        }
        res.status(200).json(materia);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteMateria = async (req, res) => {
    try {
        await materiaService.deleteMateria(req.params.id);
        res.status(200).json({ message: 'Materia eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCursoInMateria = async (req, res) => {
    const { error } = cursoSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const nuevoCurso = await materiaService.createCursoInMateria(req.params.id, req.body);
        res.status(201).json(nuevoCurso);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getCursosByMateriaId = async (req, res) => {
    try {
        const cursos = await materiaService.getCursosByMateriaId(req.params.id);
        res.status(200).json(cursos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
