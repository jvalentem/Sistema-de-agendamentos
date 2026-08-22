const data = require('../data/databaseModel');

class UserService{
    static validateUser(nome,senha){
        if(!nome || !senha) return false;

        const user = data.usuarios.find(u => u.nome === nome && u.senha === senha);

        return user || false;

    }

    static getUserAgendamentos(userId){
        const isUserZero = userId === 0;
        if(!userId && !isUserZero) return false;

        const userAgendamentos = data.agendamentos.filter(a => a.horario.clienteId === Number(userId));

        return userAgendamentos || [];
    }
}

module.exports = {UserService}