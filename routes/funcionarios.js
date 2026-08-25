const express = require('express');
const router = express.Router();
const {FuncionarioController} = require('../controllers/FuncionarioController')
const {AgendamentosController } = require('../controllers/AgendamentosController')

router.get('/servicos',FuncionarioController.getFuncionarioServices)

router.get('/agendamentos', FuncionarioController.getAgenda);



module.exports = router;