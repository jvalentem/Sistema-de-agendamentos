class Horario{
    constructor(hora,serviceId){
        
        this.hora = hora;
        this.ocupado = false; //ocupado boolean default false
        this.servicoId = serviceId
    }

    setHora(hora){this.hora = hora}
    setOcupado(ocupado){this.ocupado = ocupado}
    setId(id){this.id = id}
    getId(){return this.id}
    isOcupado(){return this.ocupado}
    getHora(){return this.hora}
}

module.exports = Horario;