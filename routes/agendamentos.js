const express = require('express');
const router = express.Router();

const Usuario = require('../models/Usuario');
const {AgendamentosController} = require('../controllers/AgendamentosController')

router.get('/detalhar/:id',AgendamentosController.detalhar)

router.delete('/detalhar/:sid/cancelar',AgendamentosController.cancelar)

router.delete('/:sid',AgendamentosController.apagarRegistro)

module.exports = router