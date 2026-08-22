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
    //Diferença entre setHorario e addHorario:
    //o set horario define o vetor como todo, o add horario adiciona ao fim do vetor ja existente
    addHorario(horario){this.horarios.push(horario)}
    setHorarios(horarios){this.horarios = horarios}

    getId(){return this.id}
    getNome(){return this.nome}
    getFuncionarioId(){return this.funcionarioId}
    getHorarios(){return this.horarios}
}

module.exports = Servico