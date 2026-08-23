const express = require('express');
const router = express.Router();
const {ServicosService} = require('../services/ServicosService');
const {AgendamentoService} = require('../services/AgendamentoServices');
const { agendamentos, servicos } = require('../data/databaseModel');

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

    if(horario.isOcupado()) return res.status(401).json({error_message:'Este horário ja está ocupado!'});

    const agendamento = AgendamentoService.createAgendamento(servico,horario,clienteId);
    if(!agendamento) return res.json({error_message:'Erro ao criar agendamento'});

    agendamentos.push(agendamento);
    return res.json({'redirectTo':'/usuario/me'});
})

module.exports = router