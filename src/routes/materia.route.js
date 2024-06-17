const express = require('express');
const router = express.Router();
const materiasController = require('../controllers/materia.controller');

router.get('/', materiasController.getMaterias);
router.get('/:id', materiasController.getMateriaById);
router.delete('/:id', materiasController.deleteMateria);
router.post('/:id/curso', materiasController.createCursoInMateria);
router.get('/:id/cursos', materiasController.getCursosByMateriaId);

module.exports = router;