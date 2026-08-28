const data = require('../data/databaseModel');

class FuncionarioService{
    static async getFuncionarioById(id){
        const funcionario = data.usuarios.find(u => u.acesso === 'funcionario' && u.id === Number(id));
        return funcionario || false;
    }
    static async getFuncionarioServices(id){

        //select * from servicos where funcionarioId = id
        const funcionario = await this.getFuncionarioById(id);
        if(!funcionario) return false;

        const servicosFuncionario = data.servicos.filter(s => s.funcionarioId === Number(id));

        
        servicosFuncionario.forEach(s => s.funcionario = FuncionarioService.getFuncionarioById(s.funcionarioId));
        return servicosFuncionario || false;
    }
    static async getFuncionarioAgenda(id){
        const funcionario = await this.getFuncionarioById(id);
        if(!funcionario) return false;
        const agendamentos = data.agendamentos.filter(a => a.funcionarioId === Number(id));
        return agendamentos || false;
    }
}

module.exports = {FuncionarioService}