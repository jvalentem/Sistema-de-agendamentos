const {FuncionarioService} = require('../services/FuncionarioService')


class FuncionarioController{
    static async getFuncionarioServices(req,res){
        const currentUser = req.session.user;
        if(!currentUser) return res.redirect('/');

        const acesso = currentUser.acesso;
        const id = currentUser.id;
        if(acesso !== 'funcionario') return res.status(403).json({error_message:'Acesso proibido: o usuário da sessão não é um funcionario'})
        
        const servicos = await FuncionarioService.getFuncionarioServices(id);
        
        return res.render('seus-servicos',{servicos});
    }

    static async getAgenda(req,res){
        if(!req.session.user) res.redirect('/');
        const user = req.session.user
        if(user.acesso !== 'funcionario') return res.status(403).json({error_message:'Acesso negado!'});

        const userId = user.id

        const agendamentos = await FuncionarioService.getFuncionarioAgenda(userId);
        
        res.render('minha-agenda',{agendamentos});
    }
}

module.exports = {FuncionarioController}