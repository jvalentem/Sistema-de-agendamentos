const data = require('../data/databaseModel')

class ServicosService{
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
        const servicos = data.servicos.filter(s => s.getFuncionario().getId() !== Number(sessionId));;
        return servicos || false;
    }
    static async getServiceBySID(sid){
        if(!sid || typeof(sid) !== 'string') return false; 

        const match = sid.match(/^sid-(.)at\d+$/);
        const serviceId = match? match[1] : false;
        if(!serviceId) return false;

        const servico = data.servicos.find(s => s.id === Number(serviceId));
        
        return servico || false;

    }

    static async getHorarioBySID(sid){
        const servico = await this.getServiceBySID(sid);
        if(!servico) return false;
        const horario = servico.horarios.find(h => h.id === sid);

        return horario || false;
    }
}

module.exports = {ServicosService}