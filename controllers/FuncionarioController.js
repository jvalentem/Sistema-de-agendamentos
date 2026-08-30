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
       try{
            const user = req.session.user
            const userId = user.id

            const agendamentos = await FuncionarioService.getFuncionarioAgenda(userId);

            const agendamentosCompletos = await Promise.all(
                agendamentos.map(async a=>{
                    const servico = await AgendamentoService.getServico(a);
                    return {...a, servico}
                })
            )


            res.render('minha-agenda',{agendamentosCompletos});

       }catch(e){return res.status(400).json({error_message:e});}
    }
}

module.exports = {FuncionarioController}