class Servico{
    constructor(nome,funcionario,preco,duracao){
        this.nome = nome;
        this.funcionarioId = funcionario.id;
        this.preco = preco;
        this.duracao = duracao
    }

    setId(id){this.id = id} //O id vai ser baseado no tamanho do index do array de usuarios
    setNome(nome){this.nome = nome}
    setFuncionario(funcionario){this.funcionario = funcionario}

    getId(){return this.id}
    getNome(){return this.nome}
    getFuncionario(){return this.funcionario}
    getHorarios(){//select * from horarios where servico = this.id
        }
}

module.exports = Servico