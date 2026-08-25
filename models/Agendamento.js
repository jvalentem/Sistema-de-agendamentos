class Agendamento{
    constructor(servico,horario,clienteId){
        this.servico = servico;
        this.id = horario.getId() //o id do agendamento vai ser o mesmo id do horario
        this.hora = horario.hora;
        // this.horario.clienteId = clienteId;
        this.clienteId = clienteId
        this.status = 'Em andamento'
    }

    getServico(){return this.servico}
    getClienteId(){return this.clienteId}
    getId(){return this.id}
    getStatus(){return this.status}

    setStatus(status){this.status = status}
    setServico(servico){this.servico = servico}
    setHorario(horario){this.horario = horario}
    //Necessário pois o banco permite armazenar varios agendamentos cancelados
    //Com o mesmo id, então é preciso diferenciar
    setId(id){this.id = id}
}

module.exports = Agendamento