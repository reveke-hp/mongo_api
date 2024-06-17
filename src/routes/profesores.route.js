const express = require('express');
const router = express.Router();
const profesoresController = require('../controllers/profesores.controller');

router.get('/', profesoresController.getProfesores);
router.get('/:id', profesoresController.getProfesorById);
router.post('/', profesoresController.createProfesor);
router.put('/:id', profesoresController.updateProfesor);
router.delete('/:id', profesoresController.deleteProfesor);
router.get('/:id/cursos', profesoresController.getCursosByProfesorId);

module.exports = router;