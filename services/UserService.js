const data = require('../data/databaseModel');

class UserService{

    static async validateUser(nome,senha){
        if(!nome || !senha) return false;

        const user = data.usuarios.find(u => u.nome === nome && u.senha === senha);

        return user || false;

    }

    static async getUserAgendamentos(userId){
        const isUserZero = userId === 0;
        if(!userId && !isUserZero) return false;
        const userAgendamentos = data.agendamentos.filter(a => a.clienteId === Number(userId) && a.status == 'Em andamento' );

        return userAgendamentos || [];
    }

    static async getUserById(id){
        const userZero = id === 0;
        if(!id && !userZero) return false;

        const user = data.usuarios.find(u => u.id === Number(id));
        
        return user || false;
    }
}

module.exports = {UserService}