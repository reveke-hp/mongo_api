const express = require('express');
const router = express.Router();
const cursosController = require('../controllers/cursos.controller');

router.get('/', cursosController.getCursos);
router.get('/:id', cursosController.getCursoById);
router.delete('/:id', cursosController.deleteCurso);
router.put('/:id', cursosController.updateCurso);
router.post('/:id/profesores', cursosController.createProfesorInCurso);
router.get('/:id/profesores', cursosController.getProfesoresByCursoId);

module.exports = router;