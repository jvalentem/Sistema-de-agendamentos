const data = require('../data/databaseModel');

class UserService{
    static validateUser(nome,senha){
        if(!nome || !senha) return false;

        const user = data.usuarios.find(u => u.nome === nome && u.senha === senha);

        return user || false;

    }
}

module.exports = {UserService}