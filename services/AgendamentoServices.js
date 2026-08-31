const pool = require('../data/mysql').pool
const AgendamentoModel = require('../models/Agendamento');
const { ServicosService } = require('./ServicosService');

class AgendamentoService{

    static async getAgendamentoByID(sid){
        const selectQuery ='SELECT agendamentos.*, clientes.nome AS nome_cliente,usuarios.nome AS nome_funcionario,servicos.nome AS nome_servico, horarios.hora AS horario FROM agendamentos JOIN clientes ON clientes.id = agendamentos.fk_cliente JOIN usuarios ON usuarios.id = agendamentos.fk_funcionario JOIN servicos ON servicos.id = agendamentos.fk_servico JOIN horarios ON horarios.id = agendamentos.fk_horario WHERE agendamentos.id = ?'
        
        const [[agendamento]] = await pool.query(selectQuery,[sid])

        return agendamento || false;
    }

    static async getServico(agendamento){
        const query = `select * from servicos where id = ?`;
        const [[servico]] = await pool.query(query,[agendamento.fk_servico]);
        
        return servico || false;
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
        
        const statusCanceladoQuery = `update agendamentos set aStatus = "Cancelado" where id = ?`
        const livrarHorarioQuery = `update horarios set ocupado = false where id = ?`
        
        await pool.query(statusCanceladoQuery,[agendamento.id])
    
        await pool.query(livrarHorarioQuery,[horario.id])

        return true;
    }

    static async deleteAgendamento(sid){
        await pool.query(`delete from agendamentos where id = ?`,[sid])
    }

    static async createAgendamento(servico,horario,clienteId){
        //Novamente, o id do admin é 0
        const userZero = clienteId === 0;
        const horarioOcupado = horario.ocupado;
        console.log(!servico,!horario,!clienteId)
        if(!servico || !horario || (!clienteId && !userZero) || horarioOcupado) return false;

        //insert into agendamentos values(servicoId,horarioId,hora,clienteId,funcionarioId)
        
        await pool.query(`update horarios set ocupado = true where id = ?`,[horario.id]);
        console.log('horario ocupado')
        const insertQuery = `insert into agendamentos(fk_servico, fk_horario, fk_cliente, fk_funcionario, hora) values(?,?,?,?,?)`
        await pool.query(insertQuery,[servico.id,horario.id,clienteId,servico.fk_funcionario,horario.hora])
        console.log('agendamento criado')
        
        return true;
    }
}


module.exports = {AgendamentoService}