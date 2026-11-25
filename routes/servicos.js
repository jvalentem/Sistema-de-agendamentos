const express = require('express');
const router = express.Router();
const {ServicosController} = require('../controllers/ServicosController');
const {HorarioController} = require('../controllers/HorarioController');

const {authorize} = require('../middlewares/authorize');
const {sessionActive} = require('../middlewares/sessionActive')
const {isSameFuncionario} = require('../middlewares/isSameFuncionario')
const {agendamentoRateLimit} = require('../middlewares/agendamentoRateLimit');


//Apenas admins podem criar novos serviços
router.post('/criar',authorize('admin'),ServicosController.criarServico);


router.post('/agendar/:sid', agendamentoRateLimit, ServicosController.agendarServico);
router.post('/:sid/horarios/criar',authorize('admin'),HorarioController.createHorario);

router.get('/:sid',ServicosController.getServiceById);
router.get('/detalhar/:sid',authorize('funcionario','admin'),ServicosController.detalhar)
router.get('/:sid/datas',authorize('funcionario','admin'),isSameFuncionario,ServicosController.getDatas);
router.get('/:sid/data/:hid/horarios',HorarioController.getHorariosWhereDateIs)

router.patch('/mudarstatus/:sid',authorize('funcionario','admin'),isSameFuncionario,ServicosController.mudarStatus)

router.patch('/editar/:sid',authorize('admin'),ServicosController.editar)

module.exports = router