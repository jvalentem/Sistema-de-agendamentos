const {AgendamentoService} = require('../services/AgendamentoServices');
const {UserService} = require('../services/UserService');
const {ServicosService} = require('../services/ServicosService')
class AgendamentosController{
    static async detalhar(req,res){

        try{
            const session = req.session;
            const currentUser = await UserService.getUserById(session.user.id);
            
            const agendamentoid = req.params.id;
            const agendamento = await AgendamentoService.getAgendamentoByID(agendamentoid);

            if(!agendamento) throw new Error("Agendamento não encontrado");

            const canAlter = await AgendamentoService.canAlterAgendamento(currentUser,agendamento);

            if(!canAlter) throw new Error('Acesso negado!');

            return res.json(agendamento);   
        }catch(e){
            return res.status(400).json({error_message:e});
        }
    }
    static async cancelar(req,res){
        try{
            if(!req.session.user) return res.redirect('/');

            
            const agendamentoId = req.params.sid;       
            
            //esse middleware nao pode ser separado
            const user = req.session.user;
            await AgendamentoService.cancelarAgendamento(agendamentoId,user);

            return res.status(201).json('Agendamento cancelado');
        }catch(e){
            return res.send('Erro: ', e);
        }
    }

    static async apagarRegistro(req,res){
        try{
            if(!req.session.user) return res.redirect('/')
    
            const agendamento = await AgendamentoService.getAgendamentoByID(req.params.sid);

            await AgendamentoService.deleteAgendamento(agendamento.getId());
        }catch(e){
            return res.status(400).json({error_message:e});
        }
    }
}

module.exports = {AgendamentosController}