const pool = require('../data/mysql').pool
class ClienteService{
    static async getClienteById(id){
        const query = `select * from clientes where id = ${id}`;
        const [[cliente]]  = await pool.query(query);
        return cliente || false;
    }

    static async getClienteAgendamentos(id){
        const query = `select * from agendamentos where fk_cliente = ${id}`;
        const [agendamentos] = await pool.query(query)

        return agendamentos || false;
    }

    static async getClienteByTelefone(tel){
        const query = `select * from clientes where telefone = ${tel}`;
        const [[cliente]] = await pool.query(query);

        return cliente || false;
    }

    static async getClienteByEmail(email){
        const query = `select * from clientes where email = ${email}`;
        const [[cliente]] = await pool.query(query);

        return cliente || false
    }
    static async clienteExiste(nome,telefone,email){
        
        const selectQuery = `select * from clientes where telefone = "${telefone}" or email = "${email}"`;
        let [[cliente]] = await pool.query(selectQuery);
        if(cliente) return cliente

        const createQuery = `insert into clientes(nome, telefone, email) values("${nome}","${telefone}","${email}")`;
        await pool.query(createQuery);

        cliente = await pool.query(selectQuery);

        return cliente || false;
    }
}


module.exports = {ClienteService}