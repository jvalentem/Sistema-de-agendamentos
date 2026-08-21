class Agendamento{
    constructor(servico,horario,clienteId){
        this.servico = servico;
        this.horario = horario;
        this.id = horario.getId()
        this.horario.clienteId = clienteId;
        this.status = 'Em andamento'
    }

    getServico(){return this.servico}
    getHorario(){return this.horario}
    getId(){return this.id}
    getStatus(){return this.status}

    setStatus(status){this.status = status}
    setServico(servico){this.servico = servico}
    setHorario(horario){this.horario = horario}
}

module.exports = Agendamento