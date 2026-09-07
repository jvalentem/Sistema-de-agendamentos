const express = require('express');
const router = express.Router();
const {ServicosController} = require('../controllers/ServicosController');
const {AgendamentoService} = require('../services/AgendamentoServices');
const {HorarioController} = require('../controllers/HorarioController');

const {authorize} = require('../middlewares/authorize');
const {sessionActive} = require('../middlewares/sessionActive')
const {isSameFuncionario} = require('../middlewares/isSameFuncionario')


//Apenas admins podem criar novos serviços
router.post('/criar',authorize('admin'))


router.post('/agendar/:sid', ServicosController.agendarServico);
router.post('/:sid/horarios/criar',authorize('admin'),HorarioController.createHorario);

router.get('/:sid',ServicosController.getServiceById);
router.get('/detalhar/:sid',authorize('funcionario','admin'),ServicosController.detalhar)
router.get('/:sid/horarios',authorize('funcionario','admin'),isSameFuncionario,ServicosController.getHorarios);

router.delete('/apagar/:sid',authorize('funcionario','admin'),isSameFuncionario,ServicosController.desativarServico)

module.exports = router