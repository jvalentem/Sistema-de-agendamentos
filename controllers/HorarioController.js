const {HorarioService} = require('../services/HorarioServices');
class HorarioController{
    static async getHorarios(req,res){
        try{
            const serviceId = req.params.sid;
            if(!serviceId) return res.status(404).json('Serviço não encontrado!')

            const horarios = await HorarioService.getHorariosFromServico(serviceId);
            if(!horarios) return res.status(404).json('Nenhum horário disponível!')
                
            return res.status(200).json(horarios);
        }catch(e){
            return res.status(400).json('Erro interno ao consultar os serviços')
        }
    }

    static async createHorario(req,res){
        try{

            //Cabe ao funcionário ou ao admin criar um horário?
            const serviceId = req.params.sid;
            const hora = req.body.hora;
            if(!hora || !serviceId) return res.status(400).json('Erro ao criar o horário');
            
            await HorarioService.addHorario(hora,serviceId);

            return res.status(200).json('Horario adicionado com sucesso');
        }catch(e){
            return res.status(400).json('Erro interno ao criar o horário')
        }
    }

    static async apagarHorario(req,res){
        try{
            const horarioId = req.params.hid;
            if(!horarioId) return false;
            const horarioOcupado = await HorarioService.isHorarioOcupado(horarioId);

            if(horarioOcupado) return res.status(400).json('O horário está ocupado por um cliente, cancele o agendamento ou complete-o antes de apagar o horário');
            
            await HorarioService.apagarHorario(horarioId);
            return res.status(200).json('Horario apagado')
        }catch(e){
            return res.status(400).json('Erro interno ao apagar o horário')
        }
    }
}


module.exports = {HorarioController}