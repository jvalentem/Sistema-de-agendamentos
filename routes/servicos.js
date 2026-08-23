const express = require('express');
const router = express.Router();
const {ServicosController} = require('../controllers/ServicosController');
const {AgendamentoService} = require('../services/AgendamentoServices');
const { agendamentos, servicos } = require('../data/databaseModel');

router.get('/:serviceId',ServicosController.getServiceById);

router.post('/agendar/:sid', ServicosController.agendarServico);

module.exports = router