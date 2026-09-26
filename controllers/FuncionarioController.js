const {FuncionarioService} = require('../services/FuncionarioService')
const {AgendamentoService} = require('../services/AgendamentoServices');
const { ServicosService } = require('../services/ServicosService');

class FuncionarioController{

    static async getFuncionarioServices(req,res){
        try{
            const currentUser = req.session.user;
            const id = currentUser.id;

            const servicos = await FuncionarioService.getFuncionarioServices(id);

            return res.render('seus-servicos',{servicos});
        }catch(e){return res.status(400).json({error_message:e})}
    }

    static async getAgenda(req,res){
        console.log('router')
       try{
            const user = req.session.user

            //Se o usuario for admin, ele está tentando acessar pelo fetch, entao pego o ID do funcionario pela propria URL
            //Se for um funcionario, ele esta tentando acessar normalmente pelo link, entao pego o id da sessão dele
            const id = user.acesso === 'admin' && req.params.funcionarioId ? req.params.funcionarioId : user.id
            console.log(id)
            const agendamentos = await FuncionarioService.getFuncionarioAgenda(id);
            
            if(!agendamentos) return res.status(404).json("Nenhum agendamento!")

            if(user.acesso === 'funcionario') return res.render('minha-agenda',{agendamentos});

            return res.status(200).json(agendamentos)

       }catch(e){return res.status(400).json({error_message:e});}
    }
}

module.exports = {FuncionarioController}