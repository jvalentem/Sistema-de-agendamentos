//ALIMENTA O BANCO DE DADOS COM OS USUÁRIOS QUE PRECISAM DE LOGIN (ADMIN E FUNCIONARIO)
//TAMBÉM ALIMENTA A TABELA DE SERVIÇOS E HORARIOS

//ESSE SCRIPT FOI FEITO PARA LIMPAR O schema.sql E TAMBÉM PARA QUE AS SENHAS SEJAM HASHEADAS ASSIM QUE QUEM FOR TESTAR INICIE A APLICAÇÃO


const pool = require('../data/mysql').pool
const password = require('../utils/password')



async function insertFuncionarios(){
    const conn = await pool.getConnection();

    try{
        await conn.beginTransaction();
        const userNames = ['funcionario','funcionario2','funcionario3','funcionario4'];
        
        const [rows] = await conn.query('SELECT * FROM USUARIOS WHERE nome IN (?,?,?,?)', userNames)

        //previne a inserção de usuários duplicados caso o script ja tenha sido executado uma vez
        if(rows.length > 0){await conn.rollback(); return}

        const generalPassword = process.env.GENERAL_PASSWORD;
        const hashedPaswword = await password.hashPassword(generalPassword)
        const acesso = 'funcionario'
        
        if(!hashedPaswword || !userNames || !acesso){await conn.rollback(); throw new Error('Nao foi possivel definir as informações do usuario')}

        for(user of userNames){
            const result = await conn.query('INSERT INTO USUARIOS(nome,senha,acesso) VALUES (?,?,?)',[user,hashedPaswword,acesso]);
        }

        await conn.commit();
        
    }catch(e){console.error(e)}
    finally{
        conn.release();
    }
}

async function insertAdmin(){
    const conn = await pool.getConnection()

    try{
        await conn.beginTransaction();

        const user = 'admin'
        const generalPassword = process.env.GENERAL_PASSWORD;
        const hashedPassword = await password.hashPassword(generalPassword);
        const acesso = 'admin'
        const [rows] = await conn.query('SELECT * FROM USUARIOS WHERE nome = ?',[user]);

        if(rows.length > 0){await conn.rollback(); return}

        await conn.query('INSERT INTO USUARIOS(nome,senha,acesso) VALUES(?,?,?)', [user,hashedPassword,acesso]);

        await conn.commit();

    }catch(e){console.error(e)}
    finally{
        conn.release();
    }
}

async function insertServices(){
    const conn = await pool.getConnection();

    try{
        await conn.beginTransaction();

        const servicos = ['Fisioterapia','Educação Física','Aulas de Programação','Culinária'];
        const precos = [70.00,50.00,60.00,100.00];
        const duracao = [60,60,30,70];
    

    //cada serviço terá um funcionario definido
    const [funcionarios] = await conn.query('SELECT * FROM USUARIOS WHERE acesso = ?',['funcionario']);

    if(funcionarios.length <= 0){await conn.rollback(); return}


    //antes de cadastrar, deve-se verificar se o serviço ja existe

    const [rows] = await conn.query('SELECT * FROM servicos WHERE nome IN(?,?,?,?)', servicos)
    
    if(rows.length > 0){await conn.rollback(); return}

    //cadastro dos serviços
    for(let i in funcionarios){
        const nomeServico = servicos[i];
        const precoServico = precos[i];
        const fk_funcionario = funcionarios[i].id;
        const duracaoServico = duracao[i];

        const result = await conn.query('INSERT INTO servicos(nome,fk_funcionario,preco,duracao) VALUES(?,?,?,?)',[nomeServico,fk_funcionario,precoServico,duracaoServico]);
        
        if(result[0].affectedRows <= 0){await conn.rollback();return}

    }

    await conn.commit();
    }catch(e){console.error(e)}
    finally{
        conn.release()
    }

}

async function insertHorarios(){
    const conn = await pool.getConnection();

    try{
        await conn.beginTransaction();

        const horas = ['15:00', '16:00', '17:00', '18:00'];
        const [servicos] = await conn.query('SELECT id FROM servicos');

        if(servicos.length === 0){
            await conn.rollback();
            return;
        }

        for(const servico of servicos){
            const [horariosExistentes] = await conn.query(
                'SELECT hora FROM horarios WHERE fk_servico = ?',
                [servico.id]
            );
            const horasExistentes = new Set(horariosExistentes.map(horario => horario.hora));

            for(const hora of horas){
                if(horasExistentes.has(hora)){
                    continue;
                }

                await conn.query(
                    'INSERT INTO horarios(hora,fk_servico) VALUES(?,?)',
                    [hora, servico.id]
                );
            }
        }

        await conn.commit();
    }catch(e){console.error(e)}
    finally{
        conn.release();
    }
}

async function insertUsers(){
    await insertFuncionarios();
    await insertAdmin();
    await insertServices();
    await insertHorarios();
}


insertUsers()