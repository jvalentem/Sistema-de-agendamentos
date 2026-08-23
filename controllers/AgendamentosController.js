const {AgendamentoService} = require('../services/AgendamentoServices');
const {UserService} = require('../services/UserService');

class AgendamentosController{
    static async detalhar(req,res){
        try{
            if(!req.session.user) return res.redirect('/');
            const session = req.session;
            const currentUser = await UserService.getUserById(session.user.id);
            if(!currentUser) return res.status(404).json({error_message:'O usuário da sessão não foi encontrado no banco de dados!'});

            const userAcesso = currentUser.getAcesso();

            const userId = currentUser.getId();
    
            const agendamentoid = req.params.id;
            const agendamento = await AgendamentoService.getOngoingAgendamentoBySID(agendamentoid);

            if(!agendamento) return res.status(404).json({error_message:'Agendamento não encontrado'});

            const agendamentoCliente = agendamento.getClienteId();
            const agendamentoFuncionario = agendamento.getServico().getFuncionario().getId();

        //Se o usuario nao for nem admin, nem o cliente do agendamento e nem o funcionario, ele nao pode cancelar

            if(!(userAcesso == 'admin' || 
                userId == agendamentoCliente || 
                userId == agendamentoFuncionario)) return res.status(403).json({error_message:'Acesso negado!'})

            return res.json(agendamento);
        }catch(e){
            return res.status(400).json({error_message:e});
        }
    }
    static async cancelar(req,res){
        try{
            if(!req.session.user) return res.redirect('/');
        
            const currentUser = await UserService.getUserById(req.session.user.id);
        
            if(!currentUser) return res.status(404).json({error_message:'Não foi possivel localizar o usuario da sessão em nosso banco'});
        
            const userAcess = currentUser.getAcesso();
            const userId = currentUser.getId();
            const agendamento = await AgendamentoService.getOngoingAgendamentoBySID(req.params.sid);
        
            if(!agendamento) return res.status(404).json({error_message:'agendamento não encontrado'})
            
            const agendamentoCliente = agendamento.getClienteId();
            const agendamentoFuncionario = agendamento.getServico().getFuncionario().getId();
            
            //Se o usuario nao for nem admin, nem o cliente do agendamento e nem o funcionario, ele nao pode cancelar
            if(!(userAcess == 'admin'|| 
                userId == agendamentoCliente || 
                userId == agendamentoFuncionario)) return res.status(403).json({error_message:'acesso negado!'})
        
            await AgendamentoService.cancelarAgendamento(req.params.sid);
            return res.status(201).json();
        }catch(e){
            return res.status(400).json({error_message:e});
        }
    }

    static async apagarRegistro(req,res){
        try{
            if(!req.session.user) return res.redirect('/')

        const agendamento = await AgendamentoService.getOngoingAgendamentoBySID(req.params.sid);
        const currentUser = await UserService.getUserById(req.session.user.id);
        if(!currentUser) return res.redirect('/');
        if(!agendamento) return res.status(404).json({error_message:'Agendamento não encontrado'})

        const userAcess = currentUser.getAcesso();
        const userId = currentUser.getId();

        const funcionarioId = agendamento.getServico().getFuncionario().getId();

        //Somente os admins podem apagar os registros de agendamentos (brevemente tera um sistema automatico)
        if(!userAcess == 'admin') return res.status(403).json({error_message:'Acesso negado!'})
        
            await AgendamentoService.deleteAgendamento(agendamento.getId());
        }catch(e){
            return res.status(400).json({error_message:e});
        }
    }
}

module.exports = {AgendamentosController}