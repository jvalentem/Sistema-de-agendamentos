const {AgendamentoService} = require('../services/AgendamentoServices');
const {UserService} = require('../services/UserService');
const {ServicosService} = require('../services/ServicosService')
class AgendamentosController{
    static async detalhar(req,res){

        try{
            const session = req.session;
            const currentUser = await UserService.getUserById(session.user.id);
            
            const agendamentoid = req.params.id;
            //select * from agendamentos where id = agendamentoid
            const agendamento = await AgendamentoService.getAgendamentoByID(agendamentoid);

            console.log('AGENDAMENTO:',agendamento)
            if(!agendamento) throw new Error("Agendamento não encontrado");
            const canAlter = await AgendamentoService.canAlterAgendamento(currentUser,agendamento);
            console.log('PODE CONSULTAR:', canAlter)
            //select * from servicos where id = servicoId
            
            //select * from users where id = clienteId
            console.log('AGENDAMENTO ATUALIZADO:',agendamento)
            if(!canAlter) throw new Error('Acesso negado!');

            return res.json(agendamento);   
        }catch(e){
            return res.status(400).json({error_message:e});
        }
    }
    static async cancelar(req,res){
        try{
            if(!req.session.user) return res.redirect('/');

            const currentUser = await UserService.getUserById(req.session.user.id);
        
            const userId = currentUser.id;
            const agendamentoId = req.params.sid;

            await AgendamentoService.cancelarAgendamento(agendamentoId,currentUser);
            
            return res.status(201).json({});
        }catch(e){
            return res.send('Erro: ', e);
        }
    }

    static async apagarRegistro(req,res){
        try{
            if(!req.session.user) return res.redirect('/')

            const agendamento = await AgendamentoService.getAgendamentoByID(req.params.sid);

            //Somente os admins podem apagar os registros de agendamentos (brevemente tera um sistema automatico)        
            await AgendamentoService.deleteAgendamento(agendamento.getId());
        }catch(e){
            return res.status(400).json({error_message:e});
        }
    }
}

module.exports = {AgendamentosController}