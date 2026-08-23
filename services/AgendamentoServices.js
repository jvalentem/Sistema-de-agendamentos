const data = require('../data/databaseModel')
const AgendamentoModel = require('../models/Agendamento');
const { ServicosService } = require('./ServicosService');

class AgendamentoService{

    
    static async getCancelledAgendamentoBySID(sid){
        const agendamento = data.agendamentos.find(a => a.id === sid && a.status == 'Cancelado');

        return agendamento || false;
    }
    //Quando o usuário cancela o agendamento, ele permanece no banco de dados com o mesmo SID,
    //então, quando uso o metodo find(s => a.id == sid), ele retorna o primeiro resultado que ele encontrar
    //esteja ele cancelado ou não, podendo levar a resultados indesejados
    static async getOngoingAgendamentoBySID(sid){
        const agendamento = data.agendamentos.find(a => a.id === sid && a.status == 'Em andamento')

        return agendamento || false;

    }

    static async cancelarAgendamento(sid){
        const agendamento = await this.getOngoingAgendamentoBySID(sid);
        if(!agendamento) return false;
        console.log(agendamento)
        const horarioId = agendamento.getId(); //o id do horario é o mesmo do agendamento
        const horario = ServicosService.getHorarioBySID(sid);
        agendamento.setStatus('Cancelado');
        horario.setOcupado(false);
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

        return agendamento || false;
    }
}


module.exports = {AgendamentoService}