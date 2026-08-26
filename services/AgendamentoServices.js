const data = require('../data/databaseModel')
const AgendamentoModel = require('../models/Agendamento');
const { ServicosService } = require('./ServicosService');

class AgendamentoService{

    static async getAgendamentoBySID(sid){
        const agendamento = data.agendamentos.find(a => a.id === sid)

        return agendamento || false;
    }

    static async canAlterAgendamento(user,agendamento){
        const isAdmin = user.getAcesso() === 'admin';
        const isSameFuncionario = user.getId() === agendamento.getFuncionarioId();
        const isSameCliente = user.getId() === agendamento.getClienteId();
        
        return isAdmin || isSameCliente || isSameFuncionario
    }

    static async howManyCancelled(id){
        if(!id || typeof(id) !== 'string') return false;

        const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const cancelledIdPattern = new RegExp(`^${escapedId}-cancelled\\d+$`);

        return data.agendamentos.filter(a =>
            a.status === 'Cancelado' && cancelledIdPattern.test(a.id)
        ).length;
    }
    static async cancelarAgendamento(sid, user){
        
        if(!user) return false;
        const agendamento = await this.getAgendamentoBySID(sid);
        if(!agendamento) return false;
        const horario = await ServicosService.getHorarioBySID(sid);
        if(!horario) return false;
    
        //Se nao for nem o cliente e nem o funcionario daquele agendamento,
        //Então nao pode cancelar
        const canAlter = await this.canAlterAgendamento(user, agendamento); 

        if(!canAlter) throw new Error('Você nao tem permissão para cancelar este agendamento')

        const cancelIndex = await this.howManyCancelled(sid) + 1;
        agendamento.setId(`${sid}-cancelled${cancelIndex}`);
        horario.setOcupado(false);
        agendamento.setStatus('Cancelado')
        console.log(agendamento)
        return true;
    }

    static async deleteAgendamento(sid){
        const agendamentoIndex = data.agendamentos.findIndex(a => a.id === sid);

        if(agendamentoIndex === -1) return false;

        //no mongodb: findOneAndDelete
        data.agendamentos.splice(agendamentoIndex,1);
    }

    static async createAgendamento(servico,horario,clienteId){
        //Novamente, o id do admin é 0
        const userZero = clienteId === 0;
        if(!servico || !horario || (!clienteId && !userZero)) return false;
        const horarioOcupado = horario.isOcupado();

        const agendamento = new AgendamentoModel(servico,horario,clienteId);
        horario.setOcupado(true);

        data.agendamentos.push(agendamento);
        
        return true;
    }
}


module.exports = {AgendamentoService}