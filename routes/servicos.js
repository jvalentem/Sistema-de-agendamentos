const express = require('express');
const router = express.Router();
const {ServicosService} = require('../services/ServicosService');
const {AgendamentoService} = require('../services/AgendamentoServices');
const { agendamentos } = require('../data/databaseModel');

router.get('/:serviceId',(req,res)=>{
    const serviceId = req.params.serviceId;
    if(!serviceId || !req.session.user) return res.redirect('/');
    const servico = ServicosService.getServiceById(serviceId);

    if(!servico) return res.status(404).json({error_message:'Serviço não existe!'})

    res.render('single-service', {servico})
})

router.post('/agendar/:sid',(req,res)=>{
    const sid = req.params.sid;
    if(!sid || !req.session.user) return res.redirect('/');
    const servico = ServicosService.getServiceBySID(sid);
    const horario = ServicosService.getHorarioBySID(sid);
    const clienteId = req.session.user.id;


    const agendamento = AgendamentoService.createAgendamento(servico,horario,clienteId);
    if(!agendamento) return res.status().json({error_message:'Erro ao criar agendamento'});

    agendamentos.push(agendamento);
    console.log(agendamentos)
})

module.exports = router