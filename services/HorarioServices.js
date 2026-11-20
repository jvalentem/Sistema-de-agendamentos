const pool = require('../data/mysql').pool;

class HorarioService{

    static async getHorarioById(id){
        try{
            const [[horario]] = await pool.query('SELECT * FROM horarios WHERE ID = ?',[id]);

            return horario || false;
            
        }catch(e){if(e) throw e}
    } 
    static formatDate(dataAgendamento){
        //RETORNA A DATA FORMATADA DO BANCO
        if (!dataAgendamento) return;
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'UTC' // evita deslocamento de dia em datas puras YYYY-MM-DD
        }).format(new Date(dataAgendamento));

    }

    static async getHorariosWhereDataIs(date){
        try{
            if(!date) throw new Error('Data nao informada');

            const selectQuery = 'SELECT * FROM horarios WHERE dataAgendamento = ?';
            const [horarios] = await pool.query(selectQuery,[date]);

            return horarios || false;


        }catch(e){if(e) throw e}
    }

    static async getHorariosFromServico(serviceId){
        //ja pega o horario com a coluna de dataAgendamento;
        const selectQuery = 'SELECT * FROM horarios WHERE fk_servico = ?';
        //fazer o
        const [horarios] = await pool.query(selectQuery,[Number(serviceId)]);

        horarios.forEach(h=> h.dataAgendamento = this.formatDate(h.dataAgendamento))

        return horarios || [];
    }

    static async addHorario(fk_servico,hora,dataAgendamento){
        //insert into horarios values ('15:00',serviceId)

        const insertQuery = 'INSERT INTO horarios(hora,dataAgendamento,fk_servico) VALUES (?,?,?)';
        console.log('criando horario...')

        const result = await pool.query(insertQuery,[hora,dataAgendamento,fk_servico])

        console.log('hcriado')
        return true;
    }
    static async isHorarioOcupado(id){
        const selectQuery = `select * from horarios where id = ? and ocupado = true`
        const [result] = await pool.query(selectQuery,[id]);

        return result || false;
    }
    static async apagarHorario(id){
        if(!id) return false;
        const deleteQuery = `delete from horarios where id = ?`;

        await pool.query(deleteQuery,[id]);
        return true;
    }
}

module.exports = {HorarioService}