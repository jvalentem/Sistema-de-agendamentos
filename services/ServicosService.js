const data = require('../data/databaseModel')

class ServicosService{
    static getServiceById(id){
        const servico = data.servicos.find(s => s.id === Number(id));
        return servico || false;
    }

    static getServiceBySID(sid){
        if(!sid || typeof(sid) !== 'string') return false; 

        const match = sid.match(/^sid-(.)at\d+$/);
        const serviceId = match? match[1] : false;
        if(!serviceId) return false;

        const servico = data.servicos.find(s => s.id === Number(serviceId));
        
        return servico || false;

    }

    static getHorarioBySID(sid){
        const servico = this.getServiceBySID(sid);
        if(!servico) return false;

        const horario = servico.horarios.find(h => h.id === sid);

        return horario || false;
    }
}

module.exports = {ServicosService}