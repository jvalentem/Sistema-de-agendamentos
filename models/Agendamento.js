class Agendamento{
    constructor(servico,horario,clienteId){
        this.servico = servico;
        this.horario = horario;
        this.id = horario.getId()
        this.horario.clienteId = clienteId;
    }

    getServico(){return this.servico}
    getHorario(){return this.horario}
    getId(){return this.id}

    setServico(servico){this.servico = servico}
    setHorario(horario){this.horario = horario}
}

module.exports = Agendamento