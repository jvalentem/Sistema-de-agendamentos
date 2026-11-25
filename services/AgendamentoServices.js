const pool = require('../data/mysql').pool
const { ServicosService } = require('./ServicosService');
const {HorarioService} = require('./HorarioServices')
class AgendamentoService{
    
    static async getAgendamentos(){
        //retorna todo o historico de agendamentos
        //Incluir query para retornar o agendamento completo

        const selectQuery = 'SELECT agendamentos.*, clientes.nome AS nome_cliente, usuarios.nome AS nome_funcionario, servicos.nome AS nome_servico, horarios.hora AS horario, horarios.dataAgendamento AS dataAgendamento FROM agendamentos JOIN clientes ON clientes.id = agendamentos.fk_cliente JOIN usuarios ON usuarios.id = agendamentos.fk_funcionario JOIN servicos ON servicos.id = agendamentos.fk_servico JOIN horarios ON horarios.id = agendamentos.fk_horario'
        const [agendamentos] = await pool.query(selectQuery);
        agendamentos.forEach(agendamento => {
            agendamento.dataAgendamento = HorarioService.formatDate(agendamento.dataAgendamento);
        });
        return agendamentos;
    }
    static async getAgendamentoByID(sid){
        const selectQuery ='SELECT agendamentos.*, clientes.nome AS nome_cliente,usuarios.nome AS nome_funcionario,servicos.nome AS nome_servico, horarios.hora AS horario, horarios.dataAgendamento AS dataAgendamento FROM agendamentos JOIN clientes ON clientes.id = agendamentos.fk_cliente JOIN usuarios ON usuarios.id = agendamentos.fk_funcionario JOIN servicos ON servicos.id = agendamentos.fk_servico JOIN horarios ON horarios.id = agendamentos.fk_horario WHERE agendamentos.id = ?'
        
        const [[agendamento]] = await pool.query(selectQuery,[sid])
    
        if (agendamento) agendamento.dataAgendamento = HorarioService.formatDate(agendamento.dataAgendamento);

        return agendamento || false;
    }

    static async getServico(agendamentoId){
        const query = `select * from servicos where id = ?`;
        const [[servico]] = await pool.query(query,[agendamentoId]);
        
        return servico || false;
    }

    static async canAlterAgendamento(user,agendamento){
        
        const isAdmin = user.acesso === 'admin';
        const isSameFuncionario = user.id === agendamento.fk_funcionario;

        
        return isAdmin || isSameFuncionario
    }

    static async cancelarAgendamento(sid, user){
        if(!user || !sid) return false;
        
        const conn = await pool.getConnection();
        try {

            await conn.beginTransaction(); //Inicia o rascunho

            const agendamento = await this.getAgendamentoByID(sid);
            if(!agendamento) {await conn.rollback(); return false};

            const horario = await ServicosService.getHorarioBySID(agendamento.fk_horario);

            if(!horario){ await conn.rollback(); return false};

            const canAlter = await this.canAlterAgendamento(user, agendamento); 
            if(!canAlter) {
                 //Se nao for nem o cliente e nem o funcionario daquele agendamento,
                //Então nao pode cancelar
                await conn.rollback();
                throw new Error('Você nao tem permissão para cancelar este agendamento')
            }
            const statusCanceladoQuery = `update agendamentos set aStatus = "Cancelado" where id = ? AND aStatus = "Em andamento"`
            const livrarHorarioQuery = `update horarios set ocupado = false where id = ? AND ocupado = true`
        
            await conn.query(statusCanceladoQuery,[agendamento.id])
            await conn.query(livrarHorarioQuery,[horario.id])  
            
            await conn.commit();
            return true;
        
        }catch(e){console.error(e)}
        finally{
            conn.release();
        }
        
    }

    static async deleteAgendamento(sid){
        const conn = await pool.getConnection();

        try {
            await conn.beginTransaction(); //Inicia o rascunho
            const [result] = await conn.query(`delete from agendamentos where id = ?`,[sid])
            if(result.affectedRows === 0){await conn.rollback(); return false}
        
            await conn.commit();

        }catch(e){console.error(e)}
        finally{
            conn.release();
        }
        
    }



   static async createAgendamento(servicoId, horarioId, clienteId) {
    if (!servicoId || !horarioId || clienteId == null) return false; // 0 continua válido

    const conn = await pool.getConnection();
    try {

        await conn.beginTransaction(); //Inicia o rascunho
        
        const servico = await ServicosService.getServiceById(servicoId);
        if (!servico || !servico.ativo) { await conn.rollback(); return false; }
        // Reserva atômica: só um UPDATE consegue trocar false -> true
        const [reserva] = await conn.query(
            'UPDATE horarios SET ocupado = true WHERE id = ? AND ocupado = false AND fk_servico = ?',
            [horarioId,servico.id]);
        
            if (reserva.affectedRows === 0) { await conn.rollback(); return false; } // já estava ocupado
        
            
        await conn.query(
            'INSERT INTO agendamentos (fk_servico, fk_horario, fk_cliente, fk_funcionario) VALUES (?,?,?,?)',
            [servicoId, horarioId, clienteId, servico.fk_funcionario]);

        await conn.commit(); //Confirma o rascunho  

        return true;
    } catch (err) {
        await conn.rollback(); //Descarta o rascunho
        throw err;
    } finally {
        conn.release(); //devolve a conexão ao pool
    }
}
}

module.exports = {AgendamentoService}