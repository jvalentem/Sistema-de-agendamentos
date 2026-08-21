const data = require('../data/databaseModel')
class AgendamentoService{
    static getAgendamentoBySID(sid){
        const agendamento = data.agendamentos.find(a => a.id === sid)

        return agendamento || false;

    }

    static cancelarAgendamento(sid){
        const agendamento = this.getAgendamentoBySID(sid);
        if(!agendamento) return false;

        agendamento.setStatus('Cancelado');
    }

    static deleteAgendamento(sid){
        const agendamento = data.agendamentos.find(a => a.id === sid);

        if(!agendamento) return false;

        data.agendamentos.splice(agendamento,1);
    }
}


module.exports = {AgendamentoService}