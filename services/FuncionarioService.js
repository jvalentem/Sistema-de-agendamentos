const pool = require('../data/mysql').pool;

class FuncionarioService{
    static async getFuncionarios(){
        const selectQuery = 'select * from usuarios where acesso = ?';
        const [funcionarios] = await pool.query(selectQuery,['funcionario']);

        return funcionarios;
    }
    static async getFuncionarioById(id){
        const selectQuery = 'select * from usuarios where id = ?'
        const [[funcionario]] = await pool.query(selectQuery,[id]);

        return funcionario || false;
    }
    static async getFuncionarioServices(id){

        //select * from servicos where funcionarioId = id
        const funcionario = await this.getFuncionarioById(id);
        if(!funcionario) return false;
        
        const selectQuery = 'select * from servicos where fk_funcionario = ? and ativo = true'
        const [servicosFuncionario] = await pool.query(selectQuery,[id]);
        
        return servicosFuncionario || false;
    }
    static async getFuncionarioAgenda(id){
        const funcionario = await this.getFuncionarioById(id);
        if(!funcionario) return false;

        const selectQuery = 'select agendamentos.*, usuarios.nome AS nome_funcionario, clientes.nome AS nome_cliente, servicos.nome AS nome_servico, horarios.hora AS hora FROM agendamentos JOIN usuarios ON usuarios.id = agendamentos.fk_funcionario JOIN clientes ON clientes.id = fk_cliente JOIN horarios ON horarios.id = fk_horario JOIN servicos ON servicos.id = agendamentos.fk_servico where agendamentos.fk_funcionario = ?'
        const [agendamentos] = await pool.query(selectQuery,[id]);

        return agendamentos || false;
    }

    static async mudarStatus(id){
        if(!Number.isInteger(Number(id)) || Number(id) <= 0) return false;

        const conn = await pool.getConnection();
        try{
            await conn.beginTransaction();

            const [[funcionario]] = await conn.query(
                'select id, ativo from usuarios where id = ? and acesso = ? for update',
                [id, 'funcionario']
            );
            if(!funcionario){
                await conn.rollback();
                return false;
            }

            const funcionarioAtivo = funcionario.ativo === true || funcionario.ativo === 1;
            if(funcionarioAtivo){
                const [[agendamentoAtivo]] = await conn.query(
                    'select id from agendamentos where fk_funcionario = ? and aStatus = ? limit 1',
                    [id, 'Em andamento']
                );
                if(agendamentoAtivo){
                    await conn.rollback();
                    return { bloqueado: true };
                }

                await conn.query('update usuarios set ativo = false where id = ?', [id]);
                await conn.query(
                    'update servicos set ativo = false where fk_funcionario = ? and ativo = true',
                    [id]
                );
            }else{
                await conn.query('update usuarios set ativo = true where id = ?', [id]);
            }

            await conn.commit();
            return { ativo: !funcionarioAtivo };
        }catch(error){
            await conn.rollback();
            throw error;
        }finally{
            conn.release();
        }
    }
}

module.exports = {FuncionarioService}