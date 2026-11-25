const {AgendamentoService} = require('../services/AgendamentoServices');
const {UserService} = require('../services/UserService');

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
        }catch(e){console.error(e)}
    }
    static async cancelar(req,res){
        try{
            if(!req.session.user) return res.redirect('/');

            
            const agendamentoId = req.params.sid;       
            
            //esse middleware nao pode ser separado
            const user = req.session.user;
            await AgendamentoService.cancelarAgendamento(agendamentoId,user);

            return res.status(201).json('Agendamento cancelado');
        }catch(e){console.error(e)}
    }
}

module.exports = {AgendamentosController}