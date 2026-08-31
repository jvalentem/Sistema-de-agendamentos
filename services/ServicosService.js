// const data = require('../data/databaseModel')
const pool = require('../data/mysql').pool;
const { FuncionarioService } = require('./FuncionarioService');
class ServicosService{

    static async createService(nome,funcionario,preco,duracao){
        if(!nome,!funcionario,!preco,!duracao) return false;
        const insertQuery = 'INSERT INTO servicos(nome,fk_funcionario,preco,duracao) VALUES (?,?,?,?)';

        await pool.query(insertQuery,[nome,funcionario.id,preco,duracao]);

        return true;
    }
    static async getServiceById(id){
        const selectQuery = 'select * from servicos where id = ?';
        const [[servico]] = await pool.query(selectQuery,[Number(id)]);
        if(!servico) return false;
        const horariosQuery = 'select * from horarios where fk_servico = ?';
        const [horarios] = await pool.query(horariosQuery,[servico.id]);
        servico.horarios = [...horarios]

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
    
        const selectQuery = 'select * from servicos';
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
}

module.exports = {ServicosService}