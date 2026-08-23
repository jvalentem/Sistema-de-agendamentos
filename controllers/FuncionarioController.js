const {FuncionarioService} = require('../services/FuncionarioService')


class FuncionarioController{
    static async getFuncionarioServices(req,res){
        const currentUser = req.session.user;
        if(!currentUser) return res.redirect('/');

        const acesso = currentUser.acesso;
        const id = currentUser.id;
        console.log(acesso);
        if(acesso !== 'funcionario') return res.status(403).json({error_message:'Acesso proibido: o usuário da sessão não é um funcionario'})
        
        const servicos = await FuncionarioService.getFuncionarioServices(id);
        
        return res.render('seus-servicos',{servicos});
    }
}

module.exports = {FuncionarioController}