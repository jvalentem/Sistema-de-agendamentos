const pool = require('../data/mysql').pool;
const HorarioModel = require('../models/Horario') 
class HorarioService{
    static async getHorariosFromServico(serviceId){
       //select * from horarios where servico = serviceId
       
       const [horarios] = pool.query(`select * from horarios where fk_servico = ${serviceId}`);

       return horarios || false;
    }

    static async addHorario(serviceId){
        //insert into horarios values ('15:00',serviceId)
        const horario = new HorarioModel('15:00',serviceId);

        data.horarios.push(horario)
    }
}

module.exports = {HorarioService}