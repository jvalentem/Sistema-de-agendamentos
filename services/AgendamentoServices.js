const pool = require('../data/mysql').pool
const AgendamentoModel = require('../models/Agendamento');
const { ServicosService } = require('./ServicosService');

class AgendamentoService{

    static async getAgendamentoByID(sid){

        const [[agendamento]] = await pool.query(`select * from agendamentos where id = ${sid}`)

        return agendamento || false;
    }

    static async canAlterAgendamento(user,agendamento){
        const isAdmin = user.acesso === 'admin';
        const isSameFuncionario = user.id === agendamento.fk_funcionario;
        const isSameCliente = user.id === agendamento.fk_cliente;
        
        return isAdmin || isSameCliente || isSameFuncionario
    }

    static async cancelarAgendamento(sid, user){
        
        if(!user) return false;

        const agendamento = await this.getAgendamentoByID(sid);
        if(!agendamento) return false;
        const horario = await ServicosService.getHorarioBySID(agendamento.fk_horario);

        if(!horario) return false;
        //Se nao for nem o cliente e nem o funcionario daquele agendamento,
        //Então nao pode cancelar
        const canAlter = await this.canAlterAgendamento(user, agendamento); 
        if(!canAlter) throw new Error('Você nao tem permissão para cancelar este agendamento')
        
        const statusCanceladoQuery = `update agendamentos set aStatus = "Cancelado" where id = ${agendamento.id}`
        const livrarHorarioQuery = `update horarios set ocupado = false where id = ${horario.id}`
        
        await pool.query(statusCanceladoQuery)
    
        await pool.query(livrarHorarioQuery)

        return true;
    }

    static async deleteAgendamento(sid){
        await pool.query(`delete from agendamentos where id = ${sid}`)
    }

    static async createAgendamento(servico,horario,clienteId){
        //Novamente, o id do admin é 0
        const userZero = clienteId === 0;
        const horarioOcupado = horario.ocupado;

        if(!servico || !horario || (!clienteId && !userZero) || horarioOcupado) return false;

        //insert into agendamentos values(servicoId,horarioId,hora,clienteId,funcionarioId)
        const agendamento = new AgendamentoModel(servico,horario,clienteId);
        
        await pool.query(`update horarios set ocupado = true where id = ${horario.id}`);
        
        await pool.query(`insert into agendamentos(fk_servico, fk_horario, fk_cliente, fk_funcionario, hora) values(${servico.id},${horario.id},${clienteId},${servico.fk_funcionario},"${horario.hora}")`)
        
        
        return true;
    }
}


module.exports = {AgendamentoService}