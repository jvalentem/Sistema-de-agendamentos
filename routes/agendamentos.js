const express = require('express');
const router = express.Router();

const {AgendamentoService} = require('../services/AgendamentoServices');
const { agendamentos } = require('../data/databaseModel');
const Usuario = require('../models/Usuario');
const { UserService } = require('../services/UserService');


router.get('/detalhar/:id',(req,res)=>{
    if(!req.session.user) return res.redirect('/');

    const currentUser = UserService.getUserById(req.session.user.id);
    if(!currentUser) return res.status(404).json({error_message:'O usuário da sessão não foi encontrado no banco de dados!'});

    const userAcess = currentUser.getAcesso();
    const userId = currentUser.getId();
    
    const agendamentoid = req.params.id;
    const agendamento = AgendamentoService.getOngoingAgendamentoBySID(agendamentoid);

    if(!agendamento) return res.status(404).json({error_message:'Agendamento não encontrado'});

    const agendamentoCliente = agendamento.getClienteId();
    const agendamentoFuncionario = agendamento.getServico().getFuncionario().getId();

    //Se o usuario nao for nem admin, nem o cliente do agendamento e nem o funcionario, ele nao pode cancelar

    if(!(userAcess == 'admin' || 
        userId == agendamentoCliente || 
        userId == agendamentoFuncionario)) return res.status(403).json({error_message:'Acesso negado!'})

    
    return res.json(agendamento);
})

router.delete('/detalhar/:sid/cancelar',(req,res)=>{
    //OK
    if(!req.session.user) return res.redirect('/');

    const currentUser = UserService.getUserById(req.session.user.id);

    if(!currentUser) return res.status(404).json({error_message:'Não foi possivel localizar o usuario da sessão em nosso banco'});

    const userAcess = currentUser.getAcesso();
    const userId = currentUser.getId();
    const agendamento = AgendamentoService.getOngoingAgendamentoBySID(req.params.sid);

    if(!agendamento) return res.status(404).json({error_message:'agendamento não encontrado'})
    
    const agendamentoCliente = agendamento.getClienteId();
    const agendamentoFuncionario = agendamento.getServico().getFuncionario().getId();
    
    //Se o usuario nao for nem admin, nem o cliente do agendamento e nem o funcionario, ele nao pode cancelar
    if(!(userAcess == 'admin'|| 
        userId == agendamentoCliente || 
        userId == agendamentoFuncionario)) return res.status(403).json({error_message:'acesso negado!'})

    AgendamentoService.cancelarAgendamento(req.params.sid);
    return res.json();
})



router.delete('/:sid',(req,res)=>{
    if(!req.session.user) return res.redirect('/')

    const agendamento = AgendamentoService.getOngoingAgendamentoBySID(req.params.sid);
    const currentUser = UserService.getUserById(req.session.user.id);
    if(!currentUser) return res.redirect('/');
    if(!agendamento) return res.status(404).json({error_message:'Agendamento não encontrado'})

    const userAcess = currentUser.getAcesso();
    const userId = currentUser.getId();

    const funcionarioId = agendamento.getServico().getFuncionario().getId();

    //Somente os admins podem apagar os registros de agendamentos (brevemente tera um sistema automatico)
    if(!userAcess == 'admin') return res.status(403).json({error_message:'Acesso negado!'})
    
    AgendamentoService.deleteAgendamento(agendamento.getId());
})

module.exports = router