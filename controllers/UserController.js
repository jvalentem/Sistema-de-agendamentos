const {UserService} = require('../services/UserService');


class UserController{
    static async login(req,res){
        try{

            if(!req.body) return false;
            const dados = req.body;

            const usuario = await UserService.validateUser(dados.nome,dados.senha)
            if(!usuario) return res.status(401).json({error_message:'Usuario ou senha incorretos'})
            
            req.session.user = usuario;

            return res.status(201).json({'redirectTo':'/'});

        }catch(e){
            return res.status(400).json({error_message:e});
        }
    }
    static async getById(req,res){
        try{
            if(!req.session.user) return res.redirect('/');
            const id = req.session.user.id;
            const usuario = await UserService.getUserById(id);
            return usuario;
        }catch(e) {
            return res.status(400).json({error_message:e});}
        }

    static async getAgendamentos(req,res){
        if(!req.session.user) return res.redirect('/');
        
        //Necessario referenciar a propria classe pois o express chama o handler, nao a classe
        const usuario = await UserController.getById(req,res) 
        if(!usuario) return res.status(404).json({error_message:'Usuario nao encontrado em nosso banco!'});

        const userAgendamentos = await UserService.getUserAgendamentos(usuario.id)
        console.log(userAgendamentos)
        return res.render('me',{userAgendamentos})
    }
}

module.exports = {UserController}