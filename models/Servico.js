class Servico{
    constructor(nome,funcionarioId,horarios){
        this.nome = nome;
        this.funcionarioId = funcionarioId;
        this.horarios = horarios || [];
    }

    setId(id){this.id = id} //O id vai ser baseado no tamanho do index do array de usuarios
    setNome(nome){this.nome = nome}
    setFuncionarioId(funcionarioId){this.funcionarioId = funcionarioId}
    addHorario(horario){this.horarios.push(horario)}

    getId(){return this.id}
    getNome(){return this.nome}
    getFuncionarioId(){return this.funcionarioId}
    getHorarios(){return this.horarios}
}

module.exports = Servico