const pool = require('../data/mysql').pool
class ClienteService{
    static async getClienteById(id){
        const selectQuery = 'select * from clientes where id = ?';
        const [[cliente]]  = await pool.query(selectQuery,[id]);
        return cliente || false;
    }

    static async getClienteAgendamentos(id){
        const query = `select * from agendamentos where fk_cliente = ?`;
        const [agendamentos] = await pool.query(query,[id])

        return agendamentos || false;
    }

    static async getClienteByTelefone(tel){
        const query = `select * from clientes where telefone = ?`;
        const [[cliente]] = await pool.query(query,[tel]);

        return cliente || false;
    }

    static async getClienteByEmail(email){
        const query = `select * from clientes where email = ?`;
        const [[cliente]] = await pool.query(query,[email]);

        return cliente || false
    }
    static async clienteExiste(nome,telefone,email){
        
        const selectQuery = `select * from clientes where telefone = ? or email = ?`;
        let [[cliente]] = await pool.query(selectQuery,[telefone,email]);
        if(cliente) return cliente

        const createQuery = `insert into clientes(nome, telefone, email) values(?,?,?)`;
        await pool.query(createQuery,[nome,telefone,email]);

        [[cliente]] = await pool.query(selectQuery,[telefone,email]);
        console.log(cliente)
        return cliente || false;
    }
}


module.exports = {ClienteService}