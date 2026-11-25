const {ServicosService} = require('../services/ServicosService');
const {HorarioService} = require('../services/HorarioServices')
const {AgendamentoService} = require('../services/AgendamentoServices')
const {ClienteService} = require('../services/ClienteService');

class ServicosController{

    static async getDatas(req,res){
        try{
            const serviceId = req.params.sid;

            if(!serviceId) return res.status(400).json('Serviço não informado');

            const horarios = await HorarioService.getHorariosFromServico(serviceId);
            
            return res.status(200).json(horarios);
        }catch(e){console.error(e)}
    }
    static async criarServico(req,res){
        try{
            const info = req.body; 

            const result = await ServicosService.createService(info);
            
            if(result) return res.status(200).json('Serviço criado!');

            return res.status(400).json('Erro ao criar o serviço');

        }catch(e){console.error(e)}
    }

    static async mudarStatus(req,res){

        const servicoId = req.params.sid;
        if(!servicoId) return res.status(404).json('Serviço nao encontrado');
        await ServicosService.mudarStatus(servicoId)

        return res.status(200).json('Serviço desativado!');
    }
    static async detalhar(req,res){
        const servicoId = req.params.sid;

        const servico = await ServicosService.getServiceById(servicoId);

        if(!servico) return res.status(404).json('servico nao encontrado');

        return res.status(200).json(servico);
    }
    static async getServicosAtivos(req,res){
            
        let servicos = await ServicosService.getServicosAtivos()
        
        if(!servicos) return res.status(400).json({error_message:'erro ao carregar os serviços'});  

        return res.render('services',{servicos})

    }

    static async getServiceById(req,res){
        const serviceId = req.params.sid;
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

            const agendamento = await AgendamentoService.createAgendamento(servico.id, horario.id, cliente.id);

            //DEPOIS CRIAR UMA FORMA DE CONSULTAR OS AGENDAMENTOS  

            if(!agendamento) return res.status(400).json({error_message:'Erro ao criar agendamento'});

            return res.status(200).json('Agendamento criado com sucesso!')
        } catch (error) {
            return res.status(500).json({error_message: 'Erro interno ao criar o agendamento.'});
        }
    }

    static async editar(req,res){
       
        try{
            const serviceId = req.params.sid;
            const info = req.body
            if(!serviceId || !info) return false

            const response = await ServicosService.editarServico(serviceId,info)

        
            return res.status(200).json('Sucesso!');

        }catch(e){console.error(e)}
    
    }

}

module.exports = {ServicosController}