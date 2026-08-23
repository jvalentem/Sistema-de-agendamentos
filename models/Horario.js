class Horario{
    constructor(hora,serviceId){
        this.hora = hora;
        this.id = this.generateId(serviceId); //necessário um id diferenciado para o cliente poder acessar o serviço pelo link
        this.ocupado = false;
    }

    generateId(serviceId){
        return `sid-${serviceId}at${this.hora.replace(':','')}`
    }

    setHora(hora){this.hora = hora}
    setOcupado(ocupado){this.ocupado = ocupado}

    getId(){return this.id}
    isOcupado(){return this.ocupado}
    getHora(){return this.hora}
}

module.exports = Horario;