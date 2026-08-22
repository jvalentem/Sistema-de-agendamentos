const express = require('express');
const router = express.Router();

const {AgendamentoService} = require('../services/AgendamentoServices');
const { agendamentos } = require('../data/databaseModel');

router.get('/detalhar/:id',(req,res)=>{
    //OK
    const agendamentoid = req.params.id;
    const agendamento = AgendamentoService.getAgendamentoBySID(agendamentoid);
})

router.get('/detalhar/:id/cancelar',(req,res)=>{
    //OK
    AgendamentoService.cancelarAgendamento(req.params.id);

})



router.delete('/:id',(req,res)=>{
    AgendamentoService.deleteAgendamento(req.params.id);
})

module.exports = router