const data = require('../data/databaseModel')
const AgendamentoModel = require('../models/Agendamento')

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

    static createAgendamento(servico,horario,clienteId){
        const agendamento = new AgendamentoModel(servico,horario,clienteId);
       
        return agendamento || false;
    }
}


module.exports = {AgendamentoService}