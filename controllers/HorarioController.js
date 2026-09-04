const {HorarioService} = require('../services/HorarioServices');
class HorarioController{
    static async getHorarios(req,res){
        const serviceId = req.params.sid;
        if(!serviceId) return res.status(404).json('Serviço não encontrado!')

        const horarios = HorarioService.getHorariosFromServico(serviceId);
        if(!horarios) return res.status(404).json('Nenhum horário disponível!')
            
        return res.status(200).json(horarios);
    }

    static async createHorario(req,res){
        //Cabe ao funcionário ou ao admin criar um horário?
        const serviceId = req.params.sid;
        const hora = req.body.hora;
        if(!hora || !serviceId) return res.status(400).json('Erro ao criar o horário');
        
        HorarioService.addHorario(hora,serviceId);

        return res.status(200).json('Horario adicionado com sucesso');
    }
}


module.exports = {HorarioController}