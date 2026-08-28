const express = require('express');
const router = express.Router();
const {ServicosController} = require('../controllers/ServicosController');
const {AgendamentoService} = require('../services/AgendamentoServices');
const { agendamentos, servicos } = require('../data/databaseModel');
const {sessionActive} = require('../middlewares/sessionActive')
const {authorize} = require('../middlewares/authorize');
//usa esse middleware em todas as rotas
router.use(sessionActive()) 

router.post('/servicos',authorize('funcionario','admin'))

router.get('/:serviceId',ServicosController.getServiceById);

router.post('/agendar/:sid',  ServicosController.agendarServico);

module.exports = router