class Agendamento{
    constructor(servico,horario,clienteId){
        this.servicoId = servico.id;
        this.horarioid = horario.id;
        this.hora = horario.hora;
        this.clienteId = clienteId
        this.funcionarioId = servico.fk_funcionario
        this.status = 'Em andamento' //status varchar(255) default 'Em andamento'
    }

    getServicoId(){return this.servicoId}
    getClienteId(){return this.clienteId}
    getFuncionarioId(){return this.funcionarioId}
    getHorarioId(){return this.horarioid}
    getId(){return this.id}
    getHora(){return this.hora}
    getStatus(){return this.status}

    setStatus(status){this.status = status}
    setServico(servico){this.servico = servico}
    setHorario(horario){this.horario = horario}
    //Necessário pois o banco permite armazenar varios agendamentos cancelados
    //Com o mesmo id, então é preciso diferenciar
    setId(id){this.id = id}
}

module.exports = Agendamento