const express = require('express');
const router = express.Router();

const Usuario = require('../models/Usuario');
const {AgendamentosController} = require('../controllers/AgendamentosController')
const {AgendamentoService} = require('../services/AgendamentoServices')
const {authorize} = require('../middlewares/authorize')

router.get('/detalhar/:id',AgendamentosController.detalhar)

router.delete('/detalhar/:sid/cancelar',AgendamentosController.cancelar)

router.delete('/:sid',
    authorize('admin')
    ,AgendamentosController.apagarRegistro)

module.exports = router