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

    static async getServicos(sessionId){
        //O id do admin é 0 e !0 = true
        const userZero = sessionId === 0;
        if(!sessionId && !userZero) return false;
        //Previne que um funcionario, ao logar no sistema,
        //agende um horário com o próprio serviço
    
        const [servicos] = await pool.query(`select * from servicos where fk_funcionario != ${Number(sessionId)}`);

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
        console.log('serviço nao existe: ', !servico)
        if(!servico) return false;

        
        const [[horario]] = await pool.query(`select * from horarios where id = ${sid}`);
        console.log('horario nao existe: ', !horario)
        return horario || false;
    }
}

module.exports = {ServicosService}