// const data = require('../data/databaseModel')
const pool = require('../data/mysql').pool;
const Servico = require('../models/Servico');
const { FuncionarioService } = require('./FuncionarioService');
class ServicosService{

    static async createService(servico){
        // const servico = new Servico('serviço','funcionario',[],45,45)

        data.servicos.push(servico);
    }
    static async getServiceById(id){
        const [[servico]] = await pool.query(`select * from servicos where id = ${Number(id)}`);
        if(!servico) return false;
        const [horarios] = await pool.query(`select * from horarios where fk_servico = ${servico.id}`);
        servico.horarios = [...horarios]

        return servico || false;
    }

    static async getServiceBySID(fkHorario){
        //"A qual serviço pertence esse horário?"
        const [[horario]] = await pool.query(`select * from horarios where id = ${Number(fkHorario)}`)
        if(!horario) return false;
        const [[servico]] = await pool.query(`select * from servicos where id = ${horario.fk_servico}`)
        

        return servico || false;
    }

    static async getServicos(){
    
        const [servicos] = await pool.query(`select * from servicos`);

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

        
        const [[horario]] = await pool.query(`select * from horarios where id = ${sid}`);

        return horario || false;
    }

    static async getFuncionario(sid){
        const getServiceQuery = `select * from servicos where id = ${sid}`;
        const [[servico]] = await pool.query(getServiceQuery);
        
        if(!servico) return false;
        const getFuncionarioQuery = `select * from usuarios where id = ${servico.fk_funcionario} and acesso= "funcionario"`;
        const [[funcionario]] = await pool.query(getFuncionarioQuery);

        return funcionario || false;
    }
}

module.exports = {ServicosService}