const express = require('express');
const router = express.Router();
const {authorize} = require('../middlewares/authorize');
const {sessionActive} = require('../middlewares/sessionActive')
const {AdminController} =  require('../controllers/AdminController');
const { route } = require('./servicos');

router.use(sessionActive, authorize('admin'));

router.use(
    sessionActive,
    authorize('admin')
)

router.get('/servicos',AdminController.getServicos)
router.get('/funcionarios',AdminController.getFuncionarios)
router.get('/agendamentos',AdminController.getAgendamentos);
router.get('/clientes',AdminController.getClientes)


module.exports = router