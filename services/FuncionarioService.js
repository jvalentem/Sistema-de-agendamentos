const pool = require('../data/mysql').pool;

class FuncionarioService{
    static async getFuncionarioById(id){
        const [[funcionario]] = await pool.query(`select * from usuarios where id = ${Number(id)}`);

        return funcionario || false;
    }
    static async getFuncionarioServices(id){

        //select * from servicos where funcionarioId = id
        const funcionario = await this.getFuncionarioById(id);
        if(!funcionario) return false;

        const [servicosFuncionario] = await pool.query(`select * from servicos where fk_funcionario = ${id}`);
        
        return servicosFuncionario || false;
    }
    static async getFuncionarioAgenda(id){
        const funcionario = await this.getFuncionarioById(id);
        if(!funcionario) return false;
        const [agendamentos] = await pool.query(`select * from agendamentos where fk_funcionario = ${id}`);

        return agendamentos || false;
    }
}

module.exports = {FuncionarioService}