const pool = require('../data/mysql').pool;
const bcrypt = require('bcrypt');



//MIGRAÇÃO DE SENHAS PARA USUÁRIOS JA EXISTENTES

async function migrarSenhas() {
    const conn = await pool.getConnection();

    try {
        const [usuarios] = await conn.query(
            'SELECT id, senha FROM usuarios'
        );

        for (const usuario of usuarios) {
            const hash = await bcrypt.hash(usuario.senha, 12);

            await conn.query(
                'UPDATE usuarios SET senha = ? WHERE id = ?',
                [hash, usuario.id]
            );
        }

    } catch (error) {
        console.error('Erro na migração:', error);
    } finally {
        conn.release();
        await pool.end();
    }
}

migrarSenhas();