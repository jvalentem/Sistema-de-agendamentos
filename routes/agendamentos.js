const express = require('express');
const router = express.Router();

const {AgendamentosController} = require('../controllers/AgendamentosController')
const {AgendamentoService} = require('../services/AgendamentoServices');
const {isSameFuncionario} = require('../middlewares/isSameFuncionario')
const {authorize} = require('../middlewares/authorize')

router.get('/detalhar/:id',AgendamentosController.detalhar)

router.delete('/detalhar/:sid/cancelar',AgendamentosController.cancelar)

router.delete('/:sid',authorize('admin'),AgendamentosController.apagarRegistro)

module.exports = router