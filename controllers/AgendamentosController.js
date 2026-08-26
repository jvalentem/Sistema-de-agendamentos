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
            const agendamento = await AgendamentoService.getAgendamentoBySID(agendamentoid);

            if(!agendamento) return res.status(404).json({error_message:'Agendamento não encontrado'});
            const canAlter = await AgendamentoService.canAlterAgendamento(currentUser,agendamento);

            if(!canAlter) throw new Error('Acesso negado!');
            agendamento.clienteJson = await UserService.getUserById(userId) //Passando as informações do cliente pro front
            return res.json(agendamento);
        }catch(e){
            return res.status(400).json({error_message:e});
        }
    }
    static async cancelar(req,res){
        try{
            if(!req.session.user) return res.redirect('/');

            const currentUser = await UserService.getUserById(req.session.user.id);
        
            const userId = currentUser.getId();
            const agendamentoId = req.params.sid;
            //Se o usuario nao for nem admin, nem o cliente do agendamento e nem o funcionario, ele nao pode cancelar
            await AgendamentoService.cancelarAgendamento(agendamentoId,currentUser);
            
            return res.status(201).json({});
        }catch(e){
            return res.send('Erro: ', e);
        }
    }

    static async apagarRegistro(req,res){
        try{
            if(!req.session.user) return res.redirect('/')

            const agendamento = await AgendamentoService.getAgendamentoBySID(req.params.sid);

            //Somente os admins podem apagar os registros de agendamentos (brevemente tera um sistema automatico)        
            await AgendamentoService.deleteAgendamento(agendamento.getId());
        }catch(e){
            return res.status(400).json({error_message:e});
        }
    }
}

module.exports = {AgendamentosController}