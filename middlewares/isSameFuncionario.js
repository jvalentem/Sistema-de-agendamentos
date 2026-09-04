const {ServicosService} = require('../services/ServicosService');

function isSameFuncionario(req,res,next){
    //Puxar o serviço do banco de dados aonde id = params.sid;
    //Comparar todos os valores de fk funcionario pra ver se algum bate com o serviço
    //atual (req.params.id)
    //Se bater: next
    //Sena: status 403
    const serviceId = req.params.sid;
    const servico = await ServicosService.getServiceById(serviceId);
    if(!servico) return res.status(404).json('Serviço nao encontrado');
    
    const session = req.session.user;
    const acesso = session.acesso;

    if(acesso === 'admin') return next();

    const sessionId = session.id;
    const servicoFuncionario = servico.fk_funcionario;

    if(!sessionId || !servicoFuncionario) return res.status(400).json('Erro ao verificar o id de sessão/funcionario');

    const mesmoFuncionario = sessionId === servicoFuncionario;

    if(!mesmoFuncionario) return res.status(403).json('Acesso proibido');

    next();
}

module.exports = {isSameFuncionario}