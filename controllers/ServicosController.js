const {ServicosService} = require('../services/ServicosService');
const {AgendamentoService} = require('../services/AgendamentoServices')
const {HorarioService} = require('../services/HorarioServices');
const { FuncionarioService } = require('../services/FuncionarioService');
const {ClienteService} = require('../services/ClienteService');
class ServicosController{

    static async getServicos(req,res){
            
        let servicos = await ServicosService.getServicos()
        
        if(!servicos) return res.status(400).json({error_message:'erro ao carregar os serviços'});  

        return res.render('services',{servicos})

    }

    static async getServiceById(req,res){
        const serviceId = req.params.serviceId;
        if(!serviceId) return res.status(400)

        const servico = await ServicosService.getServiceById(serviceId);
        if(!servico) return res.status(404).json({error_message:'Serviço não existe!'})
            
        return res.render('single-service', {servico})
    }

    static async agendarServico(req,res){
        try {
            const sid = req.params.sid;
            const { nome, telefone, email } = req.body || {};

            if(!sid) return res.status(400).json({error_message:'Horário não informado.'});

            if(!nome || !telefone || !email) {
                return res.status(400).json({error_message:'Preencha nome, telefone e email para confirmar o agendamento.'});
            }

            const servico = await ServicosService.getServiceBySID(sid);
            const horario = await ServicosService.getHorarioBySID(sid);

            if(!servico || !horario) {
                return res.status(404).json({error_message:'Serviço ou horário não encontrado.'});
            }

            if(horario.ocupado) return res.status(401).json({error_message:'Este horário ja está ocupado!'});
            
            const cliente = await ClienteService.clienteExiste(nome,telefone,email);

            const agendamento = await AgendamentoService.createAgendamento(servico, horario, cliente.id);

            //DEPOIS CRIAR UMA FORMA DE CONSULTAR OS AGENDAMENTOS  

            if(!agendamento) return res.status(400).json({error_message:'Erro ao criar agendamento'});


        } catch (error) {
            return res.status(500).json({error_message: 'Erro interno ao criar o agendamento.'});
        }
    }

}

module.exports = {ServicosController}