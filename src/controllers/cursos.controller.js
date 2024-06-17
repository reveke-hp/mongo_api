const cursoService = require('../services/cursoService');
const cursoSchema = require('../mongoSchemas/cursosSchema');
const profesorSchema = require('../mongoSchemas/profesoresSchema');

exports.getCursos = async (req, res) => {
    try {
        const cursos = await cursoService.getAllCursos();
        res.status(200).json(cursos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCursoById = async (req, res) => {
    try {
        const curso = await cursoService.getCursoById(req.params.id);
        if (curso == null) {
            return res.status(404).json({ message: 'No se pudo encontrar el curso' });
        }
        res.status(200).json(curso);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteCurso = async (req, res) => {
    try {
        await cursoService.deleteCurso(req.params.id);
        res.status(200).json({ message: 'Curso eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCurso = async (req, res) => {
    const { error } = cursoSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const cursoActualizado = await cursoService.updateCurso(req.params.id, req.body);
        res.status(200).json(cursoActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.createProfesorInCurso = async (req, res) => {
    const { error } = profesorSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const nuevoProfesor = await cursoService.createProfesorInCurso(req.params.id, req.body);
        res.status(201).json(nuevoProfesor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getProfesoresByCursoId = async (req, res) => {
    try {
        const profesores = await cursoService.getProfesoresByCursoId(req.params.id);
        res.status(200).json(profesores);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
