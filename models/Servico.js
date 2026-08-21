class Servico{
    constructor(nome,funcionario,horarios,preco,duracao){
        this.nome = nome;
        this.funcionario = funcionario;
        this.horarios = horarios || [];
        this.preco = preco;
        this.duracao = duracao
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