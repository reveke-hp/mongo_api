const profesorService = require('../services/profesores.service');
const profesorSchema = require('../mongoSchemas/profesoresSchema');

exports.getProfesores = async (req, res) => {
    try {
        const profesores = await profesorService.getAllProfesores();
        res.status(200).json(profesores);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProfesorById = async (req, res) => {
    try {
        const profesor = await profesorService.getProfesorById(req.params.id);
        if (profesor == null) {
            return res.status(404).json({ message: 'No se pudo encontrar el profesor' });
        }
        res.status(200).json(profesor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createProfesor = async (req, res) => {
    const { error } = profesorSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const nuevoProfesor = await profesorService.createProfesor(req.body);
        res.status(201).json(nuevoProfesor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateProfesor = async (req, res) => {
    const { error } = profesorSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const profesorActualizado = await profesorService.updateProfesor(req.params.id, req.body);
        res.status(200).json(profesorActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteProfesor = async (req, res) => {
    try {
        await profesorService.deleteProfesor(req.params.id);
        res.status(200).json({ message: 'Profesor eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCursosByProfesorId = async (req, res) => {
    try {
        const cursos = await profesorService.getCursosByProfesorId(req.params.id);
        res.status(200).json(cursos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
