const express = require('express');
const router = express.Router();
const {FuncionarioController} = require('../controllers/FuncionarioController')
const {AgendamentosController } = require('../controllers/AgendamentosController')
const {UserController} = require('../controllers/UserController');
const { authorize } = require('../middlewares/authorize');
const {defineSession} = require('../middlewares/sessionDefiner')

router.use(authorize('funcionario'))



router.get('/servicos',defineSession(),FuncionarioController.getFuncionarioServices)

router.get('/agendamentos',FuncionarioController.getAgenda);



module.exports = router;