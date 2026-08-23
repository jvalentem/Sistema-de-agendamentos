const express = require('express');
const router = express.Router();
const {FuncionarioController} = require('../controllers/FuncionarioController')

router.get('/servicos',FuncionarioController.getFuncionarioServices)


module.exports = router;