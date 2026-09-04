const express = require('express');
const router = express.Router();
const {ServicosController} = require('../controllers/ServicosController');
const {AgendamentoService} = require('../services/AgendamentoServices');
const {HorarioController} = require('../controllers/HorarioController')
const {authorize} = require('../middlewares/authorize');
const {isSameFuncionario} = require('../middlewares/isSameFuncionario')


router.post('/criar',authorize('admin'))
router.post('/agendar/:sid',  ServicosController.agendarServico);
router.post('/:sid/horarios/criar',authorize('admin'),HorarioController.createHorario);

router.get('/:sid',isSameFuncionario(),ServicosController.getServiceById);
router.get('/detalhar/:sid',authorize('funcionario','admin'),ServicosController.detalhar)

//Criar um middleware para ver se o funcionario tentando acessar os horários
//é o dono do serviço
router.get('/:sid/horarios',authorize('funcionario','admin'),isSameFuncionario(),HorarioController.getHorarios);

router.delete('/apagar/:sid',authorize('funcionario','admin'),isSameFuncionario(),ServicosController.desativarServico)

module.exports = router