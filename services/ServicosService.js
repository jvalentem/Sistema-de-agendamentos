const data = require('../data/databaseModel')
const Servico = require('../models/Servico');
const { FuncionarioService } = require('./FuncionarioService');
class ServicosService{

    static async createService(servico){
        // const servico = new Servico('serviço','funcionario',[],45,45)

        data.servicos.push(servico);
    }
    static async getServiceById(id){
        const servico = data.servicos.find(s => s.id === Number(id));
        return servico || false;
    }

    static async getServicos(sessionId){
        //O id do admin é 0 e !0 = true
        const userZero = sessionId === 0;
        if(!sessionId && !userZero) return false;
        //Previne que um funcionario, ao logar no sistema,
        //agende um horário com o próprio serviço
        const servicos = data.servicos.filter(s => s.funcionarioId !== Number(sessionId));;
        servicos.forEach(async s=> s.funcionario = await FuncionarioService.getFuncionarioById(s.funcionarioId));

        return servicos || false;
    }
    static async getServiceBySID(sid){
        
        const servico = data.servicos.find(s => s.id === Number(sid));
        
        return servico || false;

    }

    static async getHorarioBySID(sid){
        const servico = await this.getServiceBySID(sid);
        if(!servico) return false;

        //select * from horarios where idServico = sid

        const horario = data.horarios.find(h => h.servicoId === Number(sid));
        return horario || false;
    }
}

module.exports = {ServicosService}