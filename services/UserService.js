const pool = require('../data/mysql').pool;
const {ServicosService} = require('./ServicosService');
const {comparePassword} = require('../utils/password')

class UserService{

    static async getUsers(){
        const selectQuery = 'SELECT * FROM usuarios'
        const [usuarios] = await pool.query(selectQuery);

        return usuarios
    }
    static async validateUser(nome,senha){
        try {
            if(!nome || !senha) return false;
            const selectQuery = 'select * from usuarios where nome = ?';
            const [[user]] = await pool.query(selectQuery,[nome]);

            if(!user) return false; 

            const senhaValida = await comparePassword(
                senha,
                user.senha
            )

            if(!senhaValida) return false;

            return user
        } catch (error) {
        }

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