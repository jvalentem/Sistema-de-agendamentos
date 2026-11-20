const {ServicosService} = require('../services/ServicosService');
const {AgendamentoService} = require('../services/AgendamentoServices');
const {FuncionarioService} = require('../services/FuncionarioService');
const {UserService} = require('../services/UserService');
const {HorarioService} = require('../services/HorarioServices');
const {ClienteService} = require('../services/ClienteService');



test('Cadastro de serviço', async()=>{
    const servico = {
                        'nomeServico':'Basquete', 
                        'funcionarioId':15,
                        'precoServico':20.00,
                        'duracaoServico':20
                    }

    const resultado = await ServicosService.createService(servico)

    expect(resultado).toBe(true);
})

test('get de horarios', async()=>{
    const [servico] = await ServicosService.getServicos(); //pega o primeiro serviço que aparecer

    const [horarios] = await HorarioService.getHorariosFromServico(servico.id);

    expect(horarios).not.toBe(false);
})
