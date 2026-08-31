const pool = require('../data/mysql').pool;
const {ServicosService} = require('./ServicosService');

class UserService{

    static async validateUser(nome,senha){
        try {
            if(!nome || !senha) return false;
            const selectQuery = 'select * from usuarios where nome = ? and senha = ?';
            const [[user]] = await pool.query(selectQuery,[nome,senha]);

            return user || false;
        } catch (error) {
            console.log(error)
        }

    }

    static async getUserAgendamentos(userId){
        const isUserZero = userId === 0;
        if(!userId && !isUserZero) return false;
        
        const selectQuery = 'select * from agendamentos where fk_cliente = ?';
        const [agendamentos] = await pool.query(selectQuery,[userId]);
        const completeAgendamentos = await Promise.all(
            agendamentos.map(async a => {
                const servico = await ServicosService.getServiceById(a.fk_servico)
                return {...a, servico}
            })
        )
        return completeAgendamentos || [];
    }

    static async getUserById(id){
        const userZero = id === 0;
        if(!id && !userZero) return false;

        const selectQuery = 'select * from usuarios where id = ?';
        const [[user]] = await pool.query(selectQuery,[id]);

        return user || false;
    }
}

module.exports = {UserService}