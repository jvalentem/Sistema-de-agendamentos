const data = require('../data/databaseModel');

class FuncionarioService{
    static async getFuncionarioById(id){
        const funcionario = data.usuarios.find(u => u.acesso === 'funcionario' && u.id === Number(id));
        return funcionario || false;
    }
    static async getFuncionarioServices(id){
        const funcionario = await this.getFuncionarioById(id);
        if(!funcionario) return false;

        const servicosFuncionario = data.servicos.filter(s => s.getFuncionario().getId() === Number(id));
        return servicosFuncionario || false;
    }
    static async getFuncionarioAgenda(id){
        const funcionario = await this.getFuncionarioById(id);
        if(!funcionario) return false;
        const agendamentos = data.agendamentos.filter(a => a.servico.funcionario.id === Number(id));

        return agendamentos || false;
    }
}

module.exports = {FuncionarioService}