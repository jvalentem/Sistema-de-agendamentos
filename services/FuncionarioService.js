const pool = require('../data/mysql').pool;

class FuncionarioService{
    static async getFuncionarios(){
        const selectQuery = 'select * from usuarios where acesso = ?';
        const [funcionarios] = await pool.query(selectQuery,['funcionario']);

        return funcionarios;
    }
    static async getFuncionarioById(id){
        const selectQuery = 'select * from usuarios where id = ?'
        const [[funcionario]] = await pool.query(selectQuery,[id]);

        return funcionario || false;
    }
    static async getFuncionarioServices(id){

        //select * from servicos where funcionarioId = id
        const funcionario = await this.getFuncionarioById(id);
        if(!funcionario) return false;
        
        const selectQuery = 'select * from servicos where fk_funcionario = ? and ativo = true'
        const [servicosFuncionario] = await pool.query(selectQuery,[id]);
        
        return servicosFuncionario || false;
    }
    static async getFuncionarioAgenda(id){
        const funcionario = await this.getFuncionarioById(id);
        if(!funcionario) return false;

        const selectQuery = 'select * from agendamentos where fk_funcionario = ?'
        const [agendamentos] = await pool.query(selectQuery,[id]);

        return agendamentos || false;
    }
}

module.exports = {FuncionarioService}