const express = require('express');
const router = express.Router();
const {authorize} = require('../middlewares/authorize');
const {sessionActive} = require('../middlewares/sessionActive')
const {AdminController} =  require('../controllers/AdminController');
const {ServicosController} = require('../controllers/ServicosController');
const {HorarioController} = require('../controllers/HorarioController')
router.use(sessionActive, authorize('admin'));

router.use(
    sessionActive,
    authorize('admin')
)

router.get('/',(req,res)=>{res.render('painelAdmin')})
router.get('/servicos',AdminController.getServicos)
router.get('/funcionarios',AdminController.getFuncionarios)
router.get('/agendamentos',AdminController.getAgendamentos);
router.get('/clientes',AdminController.getClientes)

//!!
router.post('/funcionarios/cadastrar',(req,res)=>{})
router.post('/servicos/cadastrar',ServicosController.criarServico)
router.post('/horarios/cadastrar',HorarioController.createHorario)

module.exports = router