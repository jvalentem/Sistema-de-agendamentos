const express = require('express');
const router = express.Router();
const {FuncionarioController} = require('../controllers/FuncionarioController')
const {AgendamentosController } = require('../controllers/AgendamentosController')
const {UserController} = require('../controllers/UserController');
const { authorize } = require('../middlewares/authorize');

router.use(authorize('funcionario'))

router.get('/servicos',FuncionarioController.getFuncionarioServices)

router.get('/agendamentos',FuncionarioController.getAgenda);



module.exports = router;