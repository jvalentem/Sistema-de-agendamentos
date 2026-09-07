const express = require('express');
const router = express.Router();

const {HorarioController} = require('../controllers/HorarioController')

const {isSameFuncionario} = require('../middlewares/isSameFuncionario');

router.post('/:sid/criar',isSameFuncionario,HorarioController.createHorario);

router.delete('/apagar/:sid/:hid',isSameFuncionario,HorarioController.apagarHorario)


module.exports = router;