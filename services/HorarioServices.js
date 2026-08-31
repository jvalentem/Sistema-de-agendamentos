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
    }
}

module.exports = {HorarioService}