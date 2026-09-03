const express = require('express');
const router = express.Router();
const {ServicosController} = require('../controllers/ServicosController');
const {AgendamentoService} = require('../services/AgendamentoServices');
const {authorize} = require('../middlewares/authorize');
const {sessionActive} = require('../middlewares/sessionActive');

router.post('/criar',authorize('funcionario','admin'),ServicosController.criarServico) //Para cadastrar novos serviços

router.get('/:serviceId',ServicosController.getServiceById);

router.post('/agendar/:sid', ServicosController.agendarServico);

router.patch('/editar/:sid',authorize('funcionario','admin'),ServicosController.editar)

router.get('/detalhar/:sid',authorize('funcionario','admin'),ServicosController.detalhar)

router.delete('/apagar/:sid',authorize('funcionario','admin'),ServicosController.desativarServico)

module.exports = router