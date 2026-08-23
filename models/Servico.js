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
    setFuncionario(funcionario){this.funcionario = funcionario}
    //Diferença entre setHorario e addHorario:
    //o set horario define o vetor como todo, o add horario adiciona ao fim do vetor ja existente
    addHorario(horario){this.horarios.push(horario)}
    setHorarios(horarios){this.horarios = horarios}

    setHorarioOcupado(horarioId,isOcupado){
        //Dentro do array do serviço, procura pelo horário especificado e altera o status de ocupado
        this.horarios.find(h => h.id == horarioId).setOcupado(isOcupado);
    }

    getId(){return this.id}
    getNome(){return this.nome}
    getFuncionario(){return this.funcionario}
    getHorarios(){return this.horarios}
}

module.exports = Servico