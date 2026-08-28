const data = require('../data/databaseModel')
const AgendamentoModel = require('../models/Agendamento');
const { ServicosService } = require('./ServicosService');

class AgendamentoService{

    static async getAgendamentoByID(sid){
        const agendamento = data.agendamentos.find(a => a.id === Number(sid))

        return agendamento || false;
    }

    static async canAlterAgendamento(user,agendamento){
        const isAdmin = user.getAcesso() === 'admin';
        const isSameFuncionario = user.getId() === agendamento.getFuncionarioId();
        const isSameCliente = user.getId() === agendamento.getClienteId();
        
        return isAdmin || isSameCliente || isSameFuncionario
    }

    static async cancelarAgendamento(sid, user){
        
        if(!user) return false;

        const agendamento = await this.getAgendamentoByID(sid);
        if(!agendamento) return false;
        const horario = await ServicosService.getHorarioBySID(sid);

        if(!horario) return false;
        //Se nao for nem o cliente e nem o funcionario daquele agendamento,
        //Então nao pode cancelar
        const canAlter = await this.canAlterAgendamento(user, agendamento); 
        if(!canAlter) throw new Error('Você nao tem permissão para cancelar este agendamento')

        horario.setOcupado(false);
        agendamento.setStatus('Cancelado')
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
        const horarioOcupado = horario.isOcupado();

        if(!servico || !horario || (!clienteId && !userZero) || horarioOcupado) return false;

        //insert into agendamentos values(servicoId,horarioId,hora,clienteId,funcionarioId)
        const agendamento = new AgendamentoModel(servico,horario,clienteId);
        agendamento.setId(data.agendamentos.length + 1);
        agendamento.servico = await ServicosService.getServiceById(servico.id);
        

        horario.setOcupado(true);

        data.agendamentos.push(agendamento);
        
        return true;
    }
}


module.exports = {AgendamentoService}