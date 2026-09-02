const express = require('express');
const router = express.Router();
const {ServicosController} = require('../controllers/ServicosController');
const {AgendamentoService} = require('../services/AgendamentoServices');
const {authorize} = require('../middlewares/authorize');

router.post('/servicos',authorize('funcionario','admin'))

router.get('/:serviceId',ServicosController.getServiceById);

router.post('/agendar/:sid',  ServicosController.agendarServico);

router.get('/detalhar/:sid',authorize('funcionario'),ServicosController.detalhar)

router.delete('/apagar/:sid',authorize('funcionario','admin'),ServicosController.desativarServico)

module.exports = router