const express = require('express');
const router = express.Router();
const {authorize} = require('../middlewares/authorize');
const {sessionActive} = require('../middlewares/sessionActive')

router.use(sessionActive, authorize('admin'));


router.get('/servicos',(req,res)=>{})
router.get('/funcionarios',(req,res)=>{})
router.get('/agendamentos',(req,res)=>{});
router.get('/clientes',(req,res)=>{})