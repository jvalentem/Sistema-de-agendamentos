class Horario{
    constructor(hora,serviceId){
        this.hora = hora;
        this.id = this.generateId(serviceId); //necessário um id diferenciado para o cliente poder acessar o serviço pelo link
        this.clienteId = null;
    }

    generateId(serviceId){
        return `sid${serviceId}at-${this.hora.replace(':','')}`
    }

    setHora(hora){this.hora = hora}
    setCliente(clienteId){this.clienteId = clienteId}

    getId(){return this.id}
    getClienteId(){return this.clienteId}
    getHora(){return this.hora}
}

module.exports = Horario;