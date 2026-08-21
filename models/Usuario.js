
class Usuario{
    constructor(nome,senha,acesso){
        this.acesso = acesso || 'cliente'; //o acesso por padrao é cliente
        this.nome = nome
        this.senha = senha;
    }

    setId(id){this.id = id} //O id vai ser baseado no tamanho do index do array de usuarios
    setNome(nome){this.nome = nome}
    setSenha(senha){this.senha = senha}
    setAcesso(acesso){this.acesso = acesso}

    getId(){return this.id}
    getAcesso(){return this.acesso}
    getSenha(){return this.senha}
    getNome(){return this.nome}
    getAgendamentos(){//agendamentos.filter(a => a.cliente === this.getId())    
    }
}


module.exports = Usuario;