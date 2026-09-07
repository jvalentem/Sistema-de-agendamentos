const pool = require('../data/mysql').pool;
const HorarioModel = require('../models/Horario') 
class HorarioService{
    static async getHorariosFromServico(serviceId){
       //select * from horarios where servico = serviceId
       const selectQuery = 'select * from horarios where fk_servico = ?'
       const [horarios] = await pool.query(selectQuery,[serviceId]);

       return horarios || false;
    }

    static async addHorario(hora,serviceId){
        //insert into horarios values ('15:00',serviceId)

        const insertQuery = 'INSERT INTO horarios(hora,fk_servico) VALUES (?,?)';

        await pool.query(insertQuery,[hora,serviceId])

        return true;
    }
    static async isHorarioOcupado(id){
        const selectQuery = `select * from horarios where id = ? and ocupado = true`
        const [result] = await pool.query(selectQuery,[id]);

        return result || false;
    }
    static async apagarHorario(id){
        if(!id) return false;
        const deleteQuery = `delete from horarios where id = ? a`;

        await pool.query(deleteQuery,[id]);
        return true;
    }
}

module.exports = {HorarioService}