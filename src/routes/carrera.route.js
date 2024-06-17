const express = require('express');
const router = express.Router();
const carrerasController = require('../controllers/carrera.controller');

router.get('/', carrerasController.getCarreras);
router.get('/:id', carrerasController.getCarreraById);
router.post('/', carrerasController.createCarrera);
router.post('/:id/materia', carrerasController.createMateriaInCarrera);
router.get('/:id/materias', carrerasController.getMateriasByCarreraId);

module.exports = router;