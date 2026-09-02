const pool = require('../data/mysql').pool;
const { FuncionarioService } = require('./FuncionarioService');
class ServicosService{

    static async createService(nome,funcionario,preco,duracao){
        if(!nome,!funcionario,!preco,!duracao) return false;
        const insertQuery = 'INSERT INTO servicos(nome,fk_funcionario,preco,duracao) VALUES (?,?,?,?)';

        await pool.query(insertQuery,[nome,funcionario.id,preco,duracao]);

        return true;
    }

    static async getHorarios(id){
        const selectQuery = 'SELECT horarios.* FROM servicos JOIN horarios ON horarios.fk_servico = servicos.id where servicos.id = ?';
        const [horarios] = await pool.query(selectQuery,[Number(id)]);
        console.log(horarios);
        return horarios || [];
    }
    static async getServiceById(id){
        const selectQuery = 'SELECT * FROM servicos WHERE id = ?';
        const [[servico]] = await pool.query(selectQuery,[Number(id)]);

        servico.horarios = await this.getHorarios(id);
        
        return servico || false;
    }

    static async getServiceBySID(fkHorario){
        //"A qual serviço pertence esse horário?"
        const selectQuery = 'select * from horarios where id = ?';
        const [[horario]] = await pool.query(selectQuery,[Number(fkHorario)])
        if(!horario) return false;
        const serviceQuery = 'select * from servicos where id = ?';
        const [[servico]] = await pool.query(serviceQuery,[horario.fk_servico])
        

        return servico || false;
    }

    static async getServicos(){
        //retorna apenas os servicos ativos
        const selectQuery = 'select * from servicos where ativo = true';
        const [servicos] = await pool.query(selectQuery);

        const completeServicos = await Promise.all(
            servicos.map(async s =>{
                const funcionario = await FuncionarioService.getFuncionarioById(s.fk_funcionario);
                return {...s, funcionario}
            })
        )

        return completeServicos || false;
    }

    static async getHorarioBySID(sid){
        const servico = await this.getServiceBySID(sid);

        if(!servico) return false;

        const selectQuery = 'select * from horarios where id = ?';
        const [[horario]] = await pool.query(selectQuery,[sid]);

        return horario || false;
    }

    static async getFuncionario(sid){
        const getServiceQuery = 'select * from servicos where id = ?';
        const [[servico]] = await pool.query(getServiceQuery,[sid]);
        
        if(!servico) return false;
        const getFuncionarioQuery = 'select * from usuarios where id = ? and acesso = "funcionario"';
        const [[funcionario]] = await pool.query(getFuncionarioQuery,[servico.fk_funcionario]);

        return funcionario || false;
    }

    static async desativarServico(id){
        console.log(id)
        const servico = await this.getServiceById(id);
        if(!servico) return false;

        const deactivateQuery = `update servicos set ativo = false where id = ?`;
        return await pool.query(deactivateQuery,[id]);
    }
}

module.exports = {ServicosService}