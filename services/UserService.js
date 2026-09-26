const pool = require('../data/mysql').pool;
const {ServicosService} = require('./ServicosService');

class UserService{

    static async getUsers(){
        const selectQuery = 'SELECT * FROM usuarios'
        const [usuarios] = await pool.query(usuarios);

        return usuarios
    }
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


    static async getUserById(id){
        const userZero = id === 0;
        if(!id && !userZero) return false;

        const selectQuery = 'select * from usuarios where id = ?';
        const [[user]] = await pool.query(selectQuery,[id]);

        return user || false;
    }
}

module.exports = {UserService}