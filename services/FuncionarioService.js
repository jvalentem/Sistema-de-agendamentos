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
}

module.exports = {FuncionarioService}