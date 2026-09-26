const express = require('express');
const router = express.Router();
const {FuncionarioController} = require('../controllers/FuncionarioController')
const {AgendamentosController } = require('../controllers/AgendamentosController')
const {UserController} = require('../controllers/UserController');
const { authorize } = require('../middlewares/authorize');
const {defineSession} = require('../middlewares/sessionDefiner');
const { isSameFuncionario } = require('../middlewares/isSameFuncionario');

router.use(
    authorize('funcionario', 'admin'),
)



router.get('/servicos',defineSession(),FuncionarioController.getFuncionarioServices)

router.get('/agendamentos/:funcionarioId',FuncionarioController.getAgenda)

router.get('/agendamentos',FuncionarioController.getAgenda);


module.exports = router;