const {ServicosService} = require('../services/ServicosService');
const {AgendamentoService} = require('../services/AgendamentoServices')
const {HorarioService} = require('../services/HorarioServices');
const { FuncionarioService } = require('../services/FuncionarioService');
class ServicosController{

    static async getServicos(req,res){

        if(!req.session.user) return res.render('login')
            
        const session = req.session.user;
        const sessionId = session.id;

        let servicos = await ServicosService.getServicos(sessionId)
        
        if(!servicos) return res.status(400).json({error_message:'erro ao carregar os serviços'});
        //select * from servicos
        
        return res.render('services',{servicos})

    }

    static async getServiceById(req,res){
        const serviceId = req.params.serviceId;
        if(!serviceId || !req.session.user) return res.redirect('/');

        const servico = await ServicosService.getServiceById(serviceId);
        
        if(!servico) return res.status(404).json({error_message:'Serviço não existe!'})
        const horarios = await HorarioService.getHorariosFromServico(serviceId);
        servico.horarios = horarios

        return res.render('single-service', {servico})
    }

    static async agendarServico(req,res){
        const sid = req.params.sid;
        if(!sid || !req.session.user) return res.redirect('/');

        const servico = await ServicosService.getServiceBySID(sid);
        const horario = await ServicosService.getHorarioBySID(sid);
        
        const clienteId = req.session.user.id;
        if(horario.isOcupado()) return res.status(401).json({error_message:'Este horário ja está ocupado!'});

        const agendamento = await AgendamentoService.createAgendamento(servico,horario,clienteId);

        if(!agendamento) return res.json({error_message:'Erro ao criar agendamento'});

        
        return res.json({'redirectTo':'/usuario/me'});
    }

}

module.exports = {ServicosController}