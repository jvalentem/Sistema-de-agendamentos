const data = require('../data/databaseModel')
const AgendamentoModel = require('../models/Agendamento');
const { ServicosService } = require('./ServicosService');

class AgendamentoService{

    static async getAgendamentoBySID(sid){
        const agendamento = data.agendamentos.find(a => a.id === sid)

        return agendamento || false;
    }

    static async howManyCancelled(id){
        if(!id || typeof(id) !== 'string') return false;

        const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const cancelledIdPattern = new RegExp(`^${escapedId}-cancelled\\d+$`);

        return data.agendamentos.filter(a =>
            a.status === 'Cancelado' && cancelledIdPattern.test(a.id)
        ).length;
    }
    static async cancelarAgendamento(sid){
        const agendamento = await this.getAgendamentoBySID(sid);
        if(!agendamento) return false;

        const horario = await ServicosService.getHorarioBySID(sid);
        if(!horario) return false;
        
        const cancelIndex = await this.howManyCancelled(sid) + 1;
        agendamento.setStatus('Cancelado');
        agendamento.setId(`${sid}-cancelled${cancelIndex}`);
        horario.setOcupado(false);
        console.log(data.agendamentos)
        return true;
    }

    static async deleteAgendamento(sid){
        const agendamentoIndex = data.agendamentos.findIndex(a => a.id === sid);

        if(agendamentoIndex === -1) return false;

        //no mongodb: findOneAndDelete
        data.agendamentos.splice(agendamentoIndex,1);
    }

    static async createAgendamento(servico,horario,clienteId){
        if(!servico || !horario || !clienteId) return false;

        const agendamento = new AgendamentoModel(servico,horario,clienteId);
        horario.setOcupado(true);

        data.agendamentos.push(agendamento);
        
        return true;
    }
}


module.exports = {AgendamentoService}