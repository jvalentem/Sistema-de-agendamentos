const { FuncionarioService } = require('../services/FuncionarioService');
const {UserService} = require('../services/UserService');

class UserController{


    static async login(req,res){
        try{
            const {nome,senha} = req.body;

            const user = await UserService.validateUser(nome,senha);
            if(!user) return res.status(403).json({error_message:'Acesso negado!'});

            const acesso = user.acesso;

            if(!acesso) return res.status(400).json({error_message:'Erro ao consultar o acesso'})
            
            req.session.user = user;

            if(acesso === 'admin') return //pagina de admin
            if(acesso === 'funcionario') {
                
                //Não é necessário adicionar um if !agendamentosFuncionario
                //Pois um funcionario pode nao ter agendamentos marcados (vetor vazio)
                return res.status(200).json({'redirectTo':'/funcionario/agendamentos'});
            }

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

        return res.render('me',{userAgendamentos})
    }
}

module.exports = {UserController}